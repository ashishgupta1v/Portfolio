<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->trustProxies(at: '*');

        $middleware->alias([
            'admin.access' => \App\Http\Middleware\AdminAccess::class,
        ]);

        $middleware->web(prepend: [
            \App\Http\Middleware\RedirectLegacyDomain::class,
        ]);

        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \App\Http\Middleware\SecurityHeaders::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        \Sentry\Laravel\Integration::handles($exceptions);

        // Route HTML 404s (and Route/ModelNotFound) through the Inertia SPA
        // so the visitor lands on a branded page rather than Laravel's default
        // stack trace or a bare error view. JSON/API-shaped requests keep the
        // native JSON response.
        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            if ($request->expectsJson()) {
                return null;
            }

            return \Inertia\Inertia::render('Errors/NotFound', [
                'requestedPath' => '/' . ltrim($request->path(), '/'),
                'seo' => [
                    'title' => '404 — Page not found — Ashish Gupta',
                    'description' => "The page you were looking for isn't here.",
                    'path' => '/' . ltrim($request->path(), '/'),
                ],
            ])->toResponse($request)->setStatusCode(404);
        });
    })->create();
