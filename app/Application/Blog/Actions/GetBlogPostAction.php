<?php

declare(strict_types=1);

namespace App\Application\Blog\Actions;

use App\Application\Blog\DTOs\BlogPostDTO;
use App\Domain\Blog\Repositories\BlogRepositoryInterface;

final readonly class GetBlogPostAction
{
    public function __construct(
        private BlogRepositoryInterface $repository,
    ) {}

    public function execute(string $slug): ?BlogPostDTO
    {
        $document = $this->repository->findBySlug($slug);

        if ($document === null) {
            return null;
        }

        return BlogPostDTO::fromDocument($document);
    }
}
