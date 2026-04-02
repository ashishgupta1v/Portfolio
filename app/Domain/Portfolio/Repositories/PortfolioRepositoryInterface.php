<?php

declare(strict_types=1);

namespace App\Domain\Portfolio\Repositories;

use App\Domain\Portfolio\Entities\Profile;

interface PortfolioRepositoryInterface
{
    public function getActiveProfile(): ?Profile;

    public function getProfileWithRelations(): ?Profile;
}
