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
            'seo' => [
                'title' => 'Case Studies — Ashish Gupta',
                'description' => 'Detailed write-ups of production systems I have architected and shipped — the constraints, the trade-offs, and the measured outcomes.',
                'path' => '/case-studies',
            ],
        ])->toResponse($request);

        $response->headers->set('Cache-Control', 'no-cache, private');

        return $response;
    }
}