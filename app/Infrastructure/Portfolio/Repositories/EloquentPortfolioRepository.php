<?php

declare(strict_types=1);

namespace App\Infrastructure\Portfolio\Repositories;

use App\Domain\Portfolio\Entities\Profile;
use App\Domain\Portfolio\Repositories\PortfolioRepositoryInterface;

final class EloquentPortfolioRepository implements PortfolioRepositoryInterface
{
    public function getActiveProfile(): ?Profile
    {
        return Profile::query()->first();
    }

    public function getProfileWithRelations(): ?Profile
    {
        return Profile::query()
            ->with([
                'experiences',
                'projects',
                'skills',
                'socialLinks',
                'educations',
                'services',
            ])
            ->first();
    }
}
