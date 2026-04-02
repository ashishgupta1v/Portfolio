<?php

declare(strict_types=1);

namespace App\Domain\Portfolio\Enums;

enum SocialPlatform: string
{
    case GITHUB = 'github';
    case LINKEDIN = 'linkedin';
    case EMAIL = 'email';
}
