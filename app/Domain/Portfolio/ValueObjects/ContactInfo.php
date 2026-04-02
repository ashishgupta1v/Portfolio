<?php

declare(strict_types=1);

namespace App\Domain\Portfolio\ValueObjects;

final readonly class ContactInfo
{
    public function __construct(
        public string $email,
        public string $phone,
        public string $location,
    ) {}
}
