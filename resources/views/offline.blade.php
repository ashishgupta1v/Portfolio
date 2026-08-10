<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Offline — Ashish Gupta</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0a0a0f;
            color: #e2e8f0;
            font-family: system-ui, -apple-system, sans-serif;
            padding: 2rem;
        }
        .offline-card {
            text-align: center;
            max-width: 400px;
        }
        .offline-icon { font-size: 3rem; margin-bottom: 1.5rem; }
        h1 { font-size: 1.5rem; margin-bottom: 0.75rem; }
        p { color: #94a3b8; line-height: 1.7; margin-bottom: 1.5rem; }
        .retry-btn {
            display: inline-block;
            padding: 0.6rem 1.5rem;
            background: #14b8a6;
            color: #0a0a0f;
            border: none;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="offline-card">
        <div class="offline-icon">📡</div>
        <h1>You're Offline</h1>
        <p>It looks like you've lost your internet connection. Please check your network and try again.</p>
        <a href="/" class="retry-btn" onclick="window.location.reload(); return false;">Retry</a>
    </div>
</body>
</html>
