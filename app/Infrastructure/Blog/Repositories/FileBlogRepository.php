<?php

declare(strict_types=1);

namespace App\Infrastructure\Blog\Repositories;

use App\Domain\Blog\Data\BlogPostDocument;
use App\Domain\Blog\Repositories\BlogRepositoryInterface;
use Illuminate\Filesystem\Filesystem;
use League\CommonMark\CommonMarkConverter;
use RuntimeException;
use Spatie\YamlFrontMatter\YamlFrontMatter;
use SplFileInfo;

final class FileBlogRepository implements BlogRepositoryInterface
{
    private readonly CommonMarkConverter $markdown;

    public function __construct(
        private readonly Filesystem $files,
    ) {
        $this->markdown = new CommonMarkConverter();
    }

    public function all(): array
    {
        $contentPath = base_path('content/blog');

        if (! $this->files->isDirectory($contentPath)) {
            return [];
        }

        $documents = array_map(
            fn (SplFileInfo $file): BlogPostDocument => $this->parseFile($file),
            $this->files->files($contentPath),
        );

        usort(
            $documents,
            fn (BlogPostDocument $left, BlogPostDocument $right): int => strcmp($right->publishedAt, $left->publishedAt),
        );

        return array_values($documents);
    }

    public function findBySlug(string $slug): ?BlogPostDocument
    {
        foreach ($this->all() as $document) {
            if ($document->slug === $slug) {
                return $document;
            }
        }

        return null;
    }

    private function parseFile(SplFileInfo $file): BlogPostDocument
    {
        $raw = $this->files->get($file->getPathname());
        $parsed = YamlFrontMatter::parse($raw);

        $filenameSlug = $this->slugFromFilename($file);
        $frontMatterSlug = (string) ($parsed->matter('slug') ?? '');

        if ($frontMatterSlug === '') {
            throw new RuntimeException(sprintf(
                'Blog post [%s] is missing a "slug" field in its front matter.',
                $file->getFilename(),
            ));
        }

        if ($frontMatterSlug !== $filenameSlug) {
            throw new RuntimeException(sprintf(
                'Blog post [%s] has front matter slug "%s" which does not match the filename-derived slug "%s".',
                $file->getFilename(),
                $frontMatterSlug,
                $filenameSlug,
            ));
        }

        $bodyMarkdown = trim($parsed->body());
        $bodyHtml = (string) $this->markdown->convert($bodyMarkdown);
        $bodyText = trim(strip_tags($bodyHtml));

        return new BlogPostDocument(
            slug: $frontMatterSlug,
            title: (string) ($parsed->matter('title') ?? 'Untitled Post'),
            excerpt: (string) ($parsed->matter('excerpt') ?? ''),
            publishedAt: (string) ($parsed->matter('published_at') ?? now()->toDateString()),
            tags: $this->normalizeStringList($parsed->matter('tags') ?? []),
            coverImage: $this->normalizeNullableString($parsed->matter('cover_image')),
            bodyMarkdown: $bodyMarkdown,
            bodyHtml: $bodyHtml,
            readingTimeMinutes: max(1, (int) ceil(str_word_count($bodyText) / 200)),
        );
    }

    private function slugFromFilename(SplFileInfo $file): string
    {
        $filename = pathinfo($file->getFilename(), PATHINFO_FILENAME);

        return (string) preg_replace('/^\d{4}-\d{2}-\d{2}-/', '', $filename);
    }

    /** @param mixed $value */
    private function normalizeStringList(mixed $value): array
    {
        if (! is_array($value)) {
            return [];
        }

        return array_values(array_map(static fn (mixed $item): string => (string) $item, $value));
    }

    private function normalizeNullableString(mixed $value): ?string
    {
        if (! is_string($value) || trim($value) === '') {
            return null;
        }

        return $value;
    }
}
