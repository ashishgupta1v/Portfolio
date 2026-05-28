<?php

declare(strict_types=1);

namespace App\Application\CaseStudies\Actions;

use App\Application\CaseStudies\DTOs\CaseStudyCardDTO;
use App\Application\CaseStudies\DTOs\CaseStudiesPageDTO;
use App\Domain\CaseStudies\Repositories\CaseStudyRepositoryInterface;

final readonly class GetCaseStudiesAction
{
    public function __construct(
        private CaseStudyRepositoryInterface $repository,
    ) {}

    public function execute(): CaseStudiesPageDTO
    {
        return new CaseStudiesPageDTO(
            caseStudies: array_map(
                static fn ($document) => CaseStudyCardDTO::fromDocument($document)->toArray(),
                $this->repository->all(),
            ),
        );
    }
}