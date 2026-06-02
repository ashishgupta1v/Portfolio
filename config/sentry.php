<?php

return [

    // @see https://docs.sentry.io/platforms/php/guides/laravel/configuration/options/
    'dsn' => env('SENTRY_LARAVEL_DSN', env('SENTRY_DSN')),

    // The release version of your application
    // Example with dynamic git hash: trim(exec('git --git-dir ' . base_path('.git') . ' log --pretty="%h" -n1 HEAD'))
    'release' => env('SENTRY_RELEASE'),

    // When left empty or `null` the Laravel environment will be used (usually `production`)
    'environment' => env('SENTRY_ENVIRONMENT'),

    'breadcrumbs' => [
        // Capture bindings on SQL queries logged in breadcrumbs
        'sql_bindings' => false,

        // Capture default queue job information in breadcrumbs
        'queue_info' => true,

        // Capture information about commands run in the breadcrumbs
        'command_info' => true,

        // Capture HTTP client request information in breadcrumbs
        'http_client_requests' => true,

        // Capture logs in breadcrumbs
        'logs' => true,
    ],

    'tracing' => [
        // Trace queue jobs as their own transactions
        'queue_job_transactions' => env('SENTRY_TRACE_QUEUE_ENABLED', false),

        // Capture queue jobs as spans when executed on the sync driver
        'queue_jobs' => true,

        // Capture SQL queries as spans
        'sql_queries' => true,

        // Try to find out where the SQL query originated from and add it to the query span
        'sql_origin' => true,

        // Define a threshold in milliseconds for SQL queries to be considered slow
        'sql_origin_threshold_ms' => 100,

        // Capture views as spans
        'views' => true,

        // Capture Livewire components as spans
        'livewire' => true,

        // Capture HTTP client requests as spans
        'http_client_requests' => true,

        // Capture Redis operations as spans (requires the phpredis extension)
        'redis_commands' => false,

        // Try to find out where the Redis command originated from and add it to the command span
        'redis_origin' => false,

        // Enable tracing for requests without a matching route (404s)
        'missing_routes' => false,

        // Configures if the performance trace should continue after the response has been sent to the user
        'continue_after_response' => true,

        // The requests that should not be tracked with a transaction on Sentry
        'ignore_request_paths' => [
            '/up',
        ],
    ],

    // Performance monitoring
    // @see https://docs.sentry.io/platforms/php/guides/laravel/tracing/
    'traces_sample_rate' => (float) env('SENTRY_TRACES_SAMPLE_RATE', 0.1),

    // Performance profiling
    // @see https://docs.sentry.io/platforms/php/guides/laravel/profiling/
    'profiles_sample_rate' => (float) env('SENTRY_PROFILES_SAMPLE_RATE', 0.1),
];
