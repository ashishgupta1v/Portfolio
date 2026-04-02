<?php

declare(strict_types=1);

namespace App\Domain\Portfolio\Enums;

enum SkillCategory: string
{
    case CORE_STACK = 'Core Stack';
    case FRONTEND = 'Frontend';
    case ARCHITECTURE = 'Architecture';
    case TOOLING = 'Tooling & Quality';
    case AI_CLOUD = 'AI & Cloud';
}
