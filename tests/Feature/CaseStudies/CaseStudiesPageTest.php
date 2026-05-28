<?php

declare(strict_types=1);

namespace Tests\Feature\CaseStudies;

use Tests\TestCase;

final class CaseStudiesPageTest extends TestCase
{
    public function test_case_study_index_page_renders(): void
    {
        $this->get('/case-studies')
            ->assertOk()
            ->assertSee('Canonical Library')
            ->assertSee('ZoetiCoach AI');
    }

    public function test_case_study_detail_page_renders(): void
    {
        $this->get('/case-studies/zoeticoach-ai-whatsapp-accountability-engine')
            ->assertOk()
            ->assertSee('ZoetiCoach AI: Building a WhatsApp-First Accountability Engine for Coaches')
            ->assertSee('Executive Summary');
    }
}