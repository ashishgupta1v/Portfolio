<?php

declare(strict_types=1);

namespace App\Application\CaseStudies\DTOs;

use App\Domain\CaseStudies\Data\CaseStudyDocument;

final readonly class CaseStudyCardDTO
{
    /**
     * @param list<string> $tags
     * @param list<string> $stack
     */
    public function __construct(
        public string $slug,
        public string $title,
        public string $summary,
        public string $client,
        public string $industry,
        public string $timeline,
        public string $publishedAt,
        public string $featuredOutcome,
        public array $tags,
        public array $stack,
        public int $readingTimeMinutes,
    ) {}

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->title,
            'summary' => $this->summary,
            'client' => $this->client,
            'industry' => $this->industry,
            'timeline' => $this->timeline,
            'publishedAt' => $this->publishedAt,
            'featuredOutcome' => $this->featuredOutcome,
            'tags' => $this->tags,
            'stack' => $this->stack,
            'readingTimeMinutes' => $this->readingTimeMinutes,
        ];
    }

    public static function fromDocument(CaseStudyDocument $document): self
    {
        return new self(
            slug: $document->slug,
            title: $document->title,
            summary: $document->summary,
            client: $document->client,
            industry: $document->industry,
            timeline: $document->timeline,
            publishedAt: $document->publishedAt,
            featuredOutcome: $document->featuredOutcome,
            tags: $document->tags,
            stack: $document->stack,
            readingTimeMinutes: $document->readingTimeMinutes,
        );
    }
}