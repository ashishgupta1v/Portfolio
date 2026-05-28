<?php

declare(strict_types=1);

namespace App\Application\CaseStudies\DTOs;

use App\Domain\CaseStudies\Data\CaseStudyDocument;

final readonly class CaseStudyPageDTO
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
        public string $role,
        public string $industry,
        public string $timeline,
        public string $publishedAt,
        public string $featuredOutcome,
        public string $permissionStatus,
        public string $seoTitle,
        public string $seoDescription,
        public array $tags,
        public array $stack,
        public string $bodyHtml,
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
            'role' => $this->role,
            'industry' => $this->industry,
            'timeline' => $this->timeline,
            'publishedAt' => $this->publishedAt,
            'featuredOutcome' => $this->featuredOutcome,
            'permissionStatus' => $this->permissionStatus,
            'seoTitle' => $this->seoTitle,
            'seoDescription' => $this->seoDescription,
            'tags' => $this->tags,
            'stack' => $this->stack,
            'bodyHtml' => $this->bodyHtml,
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
            role: $document->role,
            industry: $document->industry,
            timeline: $document->timeline,
            publishedAt: $document->publishedAt,
            featuredOutcome: $document->featuredOutcome,
            permissionStatus: $document->permissionStatus,
            seoTitle: $document->seoTitle,
            seoDescription: $document->seoDescription,
            tags: $document->tags,
            stack: $document->stack,
            bodyHtml: $document->bodyHtml,
            readingTimeMinutes: $document->readingTimeMinutes,
        );
    }
}