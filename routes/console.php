<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Contracts\Http\Kernel as HttpKernel;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('portfolio:prerender', function () {
    $outputPath = public_path('index.html');

    /** @var HttpKernel $kernel */
    $kernel = app(HttpKernel::class);
    $request = Request::create('/', 'GET', [], [], [], [
        'HTTP_ACCEPT' => 'text/html',
        'HTTP_USER_AGENT' => 'ssg-prerender',
    ]);

    /** @var HttpResponse $response */
    $response = $kernel->handle($request);

    try {
        if ($response->getStatusCode() !== 200) {
            $this->error("Prerender failed with status {$response->getStatusCode()}.");
            return self::FAILURE;
        }

        file_put_contents($outputPath, $response->getContent());
        $this->info("Static page generated at {$outputPath}");

        return self::SUCCESS;
    } finally {
        $kernel->terminate($request, $response);
    }
})->purpose('Pre-render the portfolio page into public/index.html for static hosting');
