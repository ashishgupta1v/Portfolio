<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Domain\Blog\Repositories\BlogRepositoryInterface;
use App\Domain\CaseStudies\Repositories\CaseStudyRepositoryInterface;
use App\Domain\Portfolio\Repositories\PortfolioRepositoryInterface;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Date;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

final class SitemapController
{
    public function __construct(
        private CaseStudyRepositoryInterface $caseStudies,
        private BlogRepositoryInterface $blogPosts,
        private PortfolioRepositoryInterface $portfolio,
    ) {}

    public function __invoke(): Response
    {
        $sitemap = Sitemap::create()
            ->add(Url::create('/')->setPriority(1.0)->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY))
            ->add(Url::create('/case-studies')->setPriority(0.8)->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY))
            ->add(Url::create('/engagements')->setPriority(0.7)->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY))
            ->add(Url::create('/blog')->setPriority(0.8)->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY));

        // Project detail pages — one per profile.projects row.
        $profile = $this->portfolio->getProfileWithRelations();
        if ($profile !== null) {
            foreach ($profile->projects as $project) {
                $sitemap->add(
                    Url::create("/projects/{$project->slug}")
                        ->setPriority(0.75)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                );
            }
        }

        foreach ($this->caseStudies->all() as $caseStudy) {
            $sitemap->add(
                Url::create("/case-studies/{$caseStudy->slug}")
                    ->setPriority(0.9)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                    ->setLastModificationDate(
                        $caseStudy->publishedAt
                            ? \DateTimeImmutable::createFromFormat('Y-m-d', $caseStudy->publishedAt)
                            : new \DateTimeImmutable()
                    )
            );
        }

        foreach ($this->blogPosts->all() as $post) {
            if (Date::parse($post->publishedAt)->isFuture()) {
                continue;
            }

            $sitemap->add(
                Url::create("/blog/{$post->slug}")
                    ->setPriority(0.7)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                    ->setLastModificationDate(
                        $post->publishedAt
                            ? \DateTimeImmutable::createFromFormat('Y-m-d', $post->publishedAt)
                            : new \DateTimeImmutable()
                    )
            );
        }

        return response($sitemap->render(), 200, [
            'Content-Type' => 'application/xml',
        ]);
    }
}
