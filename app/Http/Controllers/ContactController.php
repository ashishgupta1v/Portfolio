<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactInquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

final class ContactController
{
    public function __invoke(ContactRequest $request): RedirectResponse
    {
        Mail::to(config('mail.contact_address', 'ashishgupta1v@gmail.com'))
            ->send(new ContactInquiry(
                senderName: $request->validated('name'),
                senderEmail: $request->validated('email'),
                budget: $request->validated('budget', ''),
                message: $request->validated('message'),
            ));

        return back();
    }
}
