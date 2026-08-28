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

            $reply = "I'm currently running in offline demo mode because Ashish's OpenAI API key has not been configured in the .env file. Once configured, I will be a fully autonomous assistant! You can still ask me about his tech stack or how to contact him in this mode.";

            if (str_contains($lastUserMessage, 'notice') || str_contains($lastUserMessage, 'available') || str_contains($lastUserMessage, 'start') || str_contains($lastUserMessage, 'relocat')) {
                $reply = "Ashish is immediately available for full-time Senior/Staff Full-Stack Architect roles. He works remotely worldwide with dedicated US (EST/PST) and EU overlap, and is open to relocation for exceptional opportunities.";
            } elseif (str_contains($lastUserMessage, 'contact') || str_contains($lastUserMessage, 'hire') || str_contains($lastUserMessage, 'email') || str_contains($lastUserMessage, 'interview')) {
                $reply = "You can contact Ashish Gupta directly via email at ashishgupta1v@gmail.com, download his résumé at /resume/ashish-gupta-resume.pdf, or view his hiring brief at /for-hiring-managers.";
            } elseif (str_contains($lastUserMessage, 'tech') || str_contains($lastUserMessage, 'stack') || str_contains($lastUserMessage, 'skill') || str_contains($lastUserMessage, 'framework')) {
                $reply = "Ashish specializes in the VILT Stack (Vue 3, Inertia.js, Laravel 13, Tailwind CSS) alongside TypeScript, PHP 8.4, Node.js, PostgreSQL/pgvector, Redis, Docker, and AWS.";
            } elseif (str_contains($lastUserMessage, 'experience') || str_contains($lastUserMessage, 'work') || str_contains($lastUserMessage, 'job') || str_contains($lastUserMessage, 'infosys')) {
                $reply = "Ashish is a Senior Full-Stack Architect with 9+ years of experience across Infosys, Capital Numbers, Logiware, and TCS. He has driven $1M+ in cloud cost savings and led mission-critical healthcare and aviation systems.";
            }

            return response()->json([
                'reply' => $reply,
                'offline' => true,
            ]);
        }

        // Map roles/format for OpenAI Chat Completion endpoint
        $formattedMessages = [];

        $systemInstruction = "You are the AI Assistant for Ashish Gupta's personal portfolio website.
Your goal is to answer questions about Ashish's professional experience, technical skills, projects, education, availability, and how to interview or hire him.
Be polite, engaging, and professional. Keep your responses concise (ideally under 3-4 sentences) so they fit nicely in a chat bubble.

Here is the context about Ashish Gupta:
- Name: Ashish Gupta
- Title: Senior Full-Stack Architect & Engineering Leader
- Subtitle: VILT Stack Specialist (Vue 3, Inertia, Laravel, Tailwind) & Distributed Systems Architect
- Target Roles: Senior Full-Stack Architect, Staff Software Engineer, Engineering Lead, Principal Engineer
- Availability: Immediately Available / Flexible Start (Open to Full-Time Remote Worldwide & Relocation)
- Notice Period: Immediate / 0-2 weeks
- Timezone Overlap: India (IST / UTC+5:30), provides 4+ hours daily dedicated overlap with US timezones (EST/PST) and full overlap with UK/Europe and APAC
- Work Authorization: India Citizen, available for remote worldwide roles, open to visa sponsorship/relocation for top-tier opportunities
- Bio: High-performance Engineering Architect with 9+ years of experience. Specializes in modernizing legacy Healthcare and Aviation monoliths into decoupled, domain-driven systems. Reduced cloud infrastructure costs by $1M/year through architectural optimization.
- Email: ashishgupta1v@gmail.com
- Location: India (Remote Worldwide)
- Resume: /resume/ashish-gupta-resume.pdf
- Hiring Manager Brief: /for-hiring-managers
- GitHub: https://github.com/ashishgupta1v
- LinkedIn: https://www.linkedin.com/in/ashishgupta1v/

Experiences:
1. Infosys (Feb 2023 - Present): Lead Product Engineer & Architect. Led the architectural transformation of legacy healthcare monoliths into decoupled Modular Monoliths using DDD ($1M annual savings). Optimized high-concurrency Clinical Trial Management systems using Redis Queues (Horizon) and real-time sync (reducing trial monitoring latency by 30%). Designed OAuth2/OpenID Connect flows using Laravel Passport for HIPAA compliance.
2. Capital Numbers Infotech (Aug 2022 - Dec 2022): Senior Software Engineer. Engineered assessment engine with real-time validation, built dashboards using Vue.js and WebSockets.
3. Logiware Inc. (Mar 2022 - Aug 2022): Vue.js Developer (Migration Specialist). Migrated monolithic warehouse systems to Vue 3 & Laravel 9 (16% efficiency gain), built RBAC systems.
4. TCS (Jul 2017 - Mar 2022): System Engineer. Automated aviation engine configuration tracking (eliminated 70% manual entries), developed predictive maintenance modules for diagnostics (reduced repair costs by 11%).

Featured Projects:
1. ZoetiCoach AI (https://zoeticoach.com/): A WhatsApp-first B2B2C accountability SaaS built with Laravel 13, Vue 3, WhatsApp API, pgvector, and OpenAI RAG.
2. Habuilt (https://www.habuilt.com/): Habit building & fitness coaching platform scaled to 500K+ users with Next.js, TypeScript, and microservices architecture.
3. Dhanda Diary (https://dhandadiary.cloud/): Micro-business ERP & accounting execution OS built with Vue 3, Laravel 13, SQLite WAL, and multi-tenant ledger.
4. GutTalks (https://guttalks.in/): Integrative telehealth & clinical protocol engine with HIPAA-aligned patient workflows, automated consult scheduling, and secure records.
5. MyAstrova (https://myastrova.com/): Vedic astrology consultation & commerce platform with real-time audio/video consultations, ephemeris calculations, and payment gateway.
6. Krishan Balram Gaushala (https://krishanbalramgaushala.com/): Devotee engagement and event management portal built with Laravel, Vue 3, WhatsApp Business API, SQLite WAL concurrency.
7. SportsEntertainmentClub: High-performance cross-platform mobile app for court booking, player matchmaking, and tournament management built with Vue/Capacitor and offline SQLite.
8. Garg Enterprises: B2B industrial supply chain & order tracking mobile application with offline-first sync and barcode inventory scanning.
9. Digital Builders / Ashish Gupta Hub (https://digitalbuilders.in/ / https://ashishgupta.dev): B2B engineering delivery platform bringing Silicon Valley engineering discipline and autonomous AI agents to high-scale businesses.

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
1. ONLY answer questions directly about Ashish Gupta\'s work, experience, projects, skills, education, hiring availability, and contact info, based STRICTLY on the context provided above.
2. If the user asks general-knowledge questions, questions about other subjects, or tries to ask you to write code/write essays/do calculations not related to Ashish, you MUST politely decline. Respond with: \'I can only answer questions related to Ashish Gupta\\\'s professional profile, skills, projects, and work history. Feel free to ask about those!\'
3. Do not invent, extrapolate, or hallucinate any details. If the answer is not in the provided context, state that you do not have that information and suggest contacting Ashish directly at ashishgupta1v@gmail.com.
4. Keep all responses brief, friendly, and under 3 sentences.
5. **Role Fit & Recruiter Questions**: When asked about full-time roles, notice period, or relocation, clearly confirm he is open to full-time Senior/Staff roles, available immediately, and open to remote or relocation. Direct recruiters to `/for-hiring-managers` and provide the résumé link `/resume/ashish-gupta-resume.pdf`.
6. **Project Recommender**: When a visitor describes a business need or technical challenge, recommend relevant projects (e.g. ZoetiCoach AI for AI/RAG, Infosys for healthcare/high-concurrency) and invite them to connect via email.";

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
