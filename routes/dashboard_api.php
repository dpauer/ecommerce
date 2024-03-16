<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Dashboard\Api\AttributeTypeController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard/api/attribute-types', [AttributeTypeController::class, 'index'])
        ->name('dashboard.api.attribute-types.index');
});
