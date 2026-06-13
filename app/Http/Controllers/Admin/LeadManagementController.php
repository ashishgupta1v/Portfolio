<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Models\ContactInquiryLead;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

final class LeadManagementController
{
    /** @var list<string> */
    private const STATUSES = ['new', 'qualified', 'proposal', 'won', 'lost'];

    public function index(Request $request): View
    {
        $status = (string) $request->query('status', 'all');
        $q = trim((string) $request->query('q', ''));

        $leadsQuery = ContactInquiryLead::query()
            ->when($status !== 'all', fn ($query) => $query->where('status', $status))
            ->when($q !== '', function ($query) use ($q): void {
                $query->where(function ($inner) use ($q): void {
                    $inner->where('name', 'like', "%{$q}%")
                        ->orWhere('email', 'like', "%{$q}%")
                        ->orWhere('project_type', 'like', "%{$q}%")
                        ->orWhere('message', 'like', "%{$q}%");
                });
            })
            ->orderByDesc('created_at');

        $leads = $leadsQuery->paginate(25)->withQueryString();

        $counts = ContactInquiryLead::query()
            ->selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        return view('admin.leads.index', [
            'leads' => $leads,
            'statusFilter' => $status,
            'queryFilter' => $q,
            'statusCounts' => $counts,
            'statuses' => self::STATUSES,
            'today' => Carbon::now()->toDateString(),
        ]);
    }

    public function updateStatus(Request $request, ContactInquiryLead $lead): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:new,qualified,proposal,won,lost'],
        ]);

        $lead->update([
            'status' => $validated['status'],
        ]);

        return back()->with('status', "Lead #{$lead->id} updated to {$validated['status']}.");
    }
}
