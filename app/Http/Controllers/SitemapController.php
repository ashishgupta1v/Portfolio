<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Domain\CaseStudies\Repositories\CaseStudyRepositoryInterface;
use Illuminate\Http\Response;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

final class SitemapController
{
    public function __construct(
        private CaseStudyRepositoryInterface $caseStudies,
    ) {}

    public function __invoke(): Response
    {
        $sitemap = Sitemap::create()
            ->add(Url::create('/')->setPriority(1.0)->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY))
            ->add(Url::create('/case-studies')->setPriority(0.8)->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY))
            ->add(Url::create('/engagements')->setPriority(0.7)->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY));

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

        return response($sitemap->render(), 200, [
            'Content-Type' => 'application/xml',
        ]);
    }
}
