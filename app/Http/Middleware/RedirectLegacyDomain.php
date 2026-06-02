<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class RedirectLegacyDomain
{
    public function handle(Request $request, Closure $next): Response
    {
        $host = strtolower($request->getHost());

        if (in_array($host, ['ashgpt.dev', 'www.ashgpt.dev'], true)) {
            return redirect()->to('https://ashishgupta.dev'.$request->getRequestUri(), 301);
        }

        return $next($request);
    }
}
