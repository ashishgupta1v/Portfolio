<?php

declare(strict_types=1);

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

final class ContactInquiry extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly int $leadId,
        public readonly string $senderName,
        public readonly string $senderEmail,
        public readonly string $budget,
        public readonly string $projectType,
        public readonly string $timeline,
        public readonly int $leadScore,
        public readonly string $leadStatus,
        public readonly string $message,
        public readonly string $sourcePage,
        public readonly string $referrerUrl,
        public readonly string $utmSource,
        public readonly string $utmMedium,
        public readonly string $utmCampaign,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "New portfolio inquiry from {$this->senderName}",
            replyTo: [$this->senderEmail],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.contact-inquiry',
        );
    }
}
