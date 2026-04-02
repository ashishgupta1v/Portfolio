<?php

declare(strict_types=1);

namespace App\Domain\Portfolio\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class Experience extends Model
{
    protected $fillable = [
        'profile_id',
        'company',
        'role',
        'location',
        'start_date',
        'end_date',
        'highlights',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'highlights' => 'array',
            'sort_order' => 'integer',
        ];
    }

    /** @return BelongsTo<Profile, $this> */
    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }

    public function dateRange(): string
    {
        return $this->end_date
            ? "{$this->start_date} - {$this->end_date}"
            : "{$this->start_date} - Present";
    }
}
