<?php

declare(strict_types=1);

namespace App\Http\Controllers\Engagements;

use Illuminate\Http\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

final class EngagementsPageController
{
    public function __invoke(): InertiaResponse
    {
        return Inertia::render('Engagements/Index', [
            'seo' => [
                'title' => 'Engagement Models — Ashish Gupta',
                'description' => 'How I work with clients: fixed-scope builds, embedded architecture support, and modernization engagements for teams carrying legacy systems.',
                'path' => '/engagements',
            ],
        ]);
    }
}
