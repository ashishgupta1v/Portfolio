<?php

use App\Http\Controllers\Portfolio\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::get('/', PortfolioController::class)->name('portfolio');

