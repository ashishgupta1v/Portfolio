<?php

declare(strict_types=1);

namespace App\Application\Portfolio\DTOs;

final readonly class ExperienceDTO
{
    /**
     * @param array<int, string> $highlights
     */
    public function __construct(
        public string $company,
        public string $role,
        public string $location,
        public string $startDate,
        public ?string $endDate,
        public array $highlights,
    ) {}

    public static function fromModel(\App\Domain\Portfolio\Entities\Experience $experience): self
    {
        return new self(
            company: $experience->company,
            role: $experience->role,
            location: $experience->location,
            startDate: $experience->start_date,
            endDate: $experience->end_date,
            highlights: $experience->highlights ?? [],
        );
    }

    public function dateRange(): string
    {
        return $this->endDate
            ? "{$this->startDate} - {$this->endDate}"
            : "{$this->startDate} - Present";
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'company' => $this->company,
            'role' => $this->role,
            'location' => $this->location,
            'startDate' => $this->startDate,
            'endDate' => $this->endDate,
            'dateRange' => $this->dateRange(),
            'highlights' => $this->highlights,
        ];
    }
}
