<?php

declare(strict_types=1);

namespace App\Domain\Portfolio\Repositories;

use App\Domain\Portfolio\Entities\Profile;
use App\Domain\Portfolio\Entities\Project;

interface PortfolioRepositoryInterface
{
    public function getActiveProfile(): ?Profile;

    public function getProfileWithRelations(): ?Profile;

    /**
     * Finds a project by slug across the active profile. Returns null if the
     * profile has no such project — controllers translate null into a 404.
     */
    public function findProjectBySlug(string $slug): ?Project;
}
