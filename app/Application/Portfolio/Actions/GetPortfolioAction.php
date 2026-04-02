<?php

declare(strict_types=1);

namespace App\Application\Portfolio\Actions;

use App\Application\Portfolio\DTOs\PortfolioPageDTO;
use App\Domain\Portfolio\Repositories\PortfolioRepositoryInterface;

final readonly class GetPortfolioAction
{
    public function __construct(
        private PortfolioRepositoryInterface $repository,
    ) {}

    public function execute(): ?PortfolioPageDTO
    {
        $profile = $this->repository->getProfileWithRelations();

        if (! $profile) {
            return null;
        }

        return PortfolioPageDTO::fromProfile($profile);
    }
}
