<?php

declare(strict_types=1);

namespace App\Application\Blog\Actions;

use App\Application\Blog\DTOs\BlogPostCardDTO;
use App\Application\Blog\DTOs\BlogPostsPageDTO;
use App\Domain\Blog\Repositories\BlogRepositoryInterface;
use Carbon\CarbonImmutable;

final readonly class GetBlogPostsAction
{
    public function __construct(
        private BlogRepositoryInterface $repository,
    ) {}

    public function execute(): BlogPostsPageDTO
    {
        $now = CarbonImmutable::now();

        $documents = array_filter(
            $this->repository->all(),
            static fn ($document): bool => CarbonImmutable::parse($document->publishedAt)->lessThanOrEqualTo($now),
        );

        return new BlogPostsPageDTO(
            posts: array_map(
                static fn ($document): array => BlogPostCardDTO::fromDocument($document)->toArray(),
                array_values($documents),
            ),
        );
    }
}
