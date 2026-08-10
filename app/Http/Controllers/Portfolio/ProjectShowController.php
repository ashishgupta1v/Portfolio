<?php

declare(strict_types=1);

namespace App\Http\Controllers\Portfolio;

use App\Application\Portfolio\Actions\GetProjectAction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

final class ProjectShowController
{
    public function __invoke(Request $request, string $slug, GetProjectAction $action): Response
    {
        $project = $action->execute($slug);

        abort_if($project === null, 404);

        $data = $project->toArray();

        $response = Inertia::render('Projects/Show', [
            'project' => $data,
            'seo' => [
                'title' => ($data['title'] ?? 'Project') . ' — Ashish Gupta',
                'description' => $data['description'] ?? '',
                'path' => '/projects/' . ($data['slug'] ?? $slug),
                'type' => 'article',
                'image' => $data['imageUrl'] ?? '/images/og-cover.png',
            ],
        ])->toResponse($request);

        $response->headers->set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

        return $response;
    }
}
