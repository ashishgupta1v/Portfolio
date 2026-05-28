<?php

declare(strict_types=1);

namespace App\Application\CaseStudies\DTOs;

final readonly class CaseStudiesPageDTO
{
    /** @param list<array<string, mixed>> $caseStudies */
    public function __construct(
        public array $caseStudies,
    ) {}
}