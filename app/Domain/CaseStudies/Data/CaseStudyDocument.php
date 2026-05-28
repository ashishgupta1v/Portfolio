<?php

declare(strict_types=1);

namespace App\Domain\CaseStudies\Data;

final readonly class CaseStudyDocument
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
        public string $bodyMarkdown,
        public string $bodyHtml,
        public int $readingTimeMinutes,
    ) {}
}