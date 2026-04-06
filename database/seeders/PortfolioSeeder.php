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
        $profile = Profile::create([
            'name' => 'Ashish Gupta',
            'title' => 'Senior Full-Stack Architect',
            'subtitle' => 'VILT Stack Specialist',
            'bio' => 'High-performance Engineering Architect with 8+ years of experience specializing in the VILT Stack (Vue 3, Inertia, Laravel 12, Tailwind). Unique value proposition lies in modernizing legacy Healthcare and Aviation monoliths into scalable, domain-driven systems. Proven track record of reducing cloud infrastructure costs by $1M/year through architectural optimization.',
            'email' => 'ashishgupta1v@gmail.com',
            'phone' => '+91-9087021592',
            'location' => 'Chandigarh, India',
            'avatar_url' => null,
            'resume_url' => null,
        ]);

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
                'location' => 'Chandigarh, India',
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
                'location' => 'Chandigarh, India',
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
            $profile->experiences()->create($exp);
        }
    }

    private function seedProjects(Profile $profile): void
    {
        $projects = [
            [
                'title' => 'Habuilt Tracker',
                'slug' => 'habuilt-tracker',
                'category' => 'Productivity',
                'description' => "A personal discipline-tracking app built to turn habits into a measurable, gamified system. Features a daily task/point engine, carry-forward balance ledger, monthly performance chart, vacation milestone progress, and a habit checklist — all designed around the philosophy 'Discipline Equals Freedom'.",
                'tools' => ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Vercel'],
                'image_url' => null,
                'video_url' => null,
                'external_url' => 'https://habuilt-ashishgupta1vs-projects.vercel.app/',
                'sort_order' => 0,
            ],
            [
                'title' => 'CoachSync AI',
                'slug' => 'coachsync-ai',
                'category' => 'AI SaaS',
                'description' => 'A WhatsApp-first B2B2C accountability SaaS designed for professional coaches to eliminate client drop-off. Architected a scalable Laravel Modular Monolith featuring an event-sourced ledger for high concurrency. Engineered a production RAG pipeline using OpenAI to automate personalized, hallucination-free habit verification directly on WhatsApp.',
                'tools' => ['Laravel 12', 'Vue 3', 'WhatsApp API', 'pgvector', 'AI Agents'],
                'image_url' => null,
                'video_url' => null,
                'external_url' => null,
                'sort_order' => 1,
            ],
            [
                'title' => 'Healthcare CTMS',
                'slug' => 'healthcare-ctms',
                'category' => 'Healthcare',
                'description' => 'Clinical Trial Management System modernization using DDD patterns. Transformed legacy healthcare monoliths into scalable modular monoliths, achieving $1M annual savings and HIPAA compliance through OAuth2/OpenID Connect implementation.',
                'tools' => ['Laravel', 'Vue 3', 'Redis Horizon', 'PostgreSQL', 'Laravel Passport'],
                'image_url' => null,
                'video_url' => null,
                'external_url' => null,
                'sort_order' => 2,
            ],
            [
                'title' => 'Aviation Diagnostics',
                'slug' => 'aviation-diagnostics',
                'category' => 'Aviation',
                'description' => 'Predictive maintenance modules for Aviation Engine Diagnostics at TCS. Built complex interactive dashboards using Vue.js and Tableau for mission-critical engine health monitoring, reducing repair costs by 11%.',
                'tools' => ['Vue.js', 'Tableau', 'Python', 'Laravel', 'MySQL'],
                'image_url' => null,
                'video_url' => null,
                'external_url' => null,
                'sort_order' => 3,
            ],
            [
                'title' => 'Digital Marketplace',
                'slug' => 'digital-marketplace',
                'category' => 'E-Commerce',
                'description' => 'Scalable digital marketplace built with the VILT stack, featuring real-time inventory management, payment processing, and seller analytics dashboards.',
                'tools' => ['Vue 3', 'Inertia.js', 'Laravel', 'Tailwind CSS', 'Stripe'],
                'image_url' => null,
                'video_url' => null,
                'external_url' => null,
                'sort_order' => 4,
            ],
        ];

        foreach ($projects as $project) {
            $profile->projects()->create($project);
        }
    }

    private function seedSkills(Profile $profile): void
    {
        $skills = [
            // Core Stack
            ['name' => 'PHP 8.4+', 'category' => 'Core Stack', 'sort_order' => 1],
            ['name' => 'Laravel 12', 'category' => 'Core Stack', 'sort_order' => 2],
            ['name' => 'MySQL', 'category' => 'Core Stack', 'sort_order' => 3],
            ['name' => 'PostgreSQL', 'category' => 'Core Stack', 'sort_order' => 4],
            ['name' => 'Redis', 'category' => 'Core Stack', 'sort_order' => 5],
            // Frontend
            ['name' => 'Vue 3', 'category' => 'Frontend', 'sort_order' => 6],
            ['name' => 'Inertia.js', 'category' => 'Frontend', 'sort_order' => 7],
            ['name' => 'Livewire', 'category' => 'Frontend', 'sort_order' => 8],
            ['name' => 'Alpine.js', 'category' => 'Frontend', 'sort_order' => 9],
            ['name' => 'Tailwind CSS', 'category' => 'Frontend', 'sort_order' => 10],
            ['name' => 'TypeScript', 'category' => 'Frontend', 'sort_order' => 11],
            // Architecture
            ['name' => 'DDD', 'category' => 'Architecture', 'sort_order' => 12],
            ['name' => 'Event-Driven Architecture', 'category' => 'Architecture', 'sort_order' => 13],
            ['name' => 'SOLID', 'category' => 'Architecture', 'sort_order' => 14],
            ['name' => 'Microservices', 'category' => 'Architecture', 'sort_order' => 15],
            ['name' => 'RESTful API Design', 'category' => 'Architecture', 'sort_order' => 16],
            // Tooling & Quality
            ['name' => 'Pest PHP', 'category' => 'Tooling & Quality', 'sort_order' => 17],
            ['name' => 'PHPStan', 'category' => 'Tooling & Quality', 'sort_order' => 18],
            ['name' => 'Docker', 'category' => 'Tooling & Quality', 'sort_order' => 19],
            ['name' => 'Git', 'category' => 'Tooling & Quality', 'sort_order' => 20],
            ['name' => 'Laravel Pulse/Telescope', 'category' => 'Tooling & Quality', 'sort_order' => 21],
            // AI & Cloud
            ['name' => 'Cursor', 'category' => 'AI & Cloud', 'sort_order' => 22],
            ['name' => 'Claude 3.5 Sonnet', 'category' => 'AI & Cloud', 'sort_order' => 23],
            ['name' => 'AWS (EC2, S3, Vapor)', 'category' => 'AI & Cloud', 'sort_order' => 24],
            ['name' => 'GitHub Actions', 'category' => 'AI & Cloud', 'sort_order' => 25],
        ];

        foreach ($skills as $skill) {
            $profile->skills()->create($skill);
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
            $profile->socialLinks()->create($link);
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
            $profile->educations()->create($edu);
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
                'description' => 'End-to-end application development using the VILT stack (Vue 3, Inertia.js, Laravel 12, Tailwind CSS). From database design to reactive UI components.',
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
            $profile->services()->create($service);
        }
    }
}
