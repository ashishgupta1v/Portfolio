<?php

declare(strict_types=1);

namespace App\Application\Portfolio\DTOs;

final readonly class EducationDTO
{
    /**
     * @param array<int, string> $courses
     */
    public function __construct(
        public string $institution,
        public string $degree,
        public string $location,
        public string $startYear,
        public string $endYear,
        public array $courses,
    ) {}

    public static function fromModel(\App\Domain\Portfolio\Entities\Education $education): self
    {
        return new self(
            institution: $education->institution,
            degree: $education->degree,
            location: $education->location,
            startYear: $education->start_year,
            endYear: $education->end_year,
            courses: $education->courses ?? [],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'institution' => $this->institution,
            'degree' => $this->degree,
            'location' => $this->location,
            'startYear' => $this->startYear,
            'endYear' => $this->endYear,
            'courses' => $this->courses,
        ];
    }
}
