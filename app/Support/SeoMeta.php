<?php

declare(strict_types=1);

namespace App\Support;

/**
 * Page metadata rendered into the Blade <head> on the server.
 *
 * Inertia's <Head> component only applies tags after Vue hydrates, so anything
 * declared there is invisible to crawlers that do not execute JavaScript —
 * which is all of the social ones (LinkedIn, WhatsApp, Slack, X, Facebook).
 * These tags therefore have to be emitted server-side to have any effect on
 * link previews.
 */
final readonly class SeoMeta
{
    private const SITE_NAME = 'Ashish Gupta';
    private const BASE_URL = 'https://ashishgupta.dev';
    private const DEFAULT_IMAGE = '/images/og-cover.png';

    public function __construct(
        public string $title,
        public string $description,
        public string $path = '/',
        public string $image = self::DEFAULT_IMAGE,
        public string $type = 'website',
        /** @var array<int, array<string, mixed>> */
        public array $schemas = [],
    ) {}

    public static function default(): self
    {
        return new self(
            title: 'Ashish Gupta — Senior Full-Stack Architect',
            description: 'Senior Full-Stack Architect with 9+ years modernizing legacy Healthcare and Aviation monoliths into scalable, domain-driven systems. Vue 3, Laravel, Inertia.js.',
        );
    }

    public function canonical(): string
    {
        return self::BASE_URL . '/' . ltrim($this->path, '/');
    }

    public function imageUrl(): string
    {
        return str_starts_with($this->image, 'http')
            ? $this->image
            : self::BASE_URL . '/' . ltrim($this->image, '/');
    }

    public function siteName(): string
    {
        return self::SITE_NAME;
    }

    /**
     * Build from the `seo` prop a controller passed to Inertia::render(),
     * falling back to sensible site-wide defaults when a page supplies none.
     *
     * @param array<string, mixed> $props
     */
    public static function fromInertiaProps(array $props): self
    {
        $seo = $props['seo'] ?? null;

        if (! is_array($seo)) {
            return self::default();
        }

        $default = self::default();

        return new self(
            title: is_string($seo['title'] ?? null) ? $seo['title'] : $default->title,
            description: is_string($seo['description'] ?? null) ? $seo['description'] : $default->description,
            path: is_string($seo['path'] ?? null) ? $seo['path'] : '/',
            image: is_string($seo['image'] ?? null) && $seo['image'] !== '' ? $seo['image'] : self::DEFAULT_IMAGE,
            type: is_string($seo['type'] ?? null) ? $seo['type'] : 'website',
            schemas: is_array($seo['schemas'] ?? null) ? $seo['schemas'] : [],
        );
    }
}
