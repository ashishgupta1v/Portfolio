<?php

declare(strict_types=1);

namespace App\Http\Controllers\Portfolio;

use App\Application\Portfolio\Actions\GetPortfolioAction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

final class PortfolioController
{
    public function __invoke(Request $request, GetPortfolioAction $action): Response
    {
        $portfolio = $action->execute();

        return Inertia::render('Portfolio/Index', [
            'profile' => $portfolio?->profile ?? [],
            'experiences' => $portfolio?->experiences ?? [],
            'projects' => $portfolio?->projects ?? [],
            'skills' => $portfolio?->skills ?? [],
            'socialLinks' => $portfolio?->socialLinks ?? [],
            'educations' => $portfolio?->educations ?? [],
            'services' => $portfolio?->services ?? [],
        ])->toResponse($request)
          ->header('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    }
}
