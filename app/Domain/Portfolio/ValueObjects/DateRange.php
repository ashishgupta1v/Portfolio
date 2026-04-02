<?php

declare(strict_types=1);

namespace App\Domain\Portfolio\ValueObjects;

final readonly class DateRange
{
    public function __construct(
        public string $start,
        public ?string $end = null,
    ) {}

    public function formatted(): string
    {
        return $this->end
            ? "{$this->start} - {$this->end}"
            : "{$this->start} - Present";
    }
}
