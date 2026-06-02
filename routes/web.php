<?php

use App\Http\Controllers\CaseStudies\CaseStudyIndexController;
use App\Http\Controllers\CaseStudies\CaseStudyShowController;
use App\Http\Controllers\Engagements\EngagementsPageController;
use App\Http\Controllers\Portfolio\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::get('/', PortfolioController::class)->name('portfolio');
Route::get('/case-studies', CaseStudyIndexController::class)->name('case-studies.index');
Route::get('/case-studies/{slug}', CaseStudyShowController::class)->name('case-studies.show');
Route::get('/engagements', EngagementsPageController::class)->name('engagements.index');
Route::get('/sitemap.xml', \App\Http\Controllers\SitemapController::class)->name('sitemap');
Route::post('/contact', \App\Http\Controllers\ContactController::class)->name('contact.submit');

