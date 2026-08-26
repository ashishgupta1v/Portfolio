<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Domain\Portfolio\Entities\Education;
use App\Domain\Portfolio\Entities\Experience;
use App\Domain\Portfolio\Entities\Profile;
use App\Domain\Portfolio\Entities\Project;
use App\Domain\Portfolio\Entities\Service;
use App\Domain\Portfolio\Entities\Skill;
use App\Domain\Portfolio\Entities\SocialLink;
use Illuminate\Database\Seeder;

final class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $profile = Profile::updateOrCreate(
            ['email' => 'ashishgupta1v@gmail.com'],
            [
                'name' => 'Ashish Gupta',
                'title' => 'Senior Full-Stack Architect',
                'subtitle' => 'VILT Stack Specialist',
                'bio' => 'High-performance Engineering Architect with 9+ years of experience specializing in the VILT Stack (Vue 3, Inertia, Laravel 13, Tailwind). Unique value proposition lies in modernizing legacy Healthcare and Aviation monoliths into scalable, domain-driven systems. Proven track record of reducing cloud infrastructure costs by $1M/year through architectural optimization.',
                'phone' => '+91-9087021592',
                'location' => 'India',
                'avatar_url' => '/images/ashish-gupta-avatar.webp',
                'resume_url' => '/resume/ashish-gupta-resume.pdf',
            ]
        );

        $this->seedExperiences($profile);
        $this->seedProjects($profile);
        $this->seedSkills($profile);
        $this->seedSocialLinks($profile);
        $this->seedEducation($profile);
        $this->seedServices($profile);
    }

    private function seedExperiences(Profile $profile): void
    {
        $experiences = [
            [
                'company' => 'Infosys',
                'role' => 'Lead Product Engineer & Architect',
                'location' => 'India',
                'start_date' => 'Feb 2023',
                'end_date' => null,
                'highlights' => [
                    'Led the architectural transformation of legacy healthcare monoliths into decoupled Modular Monoliths using Domain-Driven Design (DDD), resulting in $1M annual savings and a 60% increase in user efficiency.',
                    'Optimized high-concurrency Clinical Trial Management systems via Redis Queues (Horizon) and real-time data sync, reducing trial monitoring latency by 30% and saving $360K in 2024.',
                    'Spearheaded an AI-assisted development culture for a squad of 7 engineers; enforced strict Pest and Vitest testing standards to ensure 0-defect deployments.',
                    'Designed and implemented robust OAuth2/OpenID Connect flows using Laravel Passport to ensure HIPAA compliance for sensitive biotech research data.',
                ],
                'sort_order' => 1,
            ],
            [
                'company' => 'Capital Numbers Infotech',
                'role' => 'Senior Software Engineer',
                'location' => 'Remote',
                'start_date' => 'Aug 2022',
                'end_date' => 'Dec 2022',
                'highlights' => [
                    'Engineered a configurable Assessment Engine with real-time validation in a 5-month sprint, improving onboarding speed.',
                    'Built live analytics dashboards for recruiters using Vue.js and WebSockets for instant pipeline visibility.',
                ],
                'sort_order' => 2,
            ],
            [
                'company' => 'Logiware Inc.',
                'role' => 'Vue.js Developer (Migration Specialist)',
                'location' => 'Remote',
                'start_date' => 'Mar 2022',
                'end_date' => 'Aug 2022',
                'highlights' => [
                    'Executed migration of monolithic warehouse systems to Vue.js & Laravel 9, resulting in 16% operational efficiency gain.',
                    'Architected granular Role-Based Access Control (RBAC) systems, ensuring 100% compliance with logistics security standards.',
                ],
                'sort_order' => 3,
            ],
            [
                'company' => 'Tata Consultancy Services (TCS)',
                'role' => 'System Engineer',
                'location' => 'India',
                'start_date' => 'Jul 2017',
                'end_date' => 'Mar 2022',
                'highlights' => [
                    'Automated engine configuration tracking, eliminating 70% of manual data entry and ensuring 100% audit accuracy.',
                    'Developed predictive maintenance modules for Aviation Engine Diagnostics, reducing repair costs by 11%.',
                    'Built complex interactive dashboards using Vue.js and Tableau for mission-critical engine health monitoring.',
                ],
                'sort_order' => 4,
            ],
        ];

        foreach ($experiences as $exp) {
            $profile->experiences()->updateOrCreate(
                ['company' => $exp['company'], 'role' => $exp['role']],
                $exp
            );
        }
    }

    private function seedProjects(Profile $profile): void
    {
        $projects = [
            [
                'title' => 'ZoetiCoach AI',
                'slug' => 'zoeticoach-ai',
                'category' => 'AI SaaS',
                'positioning' => 'WhatsApp-First B2B2C Coaching ERP',
                'metric_badge' => 'OpenAI RAG Pipeline · Zero Client Drop-off',
                'description' => 'A WhatsApp-first B2B2C accountability SaaS designed for professional coaches to eliminate client drop-off. Architected a scalable Laravel Modular Monolith featuring an event-sourced ledger for high concurrency. Engineered a production RAG pipeline using OpenAI to automate personalized, hallucination-free habit verification directly on WhatsApp.',
                'solution' => 'Production OpenAI RAG pipeline + pgvector verifying habit proof via WhatsApp.',
                'impact' => '65% dropout reduction across pilot cohorts with 100% automated check-ins.',
                'case_study_slug' => 'zoeticoach-ai-whatsapp-accountability-engine',
                'is_mobile' => false,
                'problem' => 'Professional fitness and mindset coaches lose 40%+ of clients due to accountability drop-off outside of weekly calls.',
                'challenge' => 'Automating personalized, hallucination-free habit verification directly inside WhatsApp without requiring clients to install another app.',
                'architecture_actions' => [
                    'Engineered a production OpenAI RAG pipeline with pgvector to verify habit proof (photos, text) directly via WhatsApp.',
                    'Architected a scalable Laravel Modular Monolith with an event-sourced ledger for real-time coach cohort management.',
                    'Built automated client intake, milestone tracking, and retention analytics dashboards.',
                ],
                'business_impact' => [
                    'Reduced client dropout rate by 65% across pilot coaching cohorts.',
                    'Automated 100% of routine daily check-ins without coach intervention.',
                    'Eliminated manual spreadsheet tracking for multi-coach wellness enterprises.',
                ],
                'tools' => ['Laravel 13', 'Vue 3', 'pgvector', 'OpenAI RAG', 'WhatsApp Cloud API', 'Modular Monolith'],
                'image_url' => '/images/portfolio/zoeticoach.jpg',
                'video_url' => null,
                'external_url' => 'https://zoeticoach.com/',
                'sort_order' => 0,
            ],
            [
                'title' => 'Habuilt',
                'slug' => 'habuilt',
                'category' => 'SaaS & FinTech',
                'positioning' => 'High-Scale Habit & Wellness SaaS',
                'metric_badge' => '50 Habits · 4 Tiers · 99.99% Uptime',
                'description' => 'Progressive atomic habit tracking platform with 50 habits, 4 progression tiers, streak mechanics, and mobile deep link auth.',
                'solution' => '4-tier unlock timeline over 26 weeks with sub-50ms XP calculation and carry-forward balances.',
                'impact' => '1% daily-compounding discipline engine used by thousands of active habit builders.',
                'case_study_slug' => null,
                'is_mobile' => false,
                'problem' => 'Building lasting daily habits requires continuous positive reinforcement without complex friction or mobile disconnect.',
                'challenge' => 'Supporting high-frequency daily habit check-ins and streaks across 26-week progression tiers with instant mobile app handoff.',
                'architecture_actions' => [
                    'Engineered a 4-tier progressive unlock timeline (Foundation, Build, Refine, Mastery) across 26 weeks.',
                    'Implemented sub-50ms streak & XP leveling computations with carry-forward point balances.',
                    'Integrated universal mobile deep linking (habuilt://auth/callback) for instant mobile session handover.',
                ],
                'business_impact' => [
                    '1% daily compounding discipline engine adopted by thousands of active habit builders.',
                    'Zero-latency habit completion sync and interactive weekly completion heatmaps.',
                    '99.99% uptime with high-concurrency atomic data persistence.',
                ],
                'tools' => ['Next.js / Vue 3', 'TypeScript', 'Tailwind CSS', 'Redis Caching', 'Mobile Deep Linking'],
                'image_url' => '/images/portfolio/habuilt.jpg',
                'video_url' => null,
                'external_url' => 'https://www.habuilt.com/',
                'sort_order' => 1,
            ],
            [
                'title' => 'Dhanda Diary',
                'slug' => 'dhanda-diary',
                'category' => 'SaaS & FinTech',
                'positioning' => 'Execution Cockpit & Business Ledger SaaS',
                'metric_badge' => 'Daily Compliance Engine · Sub-50ms Sync',
                'description' => 'Execution cockpit & daily compliance SaaS with automated DCR routines, Kanban task boards, ApexCharts KPI trackers, and discipline streak multipliers.',
                'solution' => 'DCR + Weekly Review pipelines with automated streaks and real-time ApexCharts telemetry.',
                'impact' => '100% daily execution accountability and 85% increase in daily routine completion via Web Push.',
                'case_study_slug' => 'dhanda-diary-business-execution-operating-system',
                'is_mobile' => false,
                'problem' => 'Founders and enterprise teams lack a centralized execution cockpit to monitor daily compliance, habit discipline, and business KPIs in one place.',
                'challenge' => 'Needed sub-50ms reactive state sync, real-time Kanban task reordering, Web Push reminders, and multi-tenant ledger isolation.',
                'architecture_actions' => [
                    'Architected Daily Compliance Report (DCR) and Weekly Strategic Review pipelines with automated streak calculations.',
                    'Integrated interactive ApexCharts visual metric telemetry for revenue trends and operational KPIs.',
                    'Built drag-and-drop Kanban workflow boards with optimistic UI updates and background sync.',
                ],
                'business_impact' => [
                    '100% daily task execution accountability for business executives and remote teams.',
                    'Automated morning and evening Web Push reminders increasing daily routine completion by 85%.',
                    'Seamless Google OAuth authentication and instant zero-latency multi-device sync.',
                ],
                'tools' => ['Laravel 13', 'Vue 3', 'Inertia.js', 'ApexCharts', 'VAPID Web Push', 'Google OAuth'],
                'image_url' => '/images/portfolio/dhandadiary.jpg',
                'video_url' => null,
                'external_url' => 'https://dhandadiary.cloud/',
                'sort_order' => 2,
            ],
            [
                'title' => 'GutTalks',
                'slug' => 'guttalks',
                'category' => 'Health & Telehealth',
                'positioning' => 'Gut Health & Telehealth Consultation Portal',
                'metric_badge' => '10k+ Clients · 4.8★ · ₹499 Root Rx',
                'description' => 'Evidence-based gut-health telehealth connecting patients to doctors via Root Rx consults and GutMap testing.',
                'solution' => 'Instant ₹499 Root Rx booking widget with live availability slots and at-home test kit tracking.',
                'impact' => '10,000+ happy clients treated with 4.8-star verified Google rating and 3.2x conversion lift.',
                'case_study_slug' => null,
                'is_mobile' => false,
                'problem' => 'Patients with chronic bloating, IBS, and digestive fatigue face fragmented advice and high consultation barriers.',
                'challenge' => 'Needed a high-converting doctor booking engine with instant slot availability, GutMap kit ordering, and seamless telehealth consultations.',
                'architecture_actions' => [
                    'Built an instant Root Rx booking widget (₹499) with real-time doctor availability slot selection.',
                    'Engineered GutMap Complete™ at-home testing kit portal with laboratory sequencing sample tracking.',
                    'Integrated Razorpay payment gateway and automated WhatsApp consultation reminders.',
                ],
                'business_impact' => [
                    'Over 10,000+ happy clients treated with 4.8-star verified Google rating.',
                    '3.2x increase in consultation conversion rate compared to standard static medical forms.',
                    'Full doctor-approved lifestyle roadmap delivered within 30 days of initial consultation.',
                ],
                'tools' => ['Next.js', 'React', 'Tailwind CSS', 'Razorpay Checkout', 'Microbiome API', 'Doctor Telehealth'],
                'image_url' => '/images/portfolio/guttalks.jpg',
                'video_url' => null,
                'external_url' => 'https://guttalks.in/',
                'sort_order' => 3,
            ],
            [
                'title' => 'MyAstrova',
                'slug' => 'myastrova',
                'category' => 'Consumer & AstroTech',
                'positioning' => 'Vedic AstroTech & Spiritual E-Commerce',
                'metric_badge' => '<200ms Kundli Engine · Live Calls & Chat',
                'description' => 'Vedic astrology consultation platform offering instant call/chat with astrologers and energized gemstone mall.',
                'solution' => 'Mathematical Kundli and horoscope calculation engine rendering dynamic planetary charts in <200ms.',
                'impact' => 'Instant charts, 100% astronomical precision, and 99.9% booking and checkout reliability.',
                'case_study_slug' => 'myastrova-astrology-consultation-commerce-platform',
                'is_mobile' => false,
                'problem' => 'Traditional astrology portals suffer from slow chart rendering, confusing interfaces, and unverified remedy purchases.',
                'challenge' => 'Calculating planetary positions with ephemeris accuracy in sub-200ms while routing live chat/call consultation requests to available astrologers.',
                'architecture_actions' => [
                    'Engineered a mathematical Kundli Matching and Horoscope calculation engine rendering dynamic charts in <200ms.',
                    'Built real-time astrologer routing for instant chats, phone calls, and video consultations.',
                    'Created MyAstrova Mall e-commerce catalog for energized crystals, rudraksha, and customized remedies with Razorpay checkout.',
                ],
                'business_impact' => [
                    'Instantaneous chart generation with 100% mathematical precision.',
                    '99.9% booking and checkout reliability across high consumer traffic.',
                    'Built a trusted spiritual brand with direct WhatsApp concierge support.',
                ],
                'tools' => ['Next.js', 'React', 'Tailwind CSS', 'Razorpay Checkout', 'WhatsApp API', 'Vedic Math Engine'],
                'image_url' => '/images/portfolio/myastrova.jpg',
                'video_url' => null,
                'external_url' => 'https://myastrova.com/',
                'sort_order' => 4,
            ],
            [
                'title' => 'Krishan Balram Gaushala',
                'slug' => 'krishan-balram-gaushala',
                'category' => 'Trust & NGO',
                'positioning' => 'Devotee Engagement & Cow Shelter Philanthropy',
                'metric_badge' => 'Meta WhatsApp API · Automated 80G Receipts',
                'description' => 'GauSeva Connect — Devotee registration portal, automated birthday/anniversary WhatsApp blessings dispatcher, and 80G tax receipt management.',
                'solution' => 'WhatsApp Cloud API webhooks auto-dispatch daily blessings with client-side canvas image compression.',
                'impact' => '100% automated birthday/anniversary blessings to thousands and instant automated 80G PDF receipts.',
                'case_study_slug' => 'krishan-balram-gaushala-devotee-engagement-platform',
                'is_mobile' => false,
                'problem' => 'The shelter handled thousands of devotee records and seva donations manually, causing delayed tax receipts and missed community touchpoints.',
                'challenge' => 'Automating daily WhatsApp blessings, Facebook auto-posting, and instant 80G PDF receipts on a high-concurrency, lightweight server.',
                'architecture_actions' => [
                    'Integrated Meta WhatsApp Cloud API webhooks to automatically dispatch personalized birthday and anniversary blessings daily.',
                    'Architected an automated 80G tax exemption PDF generator and donor contribution ledger.',
                    'Optimized mobile performance via client-side canvas compression and SQLite Write-Ahead Logging.',
                ],
                'business_impact' => [
                    '100% automated birthday and anniversary blessing dispatch via official WhatsApp API.',
                    'Instant 80G tax receipt PDF generation and donor ledger tracking.',
                    'Zero-latency mobile uploads via client-side image compression.',
                ],
                'tools' => ['Laravel 13', 'Vue 3', 'Inertia.js', 'Meta WhatsApp Cloud API', 'PWA Offline', 'SQLite WAL'],
                'image_url' => '/images/portfolio/gaushala.jpg',
                'video_url' => null,
                'external_url' => 'https://krishanbalramgaushala.com/',
                'sort_order' => 5,
            ],
            [
                'title' => 'SportsEntertainmentClub',
                'slug' => 'sports-entertainment-club',
                'category' => 'Mobile Apps',
                'positioning' => 'Facility & Court Booking App',
                'metric_badge' => '0 Booking Collisions · 60 FPS Fluid UI',
                'description' => 'Sports facility reservations, court slot locking, digital QR passes, and live member leaderboards.',
                'solution' => 'Cross-platform 60 FPS mobile app with sub-second real-time court availability and optimistic slot locking.',
                'impact' => 'Zero court booking collisions across 12 facilities and 3x faster reception check-in via QR passes.',
                'case_study_slug' => null,
                'is_mobile' => true,
                'problem' => 'Club members faced constant double-bookings, manual telephone reservations, and long queues at the sports complex reception.',
                'challenge' => 'Preventing race-condition booking collisions across badminton, tennis, and squash courts during peak evening hours.',
                'architecture_actions' => [
                    'Built real-time slot reservation system with optimistic locking and 5-minute checkout countdowns.',
                    'Implemented instant QR pass generation for automated turnstile and reception check-in.',
                    'Integrated push notification alerts for court availability, tournament updates, and coaching schedules.',
                ],
                'business_impact' => [
                    'Zero double-booking collisions since launch across all 12 courts.',
                    '92% of members transitioned to mobile booking within the first 30 days.',
                    '3x faster check-in speed at club reception with digital QR passes.',
                ],
                'tools' => ['Flutter / React Native', 'Real-Time Slot Locks', 'Push Notifications', 'QR Access Control'],
                'image_url' => '/images/portfolio/sportsclub.jpg',
                'video_url' => null,
                'external_url' => null,
                'sort_order' => 6,
            ],
            [
                'title' => 'Garg Enterprises',
                'slug' => 'garg-enterprises',
                'category' => 'Mobile Apps',
                'positioning' => 'B2B Wholesale Ordering & Ledger App',
                'metric_badge' => '0% Order Errors · 10k+ SKUs · Offline Sync',
                'description' => 'B2B wholesale ordering app with offline drafting, dealer credit ledger reconciliation, 1-tap GST invoice downloads, and 10k+ SKU catalog.',
                'solution' => 'Rugged Android enterprise app with offline SQLite order drafting and automatic background sync.',
                'impact' => 'Order entry errors reduced from 14% to 0% and accelerated dealer reorder cycle 3x.',
                'case_study_slug' => null,
                'is_mobile' => true,
                'problem' => 'Wholesale dealers placed orders over handwritten notes and phone calls, causing order errors, inventory mismatches, and ledger disputes.',
                'challenge' => 'Ensuring fast order placement in low-connectivity warehouse environments with dealer-specific tiered pricing and credit limits.',
                'architecture_actions' => [
                    'Engineered rugged Android enterprise app with offline SQLite order drafting and automatic background sync.',
                    'Built real-time dealer ledger displaying live balance, credit limit, and 1-tap GST invoice downloads.',
                    'Implemented tiered volume discount matrix and automated warehouse dispatch alerts.',
                ],
                'business_impact' => [
                    'Reduced manual order entry errors from 14% to 0%.',
                    '3x faster dealer reorder cycle with single-tap repeat order functionality.',
                    '100% transparency on outstanding dealer ledger balances and credit terms.',
                ],
                'tools' => ['Android Native / Kotlin', 'Offline SQLite Sync', 'GST Invoice PDF', 'Tiered B2B Pricing'],
                'image_url' => '/images/portfolio/gargenterprises.jpg',
                'video_url' => null,
                'external_url' => null,
                'sort_order' => 7,
            ],
            [
                'title' => 'Ashish Gupta Hub',
                'slug' => 'ashishgupta-hub',
                'category' => 'Engineering',
                'positioning' => 'Engineering Architecture Showcase',
                'metric_badge' => 'VILT Stack · 9+ Yrs IT · $1M Cloud Savings',
                'description' => 'Engineering hub showcasing legacy modernization, live telemetry, and high-performance VILT architecture.',
                'solution' => 'High-speed VILT platform on DDD with automated security headers, sub-50ms routing, and live telemetry.',
                'impact' => 'Documented $1M/yr cloud infrastructure savings across enterprise modernization projects.',
                'case_study_slug' => null,
                'is_mobile' => false,
                'problem' => 'Enterprise systems suffer from monolithic technical debt, sluggish client rendering, and inflated hosting bills.',
                'challenge' => 'Demonstrating end-to-end full-stack mastery with production observability, sub-second load times, and accessible interfaces.',
                'architecture_actions' => [
                    'Architected high-speed Laravel 13 + Inertia + Vue 3 application with domain-driven design principles.',
                    'Integrated client-side telemetry, custom canvas simulations, and zero-compromise security headers.',
                    'Configured hardened edge caching and asset optimization pipelines for instant global loading.',
                ],
                'business_impact' => [
                    '100/100 Core Web Vitals and lightning sub-100ms time to interactive.',
                    'Demonstrated architectural leadership across 9+ enterprise case studies and open-source contributions.',
                    'Built-in AI assistant for instant recruiter and client pre-qualification.',
                ],
                'tools' => ['Laravel 13', 'Vue 3', 'Inertia', 'Tailwind CSS', 'PWA Offline', 'Filament CMS'],
                'image_url' => '/images/portfolio/ashishgupta.jpg',
                'video_url' => null,
                'external_url' => 'https://ashishgupta.dev',
                'sort_order' => 8,
            ],
        ];

        $allowedSlugs = array_column($projects, 'slug');
        $profile->projects()->whereNotIn('slug', $allowedSlugs)->delete();

        foreach ($projects as $project) {
            $profile->projects()->updateOrCreate(
                ['slug' => $project['slug']],
                $project
            );
        }
    }

    private function seedSkills(Profile $profile): void
    {
        $skills = [
            // Core Stack
            ['name' => 'JavaScript', 'category' => 'Core Stack', 'sort_order' => 1],
            ['name' => 'TypeScript', 'category' => 'Core Stack', 'sort_order' => 2],
            ['name' => 'PHP', 'category' => 'Core Stack', 'sort_order' => 3],
            ['name' => 'Node.js', 'category' => 'Core Stack', 'sort_order' => 4],
            ['name' => 'Laravel', 'category' => 'Core Stack', 'sort_order' => 5],
            ['name' => 'PostgreSQL', 'category' => 'Core Stack', 'sort_order' => 6],
            ['name' => 'MySQL', 'category' => 'Core Stack', 'sort_order' => 7],
            // Frontend
            ['name' => 'HTML5', 'category' => 'Frontend', 'sort_order' => 8],
            ['name' => 'CSS3', 'category' => 'Frontend', 'sort_order' => 9],
            ['name' => 'Vue 3', 'category' => 'Frontend', 'sort_order' => 10],
            ['name' => 'Nuxt.js', 'category' => 'Frontend', 'sort_order' => 11],
            ['name' => 'Tailwind CSS', 'category' => 'Frontend', 'sort_order' => 12],
            ['name' => 'Inertia.js', 'category' => 'Frontend', 'sort_order' => 13],
            ['name' => 'Vite', 'category' => 'Frontend', 'sort_order' => 14],
            // Architecture
            ['name' => 'Domain-Driven Design', 'category' => 'Architecture', 'sort_order' => 15],
            ['name' => 'Event-Driven Architecture', 'category' => 'Architecture', 'sort_order' => 16],
            ['name' => 'SOLID', 'category' => 'Architecture', 'sort_order' => 17],
            ['name' => 'Microservices', 'category' => 'Architecture', 'sort_order' => 18],
            ['name' => 'RESTful API Design', 'category' => 'Architecture', 'sort_order' => 19],
            // Tooling & Quality
            ['name' => 'npm', 'category' => 'Tooling & Quality', 'sort_order' => 20],
            ['name' => 'Docker', 'category' => 'Tooling & Quality', 'sort_order' => 21],
            ['name' => 'Apache', 'category' => 'Tooling & Quality', 'sort_order' => 22],
            ['name' => 'Nginx', 'category' => 'Tooling & Quality', 'sort_order' => 23],
            ['name' => 'Jenkins', 'category' => 'Tooling & Quality', 'sort_order' => 24],
            // AI & Cloud
            ['name' => 'Cursor', 'category' => 'AI & Cloud', 'sort_order' => 25],
            ['name' => 'Claude Code', 'category' => 'AI & Cloud', 'sort_order' => 26],
            ['name' => 'OpenClaw', 'category' => 'AI & Cloud', 'sort_order' => 27],
            ['name' => 'AWS', 'category' => 'AI & Cloud', 'sort_order' => 28],
        ];

        $allowedNames = array_column($skills, 'name');
        $profile->skills()->whereNotIn('name', $allowedNames)->delete();

        foreach ($skills as $skill) {
            $profile->skills()->updateOrCreate(
                ['name' => $skill['name']],
                $skill
            );
        }
    }

    private function seedSocialLinks(Profile $profile): void
    {
        $links = [
            ['platform' => 'github', 'url' => 'https://github.com/ashishgupta1v', 'label' => 'GitHub'],
            ['platform' => 'linkedin', 'url' => 'https://www.linkedin.com/in/ashishgupta1v/', 'label' => 'LinkedIn'],
            ['platform' => 'email', 'url' => 'mailto:ashishgupta1v@gmail.com', 'label' => 'Email'],
        ];

        foreach ($links as $link) {
            $profile->socialLinks()->updateOrCreate(
                ['platform' => $link['platform']],
                $link
            );
        }
    }

    private function seedEducation(Profile $profile): void
    {
        $educations = [
            [
                'institution' => 'Vellore Institute of Technology (VIT)',
                'degree' => 'Master of Computer Applications (MCA)',
                'location' => 'Vellore, India',
                'start_year' => '2015',
                'end_year' => '2017',
                'courses' => ['Distributed Systems Architecture', 'Advanced Database Management Systems', 'Software Engineering Principles'],
                'sort_order' => 1,
            ],
            [
                'institution' => 'Panjab University',
                'degree' => 'Bachelor of Computer Applications (BCA)',
                'location' => 'Chandigarh, India',
                'start_year' => '2012',
                'end_year' => '2015',
                'courses' => [],
                'sort_order' => 2,
            ],
        ];

        foreach ($educations as $edu) {
            $profile->educations()->updateOrCreate(
                ['institution' => $edu['institution']],
                $edu
            );
        }
    }

    private function seedServices(Profile $profile): void
    {
        $services = [
            [
                'title' => 'Architecture & DDD',
                'description' => 'Designing scalable, domain-driven systems that transform legacy monoliths into modular, maintainable architectures. Specializing in Laravel ecosystem with SOLID principles.',
                'icon' => 'layers',
                'sort_order' => 1,
            ],
            [
                'title' => 'Full-Stack Development',
                'description' => 'End-to-end application development using the VILT stack (Vue 3, Inertia.js, Laravel 13, Tailwind CSS). From database design to reactive UI components.',
                'icon' => 'code',
                'sort_order' => 2,
            ],
            [
                'title' => 'AI-Native Workflows',
                'description' => 'Integrating AI tools and LLMs into development workflows. Expert in Cursor, Claude, and GitHub Copilot for accelerated delivery cycles and RAG implementations.',
                'icon' => 'brain',
                'sort_order' => 3,
            ],
        ];

        foreach ($services as $service) {
            $profile->services()->updateOrCreate(
                ['title' => $service['title']],
                $service
            );
        }
    }
}
