<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class AdminAccess
{
    public function handle(Request $request, Closure $next): Response
    {
        $expectedUser = (string) env('ADMIN_PANEL_USER', '');
        $expectedPass = (string) env('ADMIN_PANEL_PASS', '');

        if ($expectedUser === '' || $expectedPass === '') {
            abort(503, 'Admin panel credentials are not configured. Set ADMIN_PANEL_USER and ADMIN_PANEL_PASS.');
        }

        $providedUser = (string) $request->getUser();
        $providedPass = (string) $request->getPassword();

        $userMatches = hash_equals($expectedUser, $providedUser);
        $passMatches = hash_equals($expectedPass, $providedPass);

        if (! $userMatches || ! $passMatches) {
            return response('Unauthorized', 401, [
                'WWW-Authenticate' => 'Basic realm="Lead Admin"',
            ]);
        }

        return $next($request);
    }
}
