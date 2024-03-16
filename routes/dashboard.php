<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Dashboard\CategoryController;
use App\Http\Controllers\Dashboard\Category\AttributeController;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::get('dashboard/categories', [CategoryController::class, 'index'])
        ->name('dashboard.categories.index');
    Route::get('dashboard/categories/{category}', [CategoryController::class, 'show'])
        ->name('dashboard.categories.show');

    Route::get('dashboard/categories/{category}/attributes/{attribute}', [AttributeController::class, 'show'])
        ->name('dashboard.categories.attributes.show');
});
