<?php

declare(strict_types=1);

namespace App\Domain\CaseStudies\Repositories;

use App\Domain\CaseStudies\Data\CaseStudyDocument;

interface CaseStudyRepositoryInterface
{
    /** @return list<CaseStudyDocument> */
    public function all(): array;

    public function findBySlug(string $slug): ?CaseStudyDocument;
}