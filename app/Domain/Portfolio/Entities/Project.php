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
        'description',
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
            'sort_order' => 'integer',
        ];
    }

    /** @return BelongsTo<Profile, $this> */
    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }
}
