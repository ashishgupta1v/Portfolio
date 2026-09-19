<?php

declare(strict_types=1);

namespace App\Http\Controllers\Blog;

use App\Application\Blog\Actions\GetBlogPostAction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

final class BlogShowController
{
    public function __invoke(Request $request, string $slug, GetBlogPostAction $action): Response
    {
        $post = $action->execute($slug);

        abort_if($post === null, 404);

        $data = $post->toArray();

        $postSlug = $data['slug'] ?? $slug;
        $ogImage = file_exists(public_path('images/og/' . $postSlug . '.png'))
            ? '/images/og/' . $postSlug . '.png'
            : '/images/og-cover.png';

        $response = Inertia::render('Blog/Show', [
            'post' => $data,
            'seo' => [
                'title' => ($data['title'] ?? 'Blog Post') . ' — Ashish Gupta',
                'description' => $data['excerpt'] ?? '',
                'path' => '/blog/' . $postSlug,
                'image' => $ogImage,
                'type' => 'article',
            ],
        ])->toResponse($request);

        $response->headers->set('Cache-Control', 'no-cache, private');

        return $response;
    }
}
