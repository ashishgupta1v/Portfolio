<?php

declare(strict_types=1);

namespace App\Domain\Portfolio\Entities;

use App\Domain\Portfolio\Enums\SocialPlatform;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class SocialLink extends Model
{
    protected $fillable = [
        'profile_id',
        'platform',
        'url',
        'label',
    ];

    protected function casts(): array
    {
        return [
            'platform' => SocialPlatform::class,
        ];
    }

    /** @return BelongsTo<Profile, $this> */
    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }
}
