<?php

declare(strict_types=1);

namespace App\Application\Portfolio\DTOs;

final readonly class SkillDTO
{
    public function __construct(
        public string $name,
        public string $category,
        public ?string $iconUrl,
    ) {}

    public static function fromModel(\App\Domain\Portfolio\Entities\Skill $skill): self
    {
        return new self(
            name: $skill->name,
            category: $skill->category->value,
            iconUrl: $skill->icon_url,
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'category' => $this->category,
            'iconUrl' => $this->iconUrl,
        ];
    }
}
