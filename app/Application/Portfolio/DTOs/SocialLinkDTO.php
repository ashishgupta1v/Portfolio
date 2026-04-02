<?php

declare(strict_types=1);

namespace App\Application\Portfolio\DTOs;

final readonly class SocialLinkDTO
{
    public function __construct(
        public string $platform,
        public string $url,
        public string $label,
    ) {}

    public static function fromModel(\App\Domain\Portfolio\Entities\SocialLink $link): self
    {
        return new self(
            platform: $link->platform->value,
            url: $link->url,
            label: $link->label,
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'platform' => $this->platform,
            'url' => $this->url,
            'label' => $this->label,
        ];
    }
}
