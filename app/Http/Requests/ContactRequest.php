<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
            'name'    => ['required', 'string', 'max:100'],
            'email'   => ['required', 'email:rfc,dns', 'max:254'],
            'budget'  => ['nullable', 'string', 'max:100'],
            'message' => ['required', 'string', 'max:2000'],
        ];
    }
}
