<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;

Route::get('categories/{category}', [CategoryController::class, 'show'])
    ->name('categories.show');
