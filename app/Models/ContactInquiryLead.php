<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

final class ContactInquiryLead extends Model
{
    use HasFactory;

    protected $table = 'contact_inquiries';

    protected $fillable = [
        'name',
        'email',
        'budget',
        'project_type',
        'timeline',
        'message',
        'status',
        'lead_score',
        'source_page',
        'referrer_url',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content',
        'gclid',
        'fbclid',
        'ip_address',
        'user_agent',
        'spam_flags',
    ];

    protected function casts(): array
    {
        return [
            'spam_flags' => 'array',
        ];
    }
}
