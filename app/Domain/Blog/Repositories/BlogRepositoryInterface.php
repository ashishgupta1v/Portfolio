<?php

declare(strict_types=1);

namespace App\Domain\Blog\Repositories;

use App\Domain\Blog\Data\BlogPostDocument;

interface BlogRepositoryInterface
{
    /** @return list<BlogPostDocument> */
    public function all(): array;

    public function findBySlug(string $slug): ?BlogPostDocument;
}
