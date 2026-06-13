<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;

final class ContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, list<string>> */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email:rfc,dns', 'max:254'],
            'budget' => ['nullable', 'string', 'max:100'],
            'project_type' => ['required', Rule::in([
                'Website',
                'SaaS Product',
                'Internal Dashboard',
                'Automation Workflow',
                'Legacy Modernization',
                'AI Integration',
                'Other',
            ])],
            'timeline' => ['nullable', Rule::in([
                'Urgent (within 2 weeks)',
                'This month',
                '1-2 months',
                '3+ months',
                'Exploring options',
            ])],
            'message' => ['required', 'string', 'max:2000'],
            // Honeypot: bots tend to fill every available field.
            'company_website' => ['nullable', 'max:0'],
            // Time-trap: instant submissions are typically scripted traffic.
            'form_started_at' => ['required', 'integer', 'min:1'],
            'source_page' => ['nullable', 'string', 'max:255'],
            'referrer_url' => ['nullable', 'url', 'max:2048'],
            'utm_source' => ['nullable', 'string', 'max:120'],
            'utm_medium' => ['nullable', 'string', 'max:120'],
            'utm_campaign' => ['nullable', 'string', 'max:120'],
            'utm_term' => ['nullable', 'string', 'max:120'],
            'utm_content' => ['nullable', 'string', 'max:120'],
            'gclid' => ['nullable', 'string', 'max:120'],
            'fbclid' => ['nullable', 'string', 'max:120'],
        ];
    }

    protected function passedValidation(): void
    {
        $startedAtMs = (int) $this->validated('form_started_at');
        $elapsedMs = (int) round((microtime(true) * 1000) - $startedAtMs);

        if ($elapsedMs < 4000) {
            throw ValidationException::withMessages([
                'message' => 'Form submitted too quickly. Please review your details and try again.',
            ]);
        }

        $this->merge([
            'source_page' => $this->validated('source_page') ?: $this->path(),
            'referrer_url' => $this->validated('referrer_url') ?: $this->headers->get('referer'),
        ]);
    }
}
