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
            ->assertSee('Krishan Balram Gaushala')
            ->assertSee('Dhanda Diary')
            ->assertSee('Digital Builders')
            ->assertSee('MyAstrova');
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

    public function test_shorthand_zoeticoach_slug_redirects_301_to_canonical(): void
    {
        $this->get('/case-studies/zoeticoach-ai')
            ->assertStatus(301)
            ->assertRedirect('/case-studies/zoeticoach-ai-whatsapp-accountability-engine');
    }

    public function test_shorthand_gaushala_slug_redirects_301_to_canonical(): void
    {
        $this->get('/case-studies/krishan-balram-gaushala')
            ->assertStatus(301)
            ->assertRedirect('/case-studies/krishan-balram-gaushala-devotee-engagement-platform');
    }

    public function test_dhanda_diary_case_study_detail_page_renders(): void
    {
        $this->get('/case-studies/dhanda-diary-business-execution-operating-system')
            ->assertOk()
            ->assertSee('Dhanda Diary: Turning Business Strategy into Daily Execution Discipline')
            ->assertSee('Executive Summary');
    }

    public function test_shorthand_dhanda_diary_slug_redirects_301_to_canonical(): void
    {
        $this->get('/case-studies/dhanda-diary')
            ->assertStatus(301)
            ->assertRedirect('/case-studies/dhanda-diary-business-execution-operating-system');
    }

    public function test_digital_builders_case_study_detail_page_renders(): void
    {
        $this->get('/case-studies/digital-builders-agency-conversion-platform')
            ->assertOk()
            ->assertSee('Digital Builders: Productizing a High-Trust Engineering Agency')
            ->assertSee('Executive Summary');
    }

    public function test_shorthand_digital_builders_slug_redirects_301_to_canonical(): void
    {
        $this->get('/case-studies/digital-builders')
            ->assertStatus(301)
            ->assertRedirect('/case-studies/digital-builders-agency-conversion-platform');
    }

    public function test_myastrova_case_study_detail_page_renders(): void
    {
        $this->get('/case-studies/myastrova-astrology-consultation-commerce-platform')
            ->assertOk()
            ->assertSee('MyAstrova: A Real-Time Astrology Consultation & Spiritual Commerce Platform')
            ->assertSee('Executive Summary');
    }

    public function test_shorthand_myastrova_slug_redirects_301_to_canonical(): void
    {
        $this->get('/case-studies/myastrova')
            ->assertStatus(301)
            ->assertRedirect('/case-studies/myastrova-astrology-consultation-commerce-platform');
    }
}