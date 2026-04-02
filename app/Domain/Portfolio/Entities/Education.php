<?php

declare(strict_types=1);

namespace App\Domain\Portfolio\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class Education extends Model
{
    protected $fillable = [
        'profile_id',
        'institution',
        'degree',
        'location',
        'start_year',
        'end_year',
        'courses',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'courses' => 'array',
            'sort_order' => 'integer',
        ];
    }

    /** @return BelongsTo<Profile, $this> */
    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }
}
