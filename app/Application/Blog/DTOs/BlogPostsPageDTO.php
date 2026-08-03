<?php

declare(strict_types=1);

namespace App\Application\Blog\DTOs;

final readonly class BlogPostsPageDTO
{
    /** @param list<array<string, mixed>> $posts */
    public function __construct(
        public array $posts,
    ) {}
}
