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

        $profile = $portfolio?->profile ?? [];
        $socialLinks = $portfolio?->socialLinks ?? [];
        $skills = $portfolio?->skills ?? [];

        return Inertia::render('Portfolio/Index', [
            'profile' => $profile,
            'experiences' => $portfolio?->experiences ?? [],
            'projects' => $portfolio?->projects ?? [],
            'skills' => $skills,
            'socialLinks' => $socialLinks,
            'educations' => $portfolio?->educations ?? [],
            'services' => $portfolio?->services ?? [],
            'seo' => $this->seo($profile, $socialLinks, $skills),
        ])->toResponse($request)
          ->header('Cache-Control', 'no-cache, private');
    }

    /**
     * Metadata for the Blade <head>. Mirrors what Portfolio/Index.vue used to
     * declare via Inertia's <Head>, which never reached non-JS crawlers.
     *
     * @param  array<string, mixed>  $profile
     * @param  array<int, array<string, mixed>>  $socialLinks
     * @param  array<string, array<int, array<string, mixed>>>  $skills
     * @return array<string, mixed>
     */
    private function seo(array $profile, array $socialLinks, array $skills): array
    {
        $name = $profile['name'] ?? 'Ashish Gupta';
        $title = $profile['title'] ?? 'Senior Full-Stack Architect';
        $metaDescription = 'Senior Full-Stack Architect with 9+ years experience in VILT stack (Vue 3, Laravel 13, Inertia, Tailwind) and legacy modernization. Open to full-time roles.';
        $schemaBio = 'Senior Full-Stack Architect with 9+ years experience specializing in the VILT Stack (Vue 3, Inertia, Laravel 13, Tailwind) and Domain-Driven Design. Proven track record reducing enterprise cloud infrastructure costs by $1M/year.';

        $sameAs = array_values(array_filter(
            array_map(static fn (array $link): string => (string) ($link['url'] ?? ''), $socialLinks),
            static fn (string $url): bool => $url !== '' && ! str_starts_with($url, 'mailto:'),
        ));

        $knowsAbout = [];
        foreach ($skills as $group) {
            foreach ($group as $skill) {
                if (isset($skill['name'])) {
                    $knowsAbout[] = $skill['name'];
                }
            }
        }

        return [
            'title' => "{$name} — {$title}",
            'description' => $metaDescription,
            'path' => '/',
            'type' => 'website',
            'schemas' => [
                [
                    '@context' => 'https://schema.org',
                    '@type' => 'Person',
                    'name' => $name,
                    'url' => 'https://ashishgupta.dev/',
                    'jobTitle' => $title,
                    'description' => $schemaBio,
                    'email' => $profile['email'] ?? null,
                    'sameAs' => $sameAs,
                    'knowsAbout' => $knowsAbout,
                    'worksFor' => ['@type' => 'Organization', 'name' => 'Infosys'],
                ],
                [
                    '@context' => 'https://schema.org',
                    '@type' => 'WebSite',
                    'url' => 'https://ashishgupta.dev/',
                    'name' => $name,
                    'description' => "{$title} — VILT Stack Specialist",
                ],
            ],
        ];
    }
}
