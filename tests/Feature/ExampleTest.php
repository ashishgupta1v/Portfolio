<?php

namespace Tests\Feature;

use Database\Seeders\PortfolioSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $this->seed(PortfolioSeeder::class);

        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_resume_download_returns_pdf_with_attachment_header(): void
    {
        $response = $this->get('/resume');

        $response->assertStatus(200);
        $response->assertHeader('content-type', 'application/pdf');
        $this->assertStringContainsString('attachment; filename=Ashish-Gupta-Resume.pdf', (string) $response->headers->get('content-disposition'));
    }
}
