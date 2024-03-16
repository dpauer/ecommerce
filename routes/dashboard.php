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
    Route::get('dashboard/categories/create', [CategoryController::class, 'create'])
        ->name('dashboard.categories.create');
    Route::post('dashboard/categories', [CategoryController::class, 'store'])
        ->name('dashboard.categories.store');
    Route::get('dashboard/categories/{category}', [CategoryController::class, 'show'])
        ->name('dashboard.categories.show');
    Route::get('dashboard/categories/{category}/edit', [CategoryController::class, 'edit'])
        ->name('dashboard.categories.edit');
    Route::patch('dashboard/categories/{category}', [CategoryController::class, 'update'])
        ->name('dashboard.categories.update');
    Route::delete('dashboard/categories/{category}', [CategoryController::class, 'destroy'])
        ->name('dashboard.categories.destroy');

    Route::get('dashboard/categories/{category}/attributes/create', [AttributeController::class, 'create'])
        ->name('dashboard.categories.attributes.create');
    Route::post('dashboard/categories/{category}/attributes', [AttributeController::class, 'store'])
        ->name('dashboard.categories.attributes.store');
    Route::get('dashboard/categories/{category}/attributes/{attribute}', [AttributeController::class, 'show'])
        ->name('dashboard.categories.attributes.show');
    Route::get('dashboard/categories/{category}/attributes/{attribute}/edit', [AttributeController::class, 'edit'])
        ->name('dashboard.categories.attributes.edit');
    Route::patch('dashboard/categories/{category}/attributes/{attribute}', [AttributeController::class, 'update'])
        ->name('dashboard.categories.attributes.update');
    Route::delete('dashboard/categories/{category}/attributes/{attribute}', [AttributeController::class, 'destroy'])
        ->name('dashboard.categories.attributes.destroy');
});
