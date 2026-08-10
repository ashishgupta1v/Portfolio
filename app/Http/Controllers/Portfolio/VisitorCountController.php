<?php

declare(strict_types=1);

namespace App\Http\Controllers\Portfolio;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

final class VisitorCountController
{
    public function __invoke(): JsonResponse
    {
        $sessionId = session()->getId();
        $sessionKey = "visitor:{$sessionId}";

        Cache::put($sessionKey, true, now()->addMinutes(5));

        $total = Cache::increment('total-page-views');

        $activeKey = 'active-visitor-count';
        if (!Cache::has($sessionKey . ':counted')) {
            Cache::increment($activeKey);
            Cache::put($sessionKey . ':counted', true, now()->addMinutes(5));
        }

        $active = max(1, (int) Cache::get($activeKey, 1));

        return response()->json([
            'active' => $active,
            'total' => $total,
        ]);
    }
}
