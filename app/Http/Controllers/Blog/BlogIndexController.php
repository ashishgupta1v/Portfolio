<?php

declare(strict_types=1);

namespace App\Http\Controllers\Blog;

use App\Application\Blog\Actions\GetBlogPostsAction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

final class BlogIndexController
{
    public function __invoke(Request $request, GetBlogPostsAction $action): Response
    {
        $posts = $action->execute();

        $response = Inertia::render('Blog/Index', [
            'posts' => $posts->posts,
            'seo' => [
                'title' => 'Blog — Ashish Gupta',
                'description' => 'Notes on domain-driven architecture, Laravel, Vue, and building production systems that hold up under real load.',
                'path' => '/blog',
            ],
        ])->toResponse($request);

        $response->headers->set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

        return $response;
    }
}
