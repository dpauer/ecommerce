<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Datatables\Dashboard\CategoryController;
use App\Http\Controllers\Datatables\Dashboard\Category\AttributeController;
use App\Http\Controllers\Datatables\Dashboard\Category\Attribute\AttributeValueController;

Route::post("datatables/dashboard/categories", [
    CategoryController::class,
    "index",
])->name("datatables.dashboard.categories.index");

Route::post("datatables/dashboard/categories/{category}/attributes", [
    AttributeController::class,
    "index",
])->name("datatables.dashboard.categories.attributes.index");

Route::post(
    "datatables/dashboard/categories/{category}/attributes/{attribute}/attribute-values",
    [AttributeValueController::class, "index"]
)->name("datatables.dashboard.categories.attributes.attribute-values.index");
