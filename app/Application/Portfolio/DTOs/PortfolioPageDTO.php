<?php

declare(strict_types=1);

namespace App\Application\Portfolio\DTOs;

use App\Domain\Portfolio\Entities\Profile;

final readonly class PortfolioPageDTO
{
    /**
     * @param array<int, array<string, mixed>> $experiences
     * @param array<int, array<string, mixed>> $projects
     * @param array<string, array<int, array<string, mixed>>> $skills
     * @param array<int, array<string, mixed>> $socialLinks
     * @param array<int, array<string, mixed>> $educations
     * @param array<int, array<string, mixed>> $services
     */
    public function __construct(
        public array $profile,
        public array $experiences,
        public array $projects,
        public array $skills,
        public array $socialLinks,
        public array $educations,
        public array $services,
    ) {}

    public static function fromProfile(Profile $profile): self
    {
        $profileDTO = ProfileDTO::fromModel($profile);

        $experiences = $profile->experiences
            ->map(fn ($exp) => ExperienceDTO::fromModel($exp)->toArray())
            ->all();

        $projects = $profile->projects
            ->map(fn ($proj) => ProjectDTO::fromModel($proj)->toArray())
            ->all();

        $skills = $profile->skills
            ->groupBy(fn ($skill) => $skill->category->value)
            ->map(fn ($group) => $group->map(fn ($s) => SkillDTO::fromModel($s)->toArray())->all())
            ->all();

        $socialLinks = $profile->socialLinks
            ->map(fn ($link) => SocialLinkDTO::fromModel($link)->toArray())
            ->all();

        $educations = $profile->educations
            ->map(fn ($edu) => EducationDTO::fromModel($edu)->toArray())
            ->all();

        $services = $profile->services
            ->map(fn ($svc) => ServiceDTO::fromModel($svc)->toArray())
            ->all();

        return new self(
            profile: $profileDTO->toArray(),
            experiences: $experiences,
            projects: $projects,
            skills: $skills,
            socialLinks: $socialLinks,
            educations: $educations,
            services: $services,
        );
    }
}
