<?php

declare(strict_types=1);

namespace App\Http\Controllers\Portfolio;

use App\Application\Portfolio\Actions\GetProjectAction;
use App\Domain\CaseStudies\Repositories\CaseStudyRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

final class ProjectShowController
{
    private const CASE_STUDY_MAP = [
        'zoeticoach-ai' => 'zoeticoach-ai-whatsapp-accountability-engine',
        'krishan-balram-gaushala' => 'krishan-balram-gaushala-devotee-engagement-platform',
        'dhanda-diary' => 'dhanda-diary-business-execution-operating-system',
        'dhandadiary' => 'dhanda-diary-business-execution-operating-system',
        'digital-builders' => 'digital-builders-agency-conversion-platform',
        'ashishgupta-hub' => 'digital-builders-agency-conversion-platform',
        'myastrova' => 'myastrova-astrology-consultation-commerce-platform',
    ];

    public function __invoke(
        Request $request,
        string $slug,
        GetProjectAction $action,
        CaseStudyRepositoryInterface $caseStudyRepo
    ): Response {
        $project = $action->execute($slug);

        abort_if($project === null, 404);

        $data = $project->toArray();
        $projectSlug = $data['slug'] ?? $slug;

        $caseStudySlug = self::CASE_STUDY_MAP[$projectSlug] ?? null;
        if ($caseStudySlug === null) {
            $caseStudy = $caseStudyRepo->findBySlug($projectSlug);
            if ($caseStudy) {
                $caseStudySlug = $caseStudy->slug;
            } else {
                foreach ($caseStudyRepo->all() as $cs) {
                    if (str_starts_with($cs->slug, $projectSlug . '-')) {
                        $caseStudySlug = $cs->slug;
                        break;
                    }
                }
            }
        }

        $response = Inertia::render('Projects/Show', [
            'project' => $data,
            'caseStudySlug' => $caseStudySlug,
            'seo' => [
                'title' => ($data['title'] ?? 'Project') . ' — Ashish Gupta',
                'description' => $data['description'] ?? '',
                'path' => '/projects/' . ($data['slug'] ?? $slug),
                'type' => 'article',
                'image' => $data['imageUrl'] ?? '/images/og-cover.png',
            ],
        ])->toResponse($request);

        $response->headers->set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

        return $response;
    }
}
