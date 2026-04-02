<?php

declare(strict_types=1);

namespace App\Application\Portfolio\DTOs;

final readonly class ProjectDTO
{
    /**
     * @param array<int, string> $tools
     */
    public function __construct(
        public string $title,
        public string $slug,
        public string $category,
        public string $description,
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
            description: $project->description,
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
            'description' => $this->description,
            'tools' => $this->tools,
            'imageUrl' => $this->imageUrl,
            'videoUrl' => $this->videoUrl,
            'externalUrl' => $this->externalUrl,
        ];
    }
}
