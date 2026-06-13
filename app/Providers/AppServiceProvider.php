<?php

namespace App\Providers;

use App\Domain\CaseStudies\Repositories\CaseStudyRepositoryInterface;
use App\Infrastructure\CaseStudies\Repositories\FileCaseStudyRepository;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
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
        RateLimiter::for('contact-submissions', function (Request $request): array {
            $email = (string) $request->input('email', 'guest');

            return [
                Limit::perMinute(4)->by($request->ip()),
                Limit::perHour(12)->by($request->ip().'|'.$email),
            ];
        });

        Vite::prefetch(concurrency: 3);
    }
}
