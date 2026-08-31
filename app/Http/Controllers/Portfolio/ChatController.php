<?php

declare(strict_types=1);

namespace App\Http\Controllers\Portfolio;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

final class ChatController
{
    /**
     * Number of trailing messages forwarded to the model. The endpoint is
     * unauthenticated and billed per token, so history is capped here rather
     * than trusting whatever the client posts.
     */
    private const MAX_HISTORY = 10;

    /** Per-message character cap, enforced before anything reaches the model. */
    private const MAX_CONTENT_LENGTH = 1000;

    public function __invoke(Request $request): JsonResponse
    {
        $request->validate([
            'messages' => ['required', 'array', 'max:40'],
            'messages.*.role' => ['required', 'string', 'in:user,assistant'],
            'messages.*.content' => ['required', 'string', 'max:' . self::MAX_CONTENT_LENGTH],
        ]);

        // Keep only the tail of the conversation: cost scales with input
        // tokens, and older turns add little for a scoped Q&A assistant.
        $messages = array_slice($request->input('messages'), -self::MAX_HISTORY);

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

            $reply = "I'm currently running in offline demo mode. You can still ask me about Ashish's stack, availability, AI/RAG experience, measurable impact, or how to contact him!";

            if (str_contains($lastUserMessage, 'open to full-time') || str_contains($lastUserMessage, 'available') || str_contains($lastUserMessage, 'start') || str_contains($lastUserMessage, 'relocat')) {
                $reply = "Yes — Ashish is actively interviewing for full-time roles and can start immediately. He works remote worldwide with 4–6 hours of daily overlap for US (EST/PST) and full UK/EU overlap, and is open to relocation for the right role.\n\nWant to take it further? You can [download Ashish's résumé](/resume/ashish-gupta-resume.pdf) or [book a 20-minute call](https://calendly.com/ashishgupta1v/30min) with him — he replies within one business day.";
            } elseif (str_contains($lastUserMessage, 'strongest stack') || str_contains($lastUserMessage, 'tech') || str_contains($lastUserMessage, 'stack') || str_contains($lastUserMessage, 'framework')) {
                $reply = "Ashish is a Senior Architect on the VILT stack — Vue 3, Inertia.js, Laravel 13, and Tailwind CSS — with Domain-Driven Design (DDD), PostgreSQL/Redis, Docker, and AWS. On the AI engineering side: Production RAG, OpenAI & Claude APIs, and pgvector.\n\nWant to take it further? You can [download Ashish's résumé](/resume/ashish-gupta-resume.pdf) or [book a 20-minute call](https://calendly.com/ashishgupta1v/30min).";
            } elseif (str_contains($lastUserMessage, 'ai') || str_contains($lastUserMessage, 'rag') || str_contains($lastUserMessage, 'vector') || str_contains($lastUserMessage, 'llm') || str_contains($lastUserMessage, 'agent')) {
                $reply = "Ashish builds *production* AI, not demos: a grounded, guarded RAG pipeline (OpenAI + pgvector) running live on WhatsApp for ZoetiCoach — sub-second and hallucination-resistant, with prompt-injection defense. Open-source reference: his `laravel-rag-pgvector` repo on GitHub.\n\nWant to take it further? You can [download Ashish's résumé](/resume/ashish-gupta-resume.pdf) or [book a 20-minute call](https://calendly.com/ashishgupta1v/30min).";
            } elseif (str_contains($lastUserMessage, 'notice') || str_contains($lastUserMessage, 'timezone') || str_contains($lastUserMessage, 'work auth') || str_contains($lastUserMessage, 'authorization') || str_contains($lastUserMessage, 'visa')) {
                $reply = "Ashish is authorized to work in India, open to remote worldwide contracts, and open to visa sponsorship / relocation for top-tier roles. Notice period: immediate / 0-2 weeks. Timezone: IST with 4–6 hours daily dedicated overlap with US (EST/PST) and full UK/EU overlap.\n\nWant to take it further? You can [download Ashish's résumé](/resume/ashish-gupta-resume.pdf) or [book a 20-minute call](https://calendly.com/ashishgupta1v/30min).";
            } elseif (str_contains($lastUserMessage, 'impact') || str_contains($lastUserMessage, 'measurable') || str_contains($lastUserMessage, 'savings') || str_contains($lastUserMessage, 'infosys') || str_contains($lastUserMessage, 'experience')) {
                $reply = "At Infosys he delivered ~$1M/year in cloud savings and a 60% user-efficiency gain by modernizing legacy healthcare monoliths with DDD, and cut clinical-trial monitoring latency 30% (saving $360K in 2024). He also led a squad of 7 with Pest/Vitest 0-defect standards.\n\nWant to take it further? You can [download Ashish's résumé](/resume/ashish-gupta-resume.pdf) or [book a 20-minute call](https://calendly.com/ashishgupta1v/30min).";
            } elseif (str_contains($lastUserMessage, 'contact') || str_contains($lastUserMessage, 'email') || str_contains($lastUserMessage, 'hire') || str_contains($lastUserMessage, 'call')) {
                $reply = "You can reach Ashish directly via email at [ashishgupta1v@gmail.com](mailto:ashishgupta1v@gmail.com), [book a 20-minute call](https://calendly.com/ashishgupta1v/30min), or view his executive brief at [/for-hiring-managers](/for-hiring-managers). He replies within one business day.";
            }

            return response()->json([
                'reply' => $reply,
                'offline' => true,
            ]);
        }

        // Map roles/format for OpenAI Chat Completion endpoint
        $formattedMessages = [];

        $systemInstruction = "You represent Ashish Gupta to recruiters, hiring managers, and prospective collaborators.
Answer only from his verified profile (experience, skills, projects, availability). Be concise, confident, and accurate.
Keep your answers brief (under 3-4 sentences).

When a recruiter or user shows buying intent (asking about availability, hiring, stack, impact, or projects), always offer his résumé and the option to book a call, formatted as:
\"Want to take it further? You can [download Ashish's résumé](/resume/ashish-gupta-resume.pdf) or [book a 20-minute call](https://calendly.com/ashishgupta1v/30min) with him here — he replies within one business day.\"

Verified facts about Ashish Gupta:
- Name: Ashish Gupta
- Title: Senior Full-Stack Architect & AI Systems Engineer
- Subtitle: VILT Stack Specialist (Vue 3, Inertia, Laravel 13, Tailwind) & Production AI / Distributed Systems Architect
- Experience: 10+ years shipping scalable web systems and production AI end-to-end.
- Target Roles: Senior / Staff / Lead Full-Stack Engineer, AI Engineer, Forward-Deployed Engineer, Principal Architect
- Availability: Immediately Available / Actively Interviewing (Open to Full-Time Remote Worldwide & Relocation)
- Notice Period: Immediate / 0-2 weeks
- Timezone Overlap: India (IST / UTC+5:30), provides 4–6 hours daily dedicated overlap with US timezones (EST/PST) and full overlap with UK/Europe
- Work Authorization: Authorized to work in India; open to remote worldwide and to visa sponsorship / relocation
- Email: ashishgupta1v@gmail.com
- Calendly Booking: https://calendly.com/ashishgupta1v/30min
- Résumé: /resume/ashish-gupta-resume.pdf
- Hiring Manager Brief: /for-hiring-managers
- GitHub: https://github.com/ashishgupta1v
- LinkedIn: https://www.linkedin.com/in/ashish-gupta-dev/

Core Impact & Highlights:
1. Infosys (Feb 2023 - Present): Lead Product Engineer & Architect. Modernized legacy healthcare monoliths into decoupled Modular Monoliths using DDD (~$1M annual cloud savings, 60% user efficiency gain). Reduced clinical trial monitoring latency by 30% ($360K saved in 2024). Designed HIPAA-compliant OAuth2/OIDC security. Led technical squad of 7 and enforced Pest/Vitest 0-defect standards.
2. ZoetiCoach AI (https://zoeticoach.com/): Grounded, guarded RAG pipeline (OpenAI + pgvector) running live on WhatsApp — sub-second latency and hallucination-resistant, with prompt-injection defense. Open-source reference: `laravel-rag-pgvector` repo.
3. Dhanda Diary (https://dhandadiary.cloud/): Business execution OS built on Laravel 13, Vue 3, Inertia, and SQLite WAL multi-tenant ledger.
4. TCS (Jul 2017 - Mar 2022): Automated aviation engine configuration tracking (eliminated 70% manual entries), diagnostic predictive maintenance (cut repair costs 11%).

Technical Stack:
- AI Engineering: Production RAG, Vector Search (pgvector), Embeddings (OpenAI), Tool Use / Function Calling, Prompt Injection Defense, Hallucination Mitigation, Autonomous Agents
- Core: Vue 3, Inertia.js, Laravel 13, Tailwind CSS, TypeScript, PHP 8.4, Python, PostgreSQL, Redis (Horizon), AWS, Docker

Guardrails:
1. ONLY answer questions directly about Ashish Gupta's work, experience, projects, skills, education, availability, and contact information.
2. If asked off-topic questions, decline politely: 'I can only answer questions related to Ashish Gupta\'s professional profile, skills, projects, and work history. Feel free to ask about those!'
3. Never invent facts, metrics, or timelines. If unknown, say: 'I\'d have Ashish confirm that directly — feel free to [email him](mailto:ashishgupta1v@gmail.com) or [book a 20-minute call](https://calendly.com/ashishgupta1v/30min).'
4. Maintain a professional, helpful tone.";

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
                    'temperature' => 0.1,
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
