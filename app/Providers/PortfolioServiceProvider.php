<?php

declare(strict_types=1);

namespace App\Providers;

use App\Domain\Portfolio\Repositories\PortfolioRepositoryInterface;
use App\Infrastructure\Portfolio\Repositories\EloquentPortfolioRepository;
use Illuminate\Support\ServiceProvider;

final class PortfolioServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            PortfolioRepositoryInterface::class,
            EloquentPortfolioRepository::class,
        );
    }
}
