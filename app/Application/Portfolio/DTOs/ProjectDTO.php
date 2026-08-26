<?php

declare(strict_types=1);

namespace App\Application\Portfolio\DTOs;

final readonly class ProjectDTO
{
    /**
     * @param array<int, string> $tools
     * @param array<int, string>|null $architectureActions
     * @param array<int, string>|null $businessImpact
     */
    public function __construct(
        public string $title,
        public string $slug,
        public string $category,
        public ?string $positioning,
        public ?string $metricBadge,
        public string $description,
        public ?string $solution,
        public ?string $impact,
        public ?string $caseStudySlug,
        public bool $isMobile,
        public ?string $problem,
        public ?string $challenge,
        public ?array $architectureActions,
        public ?array $businessImpact,
        public array $tools,
        public ?string $imageUrl,
        public ?string $videoUrl,
        public ?string $externalUrl,
    ) {}

    public static function fromModel(\App\Domain\Portfolio\Entities\Project $project): self
    {
        return new self(
            title: $project->title,
            slug: $project->slug,
            category: $project->category,
            positioning: $project->positioning,
            metricBadge: $project->metric_badge,
            description: $project->description,
            solution: $project->solution,
            impact: $project->impact,
            caseStudySlug: $project->case_study_slug,
            isMobile: (bool) $project->is_mobile,
            problem: $project->problem,
            challenge: $project->challenge,
            architectureActions: $project->architecture_actions ?? [],
            businessImpact: $project->business_impact ?? [],
            tools: $project->tools ?? [],
            imageUrl: $project->image_url,
            videoUrl: $project->video_url,
            externalUrl: $project->external_url,
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'title' => $this->title,
            'slug' => $this->slug,
            'category' => $this->category,
            'positioning' => $this->positioning,
            'metricBadge' => $this->metricBadge,
            'description' => $this->description,
            'solution' => $this->solution,
            'impact' => $this->impact,
            'caseStudySlug' => $this->caseStudySlug,
            'isMobile' => $this->isMobile,
            'problem' => $this->problem,
            'challenge' => $this->challenge,
            'architectureActions' => $this->architectureActions,
            'businessImpact' => $this->businessImpact,
            'tools' => $this->tools,
            'imageUrl' => $this->imageUrl,
            'videoUrl' => $this->videoUrl,
            'externalUrl' => $this->externalUrl,
        ];
    }
}
