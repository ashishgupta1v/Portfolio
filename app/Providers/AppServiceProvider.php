<?php

namespace App\Providers;

use App\Domain\CaseStudies\Repositories\CaseStudyRepositoryInterface;
use App\Infrastructure\CaseStudies\Repositories\FileCaseStudyRepository;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            CaseStudyRepositoryInterface::class,
            FileCaseStudyRepository::class,
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
