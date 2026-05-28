<?php

declare(strict_types=1);

namespace App\Http\Controllers\CaseStudies;

use App\Application\CaseStudies\Actions\GetCaseStudyAction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

final class CaseStudyShowController
{
    public function __invoke(Request $request, string $slug, GetCaseStudyAction $action): Response
    {
        $caseStudy = $action->execute($slug);

        abort_if($caseStudy === null, 404);

        $response = Inertia::render('CaseStudies/Show', [
            'caseStudy' => $caseStudy->toArray(),
        ])->toResponse($request);

        $response->headers->set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

        return $response;
    }
}