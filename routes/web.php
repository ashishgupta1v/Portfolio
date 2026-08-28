<?php

use App\Http\Controllers\Blog\BlogIndexController;
use App\Http\Controllers\Blog\BlogShowController;
use App\Http\Controllers\CaseStudies\CaseStudyIndexController;
use App\Http\Controllers\CaseStudies\CaseStudyShowController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Admin\LeadManagementController;
use App\Http\Controllers\Hiring\HiringPageController;
use App\Http\Controllers\Portfolio\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::view('/offline', 'offline')->name('offline');
Route::get('/', PortfolioController::class)->name('portfolio');
Route::get('/projects/{slug}', \App\Http\Controllers\Portfolio\ProjectShowController::class)->name('projects.show');
Route::get('/case-studies', CaseStudyIndexController::class)->name('case-studies.index');
Route::get('/case-studies/{slug}', CaseStudyShowController::class)->name('case-studies.show');
Route::get('/blog', BlogIndexController::class)->name('blog.index');
Route::get('/blog/{slug}', BlogShowController::class)->name('blog.show');
Route::get('/hiring', HiringPageController::class)->name('hiring.index');
Route::redirect('/engagements', '/hiring', 301);
Route::get('/privacy', fn () => \Inertia\Inertia::render('Legal/Privacy'))->name('privacy');
Route::get('/terms', fn () => \Inertia\Inertia::render('Legal/Terms'))->name('terms');
Route::get('/sitemap.xml', \App\Http\Controllers\SitemapController::class)->name('sitemap');
Route::post('/contact', ContactController::class)
	->middleware('throttle:contact-submissions')
	->name('contact.submit');

Route::get('/api/github-stats', [App\Http\Controllers\Portfolio\GitHubController::class, 'stats'])
	->name('github.stats');

Route::get('/api/visitor-count', App\Http\Controllers\Portfolio\VisitorCountController::class)
	->middleware('throttle:30,1')
	->name('visitor.count');

Route::post('/newsletter/subscribe', [App\Http\Controllers\NewsletterController::class, 'subscribe'])
	->middleware('throttle:5,1')
	->name('newsletter.subscribe');

// 60/min was far more than a human conversation needs on a token-billed,
// unauthenticated endpoint. 15/min still feels instant while capping abuse.
Route::post('/chat', \App\Http\Controllers\Portfolio\ChatController::class)
	->middleware('throttle:15,1')
	->name('portfolio.chat');

Route::prefix('admin')
	->middleware(['admin.access'])
	->group(function (): void {
		Route::get('/leads', [LeadManagementController::class, 'index'])->name('admin.leads.index');
		Route::patch('/leads/{lead}/status', [LeadManagementController::class, 'updateStatus'])->name('admin.leads.status.update');
		Route::get('/telemetry', fn() => \Inertia\Inertia::render('Admin/Telemetry'))->name('admin.telemetry');
	});

