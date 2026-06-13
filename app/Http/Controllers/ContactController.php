<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactInquiry;
use App\Models\ContactInquiryLead;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

final class ContactController
{
    public function __invoke(ContactRequest $request): RedirectResponse
    {
        $payload = $request->validated();

        $score = $this->calculateLeadScore(
            budget: (string) ($payload['budget'] ?? ''),
            projectType: (string) $payload['project_type'],
            timeline: (string) ($payload['timeline'] ?? ''),
            hasAttribution: ! empty($payload['utm_source']) || ! empty($payload['referrer_url']),
        );

        $status = $score >= 70 ? 'qualified' : 'new';

        $sourcePage = (string) ($payload['source_page'] ?? $request->path());
        $referrerUrl = (string) ($payload['referrer_url'] ?? $request->headers->get('referer', ''));

        $lead = ContactInquiryLead::query()->create([
            'name' => $payload['name'],
            'email' => $payload['email'],
            'budget' => $payload['budget'] ?? null,
            'project_type' => $payload['project_type'],
            'timeline' => $payload['timeline'] ?? null,
            'message' => $payload['message'],
            'status' => $status,
            'lead_score' => $score,
            'source_page' => $sourcePage !== '' ? $sourcePage : null,
            'referrer_url' => $referrerUrl !== '' ? $referrerUrl : null,
            'utm_source' => $payload['utm_source'] ?? null,
            'utm_medium' => $payload['utm_medium'] ?? null,
            'utm_campaign' => $payload['utm_campaign'] ?? null,
            'utm_term' => $payload['utm_term'] ?? null,
            'utm_content' => $payload['utm_content'] ?? null,
            'gclid' => $payload['gclid'] ?? null,
            'fbclid' => $payload['fbclid'] ?? null,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'spam_flags' => [
                'quick_submit' => false,
                'honeypot_hit' => false,
            ],
        ]);

        Mail::to(config('mail.contact_address', 'ashishgupta1v@gmail.com'))
            ->send(new ContactInquiry(
                leadId: $lead->id,
                senderName: $payload['name'],
                senderEmail: $payload['email'],
                budget: (string) ($payload['budget'] ?? ''),
                projectType: $payload['project_type'],
                timeline: (string) ($payload['timeline'] ?? ''),
                leadScore: $score,
                leadStatus: $status,
                message: $payload['message'],
                sourcePage: $sourcePage,
                referrerUrl: $referrerUrl,
                utmSource: (string) ($payload['utm_source'] ?? ''),
                utmMedium: (string) ($payload['utm_medium'] ?? ''),
                utmCampaign: (string) ($payload['utm_campaign'] ?? ''),
            ));

        return back();
    }

    private function calculateLeadScore(string $budget, string $projectType, string $timeline, bool $hasAttribution): int
    {
        $score = 25;

        $budgetScores = [
            'Under ₹50,000' => 5,
            '₹50,000 – ₹1,50,000' => 20,
            '₹1,50,000 – ₹5,00,000' => 32,
            '₹5,00,000+' => 40,
            "Let's discuss" => 16,
            '' => 10,
        ];

        $timelineScores = [
            'Urgent (within 2 weeks)' => 25,
            'This month' => 20,
            '1-2 months' => 15,
            '3+ months' => 8,
            'Exploring options' => 5,
            '' => 6,
        ];

        $complexProjectTypes = [
            'SaaS Product',
            'Internal Dashboard',
            'Legacy Modernization',
            'AI Integration',
            'Automation Workflow',
        ];

        $score += $budgetScores[$budget] ?? 8;
        $score += $timelineScores[$timeline] ?? 6;
        $score += in_array($projectType, $complexProjectTypes, true) ? 10 : 5;
        $score += $hasAttribution ? 5 : 0;

        return min(100, $score);
    }
}
