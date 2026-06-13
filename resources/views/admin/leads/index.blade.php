<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lead Management · Ashish Gupta Portfolio</title>
    <style>
        :root {
            --bg: #050a14;
            --panel: #0d1626;
            --border: #1f2937;
            --text: #e5e7eb;
            --muted: #94a3b8;
            --accent: #5eead4;
            --ok: #22c55e;
            --warn: #f59e0b;
            --danger: #ef4444;
            --info: #60a5fa;
        }
        * { box-sizing: border-box; }
        body {
            margin: 0;
            background: linear-gradient(180deg, #030712 0%, #0b1321 100%);
            color: var(--text);
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            padding: 24px;
        }
        .wrap {
            max-width: 1240px;
            margin: 0 auto;
        }
        .topbar {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 16px;
        }
        h1 {
            margin: 0;
            font-size: 1.4rem;
            letter-spacing: 0.02em;
        }
        .sub {
            margin-top: 6px;
            color: var(--muted);
            font-size: 0.88rem;
        }
        .card {
            background: rgba(13, 22, 38, 0.86);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 16px;
            backdrop-filter: blur(4px);
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(6, minmax(120px, 1fr));
            gap: 10px;
            margin-bottom: 14px;
        }
        .stat {
            border: 1px solid rgba(148, 163, 184, 0.18);
            border-radius: 10px;
            padding: 10px;
            background: rgba(2, 6, 23, 0.55);
        }
        .stat-label {
            color: var(--muted);
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }
        .stat-value {
            margin-top: 5px;
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--accent);
        }
        .filters {
            display: grid;
            grid-template-columns: 200px 1fr auto;
            gap: 10px;
            margin-bottom: 16px;
        }
        input, select, button {
            width: 100%;
            border-radius: 8px;
            border: 1px solid rgba(148, 163, 184, 0.28);
            background: #0b1220;
            color: var(--text);
            padding: 10px 12px;
            font-size: 0.9rem;
        }
        button {
            cursor: pointer;
            background: #0f1e33;
            transition: 0.2s ease;
        }
        button:hover { border-color: var(--accent); }
        .btn-primary {
            background: #5eead4;
            color: #052229;
            border-color: #5eead4;
            font-weight: 700;
            white-space: nowrap;
            width: auto;
            padding: 10px 16px;
        }
        .flash {
            margin-bottom: 12px;
            border: 1px solid rgba(34, 197, 94, 0.5);
            background: rgba(34, 197, 94, 0.13);
            color: #86efac;
            border-radius: 8px;
            padding: 10px 12px;
        }
        .table-wrap {
            overflow-x: auto;
            border-radius: 10px;
            border: 1px solid rgba(148, 163, 184, 0.2);
        }
        table {
            width: 100%;
            min-width: 1120px;
            border-collapse: collapse;
            background: rgba(2, 6, 23, 0.65);
        }
        th, td {
            text-align: left;
            padding: 11px 12px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.16);
            vertical-align: top;
            font-size: 0.86rem;
        }
        th {
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: 0.7rem;
            color: var(--muted);
            background: rgba(15, 23, 42, 0.8);
        }
        .email a,
        .link a {
            color: #a5f3fc;
            text-decoration: none;
        }
        .email a:hover,
        .link a:hover { text-decoration: underline; }
        .muted {
            color: var(--muted);
            font-size: 0.75rem;
            margin-top: 3px;
        }
        .msg {
            max-width: 350px;
            white-space: pre-wrap;
            line-height: 1.45;
        }
        .badge {
            display: inline-flex;
            align-items: center;
            border-radius: 999px;
            padding: 3px 9px;
            font-size: 0.72rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-weight: 700;
        }
        .s-new { background: rgba(96, 165, 250, 0.2); color: #93c5fd; }
        .s-qualified { background: rgba(34, 197, 94, 0.2); color: #86efac; }
        .s-proposal { background: rgba(245, 158, 11, 0.2); color: #fcd34d; }
        .s-won { background: rgba(16, 185, 129, 0.25); color: #6ee7b7; }
        .s-lost { background: rgba(239, 68, 68, 0.2); color: #fca5a5; }
        .score {
            font-weight: 700;
            color: var(--accent);
        }
        .inline-form {
            display: flex;
            gap: 8px;
            align-items: center;
        }
        .inline-form select {
            min-width: 130px;
        }
        .inline-form button {
            width: auto;
            padding: 8px 11px;
            font-size: 0.78rem;
        }
        .pagination {
            margin-top: 12px;
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }
        .pagination span,
        .pagination a {
            border: 1px solid rgba(148, 163, 184, 0.24);
            border-radius: 6px;
            padding: 6px 10px;
            color: var(--text);
            text-decoration: none;
            font-size: 0.82rem;
        }
        .pagination .active {
            background: rgba(94, 234, 212, 0.2);
            border-color: rgba(94, 234, 212, 0.5);
            color: var(--accent);
        }
        @media (max-width: 980px) {
            .stats { grid-template-columns: repeat(2, minmax(120px, 1fr)); }
            .filters { grid-template-columns: 1fr; }
            .btn-primary { width: 100%; }
        }
    </style>
</head>
<body>
<div class="wrap">
    <div class="topbar">
        <div>
            <h1>Lead Management</h1>
            <div class="sub">Date: {{ $today }} · Track and move inquiries through the sales pipeline.</div>
        </div>
        <div class="sub">Statuses: new, qualified, proposal, won, lost</div>
    </div>

    @if(session('status'))
        <div class="flash">{{ session('status') }}</div>
    @endif

    <div class="card">
        <div class="stats">
            <div class="stat">
                <div class="stat-label">Total</div>
                <div class="stat-value">{{ array_sum($statusCounts->toArray()) }}</div>
            </div>
            @foreach($statuses as $statusName)
                <div class="stat">
                    <div class="stat-label">{{ ucfirst($statusName) }}</div>
                    <div class="stat-value">{{ $statusCounts[$statusName] ?? 0 }}</div>
                </div>
            @endforeach
        </div>

        <form method="GET" action="{{ route('admin.leads.index') }}" class="filters">
            <select name="status">
                <option value="all" @selected($statusFilter === 'all')>All statuses</option>
                @foreach($statuses as $statusName)
                    <option value="{{ $statusName }}" @selected($statusFilter === $statusName)>
                        {{ ucfirst($statusName) }}
                    </option>
                @endforeach
            </select>
            <input type="text" name="q" value="{{ $queryFilter }}" placeholder="Search by name, email, project type, or message" />
            <button type="submit" class="btn-primary">Apply Filters</button>
        </form>

        <div class="table-wrap">
            <table>
                <thead>
                <tr>
                    <th>ID / Date</th>
                    <th>Contact</th>
                    <th>Project Fit</th>
                    <th>Attribution</th>
                    <th>Message</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                @forelse($leads as $lead)
                    <tr>
                        <td>
                            <div>#{{ $lead->id }}</div>
                            <div class="muted">{{ $lead->created_at?->format('Y-m-d H:i') }}</div>
                        </td>
                        <td>
                            <div>{{ $lead->name }}</div>
                            <div class="email"><a href="mailto:{{ $lead->email }}">{{ $lead->email }}</a></div>
                            @if($lead->budget)
                                <div class="muted">Budget: {{ $lead->budget }}</div>
                            @endif
                        </td>
                        <td>
                            <div>{{ $lead->project_type }}</div>
                            @if($lead->timeline)
                                <div class="muted">Timeline: {{ $lead->timeline }}</div>
                            @endif
                            <div class="score">Score: {{ $lead->lead_score }}/100</div>
                        </td>
                        <td>
                            <div>{{ $lead->source_page ?: '-' }}</div>
                            @if($lead->utm_source || $lead->utm_medium || $lead->utm_campaign)
                                <div class="muted">UTM: {{ $lead->utm_source ?: '-' }} · {{ $lead->utm_medium ?: '-' }} · {{ $lead->utm_campaign ?: '-' }}</div>
                            @endif
                            @if($lead->referrer_url)
                                <div class="link"><a href="{{ $lead->referrer_url }}" target="_blank" rel="noopener noreferrer">Referrer</a></div>
                            @endif
                        </td>
                        <td class="msg">{{ $lead->message }}</td>
                        <td>
                            <span class="badge s-{{ $lead->status }}">{{ $lead->status }}</span>
                            <form method="POST" action="{{ route('admin.leads.status.update', $lead) }}" class="inline-form" style="margin-top: 8px;">
                                @csrf
                                @method('PATCH')
                                <select name="status">
                                    @foreach($statuses as $statusName)
                                        <option value="{{ $statusName }}" @selected($lead->status === $statusName)>
                                            {{ ucfirst($statusName) }}
                                        </option>
                                    @endforeach
                                </select>
                                <button type="submit">Update</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6">No leads found for the selected filter.</td>
                    </tr>
                @endforelse
                </tbody>
            </table>
        </div>

        @if($leads->hasPages())
            <div class="pagination">
                @if($leads->onFirstPage())
                    <span>Previous</span>
                @else
                    <a href="{{ $leads->previousPageUrl() }}">Previous</a>
                @endif

                <span class="active">Page {{ $leads->currentPage() }} of {{ $leads->lastPage() }}</span>

                @if($leads->hasMorePages())
                    <a href="{{ $leads->nextPageUrl() }}">Next</a>
                @else
                    <span>Next</span>
                @endif
            </div>
        @endif
    </div>
</div>
</body>
</html>
