<?php

declare(strict_types=1);

namespace App\Application\Portfolio\Actions;

use App\Application\Portfolio\DTOs\ProjectDTO;
use App\Domain\Portfolio\Repositories\PortfolioRepositoryInterface;

final readonly class GetProjectAction
{
    public function __construct(
        private PortfolioRepositoryInterface $repository,
    ) {}

    public function execute(string $slug): ?ProjectDTO
    {
        $project = $this->repository->findProjectBySlug($slug);

        return $project ? ProjectDTO::fromModel($project) : null;
    }
}
