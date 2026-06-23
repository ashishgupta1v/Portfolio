<?php

declare(strict_types=1);

namespace Tests\Feature;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

final class ChatControllerTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        // Clear API key by default to test offline fallback
        Config::set('services.openai.key', null);
    }

    public function test_it_validates_required_parameters(): void
    {
        $response = $this->postJson(route('portfolio.chat'), []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['messages']);
    }

    public function test_it_validates_message_format(): void
    {
        $response = $this->postJson(route('portfolio.chat'), [
            'messages' => [
                ['role' => 'invalid_role', 'content' => 'Hello']
            ]
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['messages.0.role']);
    }

    public function test_it_falls_back_to_offline_mode_when_api_key_is_missing(): void
    {
        $response = $this->postJson(route('portfolio.chat'), [
            'messages' => [
                ['role' => 'user', 'content' => 'What is your email?']
            ]
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'offline' => true,
            ])
            ->assertJsonPath('reply', 'You can contact Ashish Gupta directly via email at ashishgupta1v@gmail.com, call him at +91-9087021592, or connect on LinkedIn (https://www.linkedin.com/in/ashishgupta1v/).');
    }

    public function test_it_returns_successful_response_from_openai_api(): void
    {
        Config::set('services.openai.key', 'mock-api-key');
        Config::set('services.openai.model', 'gpt-4o-mini');

        Http::fake([
            'https://api.openai.com/v1/chat/completions' => Http::response([
                'choices' => [
                    [
                        'message' => [
                            'role' => 'assistant',
                            'content' => 'Ashish is an expert VILT stack architect.',
                        ]
                    ]
                ]
            ], 200)
        ]);

        $response = $this->postJson(route('portfolio.chat'), [
            'messages' => [
                ['role' => 'user', 'content' => 'Tell me about Ashish.']
            ]
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'reply' => 'Ashish is an expert VILT stack architect.',
                'offline' => false,
            ]);

        Http::assertSent(function (\Illuminate\Http\Client\Request $request) {
            return $request->url() === 'https://api.openai.com/v1/chat/completions'
                && $request->method() === 'POST'
                && $request->hasHeader('Authorization', 'Bearer mock-api-key')
                && $request['model'] === 'gpt-4o-mini'
                && count($request['messages']) === 2; // System + User message
        });
    }

    public function test_it_handles_openai_api_failure_gracefully(): void
    {
        Config::set('services.openai.key', 'mock-api-key');

        Http::fake([
            'https://api.openai.com/v1/chat/completions' => Http::response([
                'error' => [
                    'message' => 'Rate limit exceeded.'
                ]
            ], 429)
        ]);

        $response = $this->postJson(route('portfolio.chat'), [
            'messages' => [
                ['role' => 'user', 'content' => 'Hello']
            ]
        ]);

        $response->assertStatus(502)
            ->assertJson([
                'error' => 'Failed to retrieve response from AI assistant.'
            ]);
    }
}
