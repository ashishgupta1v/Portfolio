<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Create Vercel specific temporary directories
$tmpDirs = [
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/cache',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/logs',
    '/tmp/bootstrap/cache'
];
foreach ($tmpDirs as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }
}

try {
    // Bootstrap Laravel and handle the request...
    /** @var Application $app */
    $app = require_once __DIR__.'/../bootstrap/app.php';

    // Override storage path for read-only filesystem
    $app->useStoragePath('/tmp/storage');
    
    // Override bootstrap cache paths since /var/task/user is read-only
    $app->useBootstrapPath('/tmp/bootstrap');

    // Override specific paths before boot
    putenv('VIEW_COMPILED_PATH=/tmp/storage/framework/views');
    $_ENV['VIEW_COMPILED_PATH'] = '/tmp/storage/framework/views';
    $_SERVER['VIEW_COMPILED_PATH'] = '/tmp/storage/framework/views';

    // Override Exception Handler to catch the root cause without using views
    $app->singleton(
        \Illuminate\Contracts\Debug\ExceptionHandler::class,
        function () {
            return new class implements \Illuminate\Contracts\Debug\ExceptionHandler {
                public function report(\Throwable $e) {}
                public function shouldReport(\Throwable $e) { return false; }
                public function render($request, \Throwable $e) {
                    echo "<h1>ROOT EXCEPTION CAUGHT:</h1>";
                    echo "<h3>" . get_class($e) . "</h3>";
                    echo "<p>" . $e->getMessage() . "</p>";
                    echo "<pre>" . $e->getTraceAsString() . "</pre>";
                    if ($e->getPrevious()) {
                        echo "<h3>Previous:</h3>";
                        echo "<p>" . $e->getPrevious()->getMessage() . "</p>";
                        echo "<pre>" . $e->getPrevious()->getTraceAsString() . "</pre>";
                    }
                    exit(1);
                }
                public function renderForConsole($output, \Throwable $e) {}
            };
        }
    );

    $app->handleRequest(Request::capture());
} catch (\Throwable $e) {
    echo "<h1>Early Boot Error</h1>";
    echo "<p>" . $e->getMessage() . "</p>";
    echo "<pre>" . $e->getTraceAsString() . "</pre>";
}
