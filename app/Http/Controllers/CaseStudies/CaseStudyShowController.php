<?php

declare(strict_types=1);

namespace App\Http\Controllers\CaseStudies;

use App\Application\CaseStudies\Actions\GetCaseStudyAction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

final class CaseStudyShowController
{
    private const ALIAS_REDIRECTS = [
        'zoeticoach-ai' => 'zoeticoach-ai-whatsapp-accountability-engine',
        'krishan-balram-gaushala' => 'krishan-balram-gaushala-devotee-engagement-platform',
        'dhanda-diary' => 'dhanda-diary-business-execution-operating-system',
        'dhandadiary' => 'dhanda-diary-business-execution-operating-system',
        'digital-builders' => 'digital-builders-agency-conversion-platform',
        'myastrova' => 'myastrova-astrology-consultation-commerce-platform',
    ];

    public function __invoke(Request $request, string $slug, GetCaseStudyAction $action): Response
    {
        if (isset(self::ALIAS_REDIRECTS[$slug])) {
            return redirect()->to('/case-studies/' . self::ALIAS_REDIRECTS[$slug], 301);
        }

        $caseStudy = $action->execute($slug);

        abort_if($caseStudy === null, 404);

        $data = $caseStudy->toArray();

        $response = Inertia::render('CaseStudies/Show', [
            'caseStudy' => $data,
            'seo' => [
                'title' => ($data['title'] ?? 'Case Study') . ' — Ashish Gupta',
                'description' => $data['summary'] ?? '',
                'path' => '/case-studies/' . ($data['slug'] ?? $slug),
                'type' => 'article',
            ],
        ])->toResponse($request);

        $response->headers->set('Cache-Control', 'no-cache, private');

        return $response;
    }
}