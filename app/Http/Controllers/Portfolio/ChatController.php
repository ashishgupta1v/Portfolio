<?php

declare(strict_types=1);

namespace App\Http\Controllers\Portfolio;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

final class ChatController
{
    public function __invoke(Request $request): JsonResponse
    {
        $request->validate([
            'messages' => ['required', 'array'],
            'messages.*.role' => ['required', 'string', 'in:user,assistant'],
            'messages.*.content' => ['required', 'string'],
        ]);

        $messages = $request->input('messages');
        $apiKey = config('services.openai.key');

        if (! $apiKey) {
            // Graceful offline demo fallback
            $lastUserMessage = '';
            for ($i = count($messages) - 1; $i >= 0; $i--) {
                if ($messages[$i]['role'] === 'user') {
                    $lastUserMessage = strtolower($messages[$i]['content']);
                    break;
                }
            }

            $reply = "I'm currently running in offline demo mode because Ashish's OpenAI API key has not been configured in the .env file. Once configured, I will be a fully autonomous assistant! You can still ask me about his tech stack or how to contact him in this mode.";

            if (str_contains($lastUserMessage, 'contact') || str_contains($lastUserMessage, 'hire') || str_contains($lastUserMessage, 'email') || str_contains($lastUserMessage, 'phone')) {
                $reply = "You can contact Ashish Gupta directly via email at ashishgupta1v@gmail.com, call him at +91-9087021592, or connect on LinkedIn (https://www.linkedin.com/in/ashishgupta1v/).";
            } elseif (str_contains($lastUserMessage, 'tech') || str_contains($lastUserMessage, 'stack') || str_contains($lastUserMessage, 'skill') || str_contains($lastUserMessage, 'framework')) {
                $reply = "Ashish is a VILT Stack Specialist (Vue 3, Inertia.js, Laravel 12, Tailwind CSS) with 9+ years of experience. He is also skilled in TypeScript, Node.js, PostgreSQL, Docker, and AWS.";
            } elseif (str_contains($lastUserMessage, 'experience') || str_contains($lastUserMessage, 'work') || str_contains($lastUserMessage, 'job') || str_contains($lastUserMessage, 'infosys')) {
                $reply = "Ashish is currently a Lead Product Engineer & Architect at Infosys. He has also worked at Capital Numbers Infotech, Logiware Inc., and TCS, specializing in modernizing legacy monoliths and designing domain-driven systems.";
            }

            return response()->json([
                'reply' => $reply,
                'offline' => true,
            ]);
        }

        // Map roles/format for OpenAI Chat Completion endpoint
        $formattedMessages = [];

        $systemInstruction = "You are the AI Assistant for Ashish Gupta's personal portfolio website.
Your goal is to answer questions about Ashish's professional experience, technical skills, projects, education, and how to contact him.
Be polite, engaging, and professional. Keep your responses concise (ideally under 3-4 sentences) so they fit nicely in a chat bubble.

Here is the context about Ashish Gupta:
- Name: Ashish Gupta
- Title: Senior Full-Stack Architect
- Subtitle: VILT Stack Specialist (Vue 3, Inertia, Laravel, Tailwind)
- Bio: High-performance Engineering Architect with 9+ years of experience. Specializes in modernizing legacy Healthcare and Aviation monoliths into decoupled, domain-driven systems. Reduced cloud infrastructure costs by $1M/year through architectural optimization.
- Email: ashishgupta1v@gmail.com
- Phone: +91-9087021592
- Location: India
- Resume: /resume/ashish-gupta-resume.pdf
- GitHub: https://github.com/ashishgupta1v
- LinkedIn: https://www.linkedin.com/in/ashishgupta1v/

Experiences:
1. Infosys (Feb 2023 - Present): Lead Product Engineer & Architect. Led the architectural transformation of legacy healthcare monoliths into decoupled Modular Monoliths using DDD ($1M annual savings). Optimized high-concurrency Clinical Trial Management systems using Redis Queues (Horizon) and real-time sync (reducing trial monitoring latency by 30%). Designed OAuth2/OpenID Connect flows using Laravel Passport for HIPAA compliance.
2. Capital Numbers Infotech (Aug 2022 - Dec 2022): Senior Software Engineer. Engineered assessment engine with real-time validation, built dashboards using Vue.js and WebSockets.
3. Logiware Inc. (Mar 2022 - Aug 2022): Vue.js Developer (Migration Specialist). Migrated monolithic warehouse systems to Vue 3 & Laravel 9 (16% efficiency gain), built RBAC systems.
4. TCS (Jul 2017 - Mar 2022): System Engineer. Automated aviation engine configuration tracking (eliminated 70% manual entries), developed predictive maintenance modules for diagnostics (reduced repair costs by 11%).

Featured Projects:
1. ZoetiCoach AI (https://zoeticoach.com/): A WhatsApp-first B2B2C accountability SaaS built with Laravel 12, Vue 3, WhatsApp API, pgvector, and OpenAI.
2. Krishan Balram Gaushala (https://krishanbalramgaushala.com/): Devotee engagement and event management portal built with Laravel, Vue 3, WhatsApp Business API. Included canvas compression and SQLite WAL concurrency tuning.
3. Habuilt Tracker (https://habuilt.com/): Habit tracking and performance app built with Next.js, React, Tailwind CSS, TypeScript, and Node.js.
4. Digital Builders (https://digitalbuilders.in/): B2B delivery engine bringing Silicon Valley engineering discipline and autonomous AI agents to high-scale businesses.
5. shaiyra (https://shaiyra.com/): Secure, client-side encrypted baby-tracking journal and health ledger. Built with Vue 3, Laravel, client-side encryption.

Skills:
- Core Stack: JavaScript, TypeScript, PHP, Node.js, Laravel, PostgreSQL, MySQL
- Frontend: HTML5, CSS3, Vue 3, Nuxt.js, Tailwind CSS, Inertia.js, Vite
- Architecture: DDD (Domain-Driven Design), Event-Driven Architecture, SOLID, Microservices, RESTful API Design
- Tooling & Quality: npm, Docker, Apache, Nginx, Jenkins
- AI & Cloud: Cursor, Claude Code, OpenClaw, AWS

Education:
- Master of Computer Applications (MCA), Vellore Institute of Technology (2015 - 2017)
- Bachelor of Computer Applications (BCA), Panjab University (2012 - 2015)

Rules for your responses:
1. Only speak about Ashish's work. If a user asks unrelated general questions (e.g., 'What is capital of France?' or 'Write a python script to merge lists'), politely decline and suggest asking about Ashish's background or skills.
2. Do not invent details. If you don't know the answer, say that you don't know, and suggest they contact Ashish directly at ashishgupta1v@gmail.com.
3. Use markdown formatting where appropriate (like bullet points or bold text), but keep it simple.";

        $formattedMessages[] = [
            'role' => 'system',
            'content' => $systemInstruction,
        ];

        foreach ($messages as $message) {
            $formattedMessages[] = [
                'role' => $message['role'] === 'assistant' ? 'assistant' : 'user',
                'content' => $message['content'],
            ];
        }

        $model = config('services.openai.model', 'gpt-4o-mini');

        try {
            $response = Http::withToken($apiKey)
                ->timeout(12)
                ->post('https://api.openai.com/v1/chat/completions', [
                    'model' => $model,
                    'messages' => $formattedMessages,
                    'temperature' => 0.5,
                    'max_tokens' => 400,
                ]);

            if ($response->failed()) {
                Log::error('OpenAI API Error: ' . $response->body());
                return response()->json([
                    'error' => 'Failed to retrieve response from AI assistant.'
                ], 502);
            }

            $data = $response->json();
            $reply = $data['choices'][0]['message']['content'] ?? '';

            if (empty($reply)) {
                return response()->json([
                    'error' => 'Received empty response from AI assistant.'
                ], 502);
            }

            return response()->json([
                'reply' => $reply,
                'offline' => false,
            ]);

        } catch (\Throwable $e) {
            Log::error('Chat Widget Exception: ' . $e->getMessage(), [
                'exception' => $e
            ]);
            return response()->json([
                'error' => 'An unexpected error occurred.'
            ], 500);
        }
    }
}
