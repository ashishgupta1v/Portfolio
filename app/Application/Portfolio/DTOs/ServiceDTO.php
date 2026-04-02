<?php

declare(strict_types=1);

namespace App\Application\Portfolio\DTOs;

final readonly class ServiceDTO
{
    public function __construct(
        public string $title,
        public string $description,
        public ?string $icon,
    ) {}

    public static function fromModel(\App\Domain\Portfolio\Entities\Service $service): self
    {
        return new self(
            title: $service->title,
            description: $service->description,
            icon: $service->icon,
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'title' => $this->title,
            'description' => $this->description,
            'icon' => $this->icon,
        ];
    }
}
