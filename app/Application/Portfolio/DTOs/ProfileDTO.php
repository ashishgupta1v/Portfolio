<?php

declare(strict_types=1);

namespace App\Application\Portfolio\DTOs;

final readonly class ProfileDTO
{
    public function __construct(
        public string $name,
        public string $title,
        public string $subtitle,
        public string $bio,
        public string $email,
        public string $phone,
        public string $location,
        public ?string $avatarUrl,
        public ?string $resumeUrl,
    ) {}

    public static function fromModel(\App\Domain\Portfolio\Entities\Profile $profile): self
    {
        return new self(
            name: $profile->name,
            title: $profile->title,
            subtitle: $profile->subtitle,
            bio: $profile->bio,
            email: $profile->email,
            phone: $profile->phone,
            location: $profile->location,
            avatarUrl: $profile->avatar_url,
            resumeUrl: $profile->resume_url,
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'bio' => $this->bio,
            'email' => $this->email,
            'phone' => $this->phone,
            'location' => $this->location,
            'avatarUrl' => $this->avatarUrl,
            'resumeUrl' => $this->resumeUrl,
        ];
    }
}
