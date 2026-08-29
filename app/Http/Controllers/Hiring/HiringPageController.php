<?php

declare(strict_types=1);

namespace App\Http\Controllers\Hiring;

use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

final class HiringPageController
{
    public function __invoke(): InertiaResponse
    {
        return Inertia::render('Hiring/Index', [
            'seo' => [
                'title' => 'For Hiring Managers & Recruiters — Ashish Gupta (Senior Full-Stack Architect)',
                'description' => '10+ years shipping production systems end-to-end — Vue, Laravel, DDD, and AI. Senior Full-Stack Architect open to full-time roles.',
                'path' => '/for-hiring-managers',
            ],
            'recruiterBrief' => [
                'targetRole' => 'Senior Full-Stack Architect / Staff Engineer / Engineering Lead',
                'experience' => '10+ Years Professional Software Architecture & Delivery',
                'availability' => 'Immediately Available / Flexible Start',
                'location' => 'India (IST / UTC+5:30) · Open to Remote Worldwide',
                'workAuth' => 'India (Citizen) · Remote / Visa Sponsorship & Relocation for eligible roles',
                'timezoneOverlap' => '4+ hours daily US overlap (EST/PST) & full overlap with UK/Europe/APAC',
                'domains' => ['Healthcare & Clinical Systems', 'Aviation / High-Concurrency', 'Enterprise SaaS', 'AI & RAG Systems'],
                'primaryStack' => ['Vue 3', 'Laravel 13', 'Inertia.js', 'Tailwind CSS', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
            ],
        ]);
    }
}
