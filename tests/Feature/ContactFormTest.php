<?php

declare(strict_types=1);

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class ContactFormTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_form_accepts_default_full_time_role_option(): void
    {
        $response = $this->post('/contact', [
            'name' => 'Jane Recruiter',
            'email' => 'jane@example.com',
            'project_type' => 'Full-Time Role',
            'message' => 'We are looking for a Senior Architect for our team.',
            'form_started_at' => now()->subSeconds(10)->timestamp * 1000,
        ]);

        $response->assertSessionHasNoErrors();
        $this->assertDatabaseHas('contact_inquiries', [
            'email' => 'jane@example.com',
            'project_type' => 'Full-Time Role',
        ]);
    }

    public function test_contact_form_accepts_contract_freelance_option(): void
    {
        $response = $this->post('/contact', [
            'name' => 'Founder Dave',
            'email' => 'dave@startup.io',
            'project_type' => 'Contract / Freelance',
            'message' => 'Need architecture advisory on our Laravel codebase.',
            'form_started_at' => now()->subSeconds(10)->timestamp * 1000,
        ]);

        $response->assertSessionHasNoErrors();
        $this->assertDatabaseHas('contact_inquiries', [
            'email' => 'dave@startup.io',
            'project_type' => 'Contract / Freelance',
        ]);
    }

    public function test_contact_form_rejects_invalid_project_type(): void
    {
        $response = $this->post('/contact', [
            'name' => 'Spammer',
            'email' => 'spammer@example.com',
            'project_type' => 'InvalidTypeOptionHere',
            'message' => 'Testing validation error.',
            'form_started_at' => now()->subSeconds(10)->timestamp * 1000,
        ]);

        $response->assertSessionHasErrors('project_type');
    }
}
