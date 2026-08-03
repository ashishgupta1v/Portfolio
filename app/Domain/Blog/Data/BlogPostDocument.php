<?php

declare(strict_types=1);

namespace App\Domain\Blog\Data;

final readonly class BlogPostDocument
{
    /** @param list<string> $tags */
    public function __construct(
        public string $slug,
        public string $title,
        public string $excerpt,
        public string $publishedAt,
        public array $tags,
        public ?string $coverImage,
        public string $bodyMarkdown,
        public string $bodyHtml,
        public int $readingTimeMinutes,
    ) {}
}
