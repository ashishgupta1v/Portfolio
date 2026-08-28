<?php

declare(strict_types=1);

namespace Tests\Feature;

use Tests\TestCase;

final class HiringPageTest extends TestCase
{
    public function test_for_hiring_managers_page_loads_successfully(): void
    {
        $response = $this->get('/for-hiring-managers');

        $response->assertOk();
    }

    public function test_hiring_redirects_to_for_hiring_managers(): void
    {
        $response = $this->get('/hiring');

        $response->assertRedirect('/for-hiring-managers');
    }

    public function test_engagements_redirects_to_for_hiring_managers(): void
    {
        $response = $this->get('/engagements');

        $response->assertRedirect('/for-hiring-managers');
    }
}
