<?php

declare(strict_types=1);

namespace App\Application\Blog\DTOs;

use App\Domain\Blog\Data\BlogPostDocument;

final readonly class BlogPostDTO
{
    /** @param list<string> $tags */
    public function __construct(
        public string $slug,
        public string $title,
        public string $excerpt,
        public string $publishedAt,
        public array $tags,
        public ?string $coverImage,
        public string $bodyHtml,
        public int $readingTimeMinutes,
    ) {}

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'publishedAt' => $this->publishedAt,
            'tags' => $this->tags,
            'coverImage' => $this->coverImage,
            'bodyHtml' => $this->bodyHtml,
            'readingTimeMinutes' => $this->readingTimeMinutes,
        ];
    }

    public static function fromDocument(BlogPostDocument $document): self
    {
        return new self(
            slug: $document->slug,
            title: $document->title,
            excerpt: $document->excerpt,
            publishedAt: $document->publishedAt,
            tags: $document->tags,
            coverImage: $document->coverImage,
            bodyHtml: $document->bodyHtml,
            readingTimeMinutes: $document->readingTimeMinutes,
        );
    }
}
