<?php

declare(strict_types=1);

namespace App\Domain\Portfolio\Entities;

use App\Domain\Portfolio\Enums\SkillCategory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class Skill extends Model
{
    protected $fillable = [
        'profile_id',
        'name',
        'category',
        'icon_url',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'category' => SkillCategory::class,
            'sort_order' => 'integer',
        ];
    }

    /** @return BelongsTo<Profile, $this> */
    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }
}
