<?php

declare(strict_types=1);

namespace App\Application\CaseStudies\Actions;

use App\Application\CaseStudies\DTOs\CaseStudyPageDTO;
use App\Domain\CaseStudies\Repositories\CaseStudyRepositoryInterface;

final readonly class GetCaseStudyAction
{
    public function __construct(
        private CaseStudyRepositoryInterface $repository,
    ) {}

    public function execute(string $slug): ?CaseStudyPageDTO
    {
        $document = $this->repository->findBySlug($slug);

        if ($document === null) {
            return null;
        }

        return CaseStudyPageDTO::fromDocument($document);
    }
}