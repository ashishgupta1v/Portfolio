<?php

declare(strict_types=1);

namespace App\Http\Controllers\CaseStudies;

use App\Application\CaseStudies\Actions\GetCaseStudiesAction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

final class CaseStudyIndexController
{
    public function __invoke(Request $request, GetCaseStudiesAction $action): Response
    {
        $caseStudies = $action->execute();

        $response = Inertia::render('CaseStudies/Index', [
            'caseStudies' => $caseStudies->caseStudies,
        ])->toResponse($request);

        $response->headers->set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

        return $response;
    }
}