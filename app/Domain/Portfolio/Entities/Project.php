<?php

declare(strict_types=1);

namespace App\Domain\Portfolio\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class Project extends Model
{
    protected $fillable = [
        'profile_id',
        'title',
        'slug',
        'category',
        'positioning',
        'metric_badge',
        'description',
        'solution',
        'impact',
        'case_study_slug',
        'is_mobile',
        'problem',
        'challenge',
        'architecture_actions',
        'business_impact',
        'tools',
        'image_url',
        'video_url',
        'external_url',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'tools' => 'array',
            'is_mobile' => 'boolean',
            'architecture_actions' => 'array',
            'business_impact' => 'array',
            'sort_order' => 'integer',
        ];
    }

    /** @return BelongsTo<Profile, $this> */
    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }
}
