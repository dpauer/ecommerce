<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Datatables\CategoryController;
use App\Http\Controllers\Datatables\Category\ProductController;

Route::post("datatables/categories", [
    CategoryController::class,
    "index",
])->name("datatables.categories.index");

Route::post("datatables/categories/{category}/products", [
    ProductController::class,
    "index",
])->name("datatables.categories.products.index");
