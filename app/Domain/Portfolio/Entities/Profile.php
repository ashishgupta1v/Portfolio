<?php

declare(strict_types=1);

namespace App\Domain\Portfolio\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class Profile extends Model
{
    protected $fillable = [
        'name',
        'title',
        'subtitle',
        'bio',
        'email',
        'phone',
        'location',
        'avatar_url',
        'resume_url',
    ];

    /** @return HasMany<Experience, $this> */
    public function experiences(): HasMany
    {
        return $this->hasMany(Experience::class)->orderBy('sort_order');
    }

    /** @return HasMany<Project, $this> */
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class)->orderBy('sort_order');
    }

    /** @return HasMany<Skill, $this> */
    public function skills(): HasMany
    {
        return $this->hasMany(Skill::class)->orderBy('sort_order');
    }

    /** @return HasMany<SocialLink, $this> */
    public function socialLinks(): HasMany
    {
        return $this->hasMany(SocialLink::class);
    }

    /** @return HasMany<Education, $this> */
    public function educations(): HasMany
    {
        return $this->hasMany(Education::class)->orderBy('sort_order');
    }

    /** @return HasMany<Service, $this> */
    public function services(): HasMany
    {
        return $this->hasMany(Service::class)->orderBy('sort_order');
    }
}
