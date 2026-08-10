<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NewsletterController extends Controller
{
    public function subscribe(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Please enter a valid email address.',
            ], 422);
        }

        $existing = Subscriber::where('email', $request->email)->first();

        if ($existing) {
            if ($existing->unsubscribed_at) {
                $existing->update(['unsubscribed_at' => null, 'subscribed_at' => now()]);
                return response()->json([
                    'success' => true,
                    'message' => 'Welcome back! You have been re-subscribed.',
                ]);
            }
            return response()->json([
                'success' => true,
                'message' => 'You are already subscribed!',
            ]);
        }

        Subscriber::create([
            'email' => $request->email,
            'source' => $request->input('source', 'website'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Thanks for subscribing! You will receive updates about new articles and projects.',
        ]);
    }
}
