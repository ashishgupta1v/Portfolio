<?php

declare(strict_types=1);

namespace Tests\Feature;

use Tests\TestCase;

final class HiringPageTest extends TestCase
{
    public function test_hiring_page_loads_successfully(): void
    {
        $response = $this->get('/hiring');

        $response->assertOk();
    }

    public function test_engagements_redirects_to_hiring(): void
    {
        $response = $this->get('/engagements');

        $response->assertRedirect('/hiring');
    }
}
