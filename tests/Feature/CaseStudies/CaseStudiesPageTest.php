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
            ->assertSee('ZoetiCoach AI')
            ->assertSee('Krishan Balram Gaushala');
    }

    public function test_case_study_detail_page_renders(): void
    {
        $this->get('/case-studies/zoeticoach-ai-whatsapp-accountability-engine')
            ->assertOk()
            ->assertSee('ZoetiCoach AI: Building a WhatsApp-First Accountability Engine for Coaches')
            ->assertSee('Executive Summary');
    }

    public function test_gaushala_case_study_detail_page_renders(): void
    {
        $this->get('/case-studies/krishan-balram-gaushala-devotee-engagement-platform')
            ->assertOk()
            ->assertSee('Krishan Balram Gaushala: Building an Automation-Driven Devotee Engagement & Event Management Portal')
            ->assertSee('The Situation')
            ->assertSee('The Media Payload Challenge');
    }
}