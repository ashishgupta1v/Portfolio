<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <style>
        body { font-family: Arial, sans-serif; color: #1e293b; background: #f8fafc; margin: 0; padding: 24px; }
        .card { background: #fff; border-radius: 6px; padding: 28px 32px; max-width: 560px; margin: 0 auto; border: 1px solid #e2e8f0; }
        h2 { margin: 0 0 20px; font-size: 1.1rem; color: #0f172a; }
        .row { margin-bottom: 14px; }
        .label { font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b; margin-bottom: 4px; }
        .value { font-size: 0.95rem; color: #1e293b; white-space: pre-wrap; }
        .footer { margin-top: 24px; font-size: 0.78rem; color: #94a3b8; }
    </style>
</head>
<body>
<div class="card">
    <h2>New inquiry via ashishgupta.dev</h2>

    <div class="row">
        <div class="label">Name</div>
        <div class="value">{{ $senderName }}</div>
    </div>

    <div class="row">
        <div class="label">Email</div>
        <div class="value">{{ $senderEmail }}</div>
    </div>

    @if($budget)
    <div class="row">
        <div class="label">Budget</div>
        <div class="value">{{ $budget }}</div>
    </div>
    @endif

    <div class="row">
        <div class="label">Message</div>
        <div class="value">{{ $message }}</div>
    </div>

    <div class="footer">Reply directly to this email to respond to {{ $senderName }}.</div>
</div>
</body>
</html>
