<?php

declare(strict_types=1);

namespace App\Infrastructure\CaseStudies\Repositories;

use App\Domain\CaseStudies\Data\CaseStudyDocument;
use App\Domain\CaseStudies\Repositories\CaseStudyRepositoryInterface;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Str;
use RuntimeException;
use SplFileInfo;

final class FileCaseStudyRepository implements CaseStudyRepositoryInterface
{
    public function __construct(
        private readonly Filesystem $files,
    ) {}

    public function all(): array
    {
        $contentPath = base_path('content/case-studies');

        if (! $this->files->isDirectory($contentPath)) {
            return [];
        }

        $documents = array_map(
            fn (SplFileInfo $file): CaseStudyDocument => $this->parseFile($file),
            $this->files->files($contentPath),
        );

        usort(
            $documents,
            fn (CaseStudyDocument $left, CaseStudyDocument $right): int => strcmp($right->publishedAt, $left->publishedAt),
        );

        return array_values($documents);
    }

    public function findBySlug(string $slug): ?CaseStudyDocument
    {
        foreach ($this->all() as $document) {
            if ($document->slug === $slug) {
                return $document;
            }
        }

        return null;
    }

    private function parseFile(SplFileInfo $file): CaseStudyDocument
    {
        $raw = $this->files->get($file->getPathname());
        [$frontMatter, $body] = $this->splitFrontMatter($raw, $file);
        $meta = $this->parseFrontMatter($frontMatter);
        $bodyMarkdown = trim($body);
        $bodyText = trim(strip_tags(Str::markdown($bodyMarkdown)));

        return new CaseStudyDocument(
            slug: (string) ($meta['slug'] ?? pathinfo($file->getFilename(), PATHINFO_FILENAME)),
            title: (string) ($meta['title'] ?? 'Untitled Case Study'),
            summary: (string) ($meta['summary'] ?? ''),
            client: (string) ($meta['client'] ?? 'Confidential Client'),
            role: (string) ($meta['role'] ?? 'Lead Architect'),
            industry: (string) ($meta['industry'] ?? 'Software'),
            timeline: (string) ($meta['timeline'] ?? ''),
            publishedAt: (string) ($meta['published_at'] ?? now()->toDateString()),
            featuredOutcome: (string) ($meta['featured_outcome'] ?? ''),
            permissionStatus: (string) ($meta['permission_status'] ?? 'named'),
            seoTitle: (string) ($meta['seo_title'] ?? $meta['title'] ?? 'Case Study'),
            seoDescription: (string) ($meta['seo_description'] ?? $meta['summary'] ?? ''),
            tags: $this->normalizeStringList($meta['tags'] ?? []),
            stack: $this->normalizeStringList($meta['stack'] ?? []),
            bodyMarkdown: $bodyMarkdown,
            bodyHtml: Str::markdown($bodyMarkdown),
            readingTimeMinutes: max(1, (int) ceil(str_word_count($bodyText) / 220)),
        );
    }

    /**
     * @return array{0: string, 1: string}
     */
    private function splitFrontMatter(string $raw, SplFileInfo $file): array
    {
        if (preg_match('/\A---\R(?P<meta>.*?)\R---\R(?P<body>.*)\z/s', $raw, $matches) !== 1) {
            throw new RuntimeException(sprintf('Case study file [%s] is missing valid front matter.', $file->getFilename()));
        }

        return [$matches['meta'], $matches['body']];
    }

    /** @return array<string, mixed> */
    private function parseFrontMatter(string $frontMatter): array
    {
        $meta = [];

        foreach (preg_split('/\R/', trim($frontMatter)) ?: [] as $line) {
            $line = trim($line);

            if ($line === '') {
                continue;
            }

            if (preg_match('/^(?<key>[A-Za-z0-9_]+):\s*(?<value>.*)$/', $line, $matches) !== 1) {
                continue;
            }

            $meta[Str::snake($matches['key'])] = $this->parseValue($matches['value']);
        }

        return $meta;
    }

    private function parseValue(string $value): mixed
    {
        $trimmed = trim($value);

        if ($trimmed === '') {
            return '';
        }

        if ($trimmed[0] === '[' && str_ends_with($trimmed, ']')) {
            $items = array_map('trim', explode(',', substr($trimmed, 1, -1)));

            return array_values(array_filter(array_map([$this, 'stripQuotes'], $items), fn (string $item): bool => $item !== ''));
        }

        if (in_array(strtolower($trimmed), ['true', 'false'], true)) {
            return strtolower($trimmed) === 'true';
        }

        return $this->stripQuotes($trimmed);
    }

    /** @param mixed $value */
    private function normalizeStringList(mixed $value): array
    {
        if (! is_array($value)) {
            return [];
        }

        return array_values(array_map(static fn (mixed $item): string => (string) $item, $value));
    }

    private function stripQuotes(string $value): string
    {
        return trim($value, " \t\n\r\0\x0B\"'");
    }
}