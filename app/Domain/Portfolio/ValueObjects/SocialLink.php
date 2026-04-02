<?php

declare(strict_types=1);

namespace App\Domain\Portfolio\ValueObjects;

use App\Domain\Portfolio\Enums\SocialPlatform;

final readonly class SocialLink
{
    public function __construct(
        public SocialPlatform $platform,
        public string $url,
        public string $label,
    ) {}
}
