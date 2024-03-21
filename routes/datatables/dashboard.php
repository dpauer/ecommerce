<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Datatables\Dashboard\ProductController;
use App\Http\Controllers\Datatables\Dashboard\CategoryController;
use App\Http\Controllers\Datatables\Dashboard\Category\AttributeController;
use App\Http\Controllers\Datatables\Dashboard\Category\Attribute\AttributeValueController;
use App\Http\Controllers\Datatables\Dashboard\Product\CategoryController as ProductCategoryController;
use App\Http\Controllers\Datatables\Dashboard\Product\Category\Attribute\AttributeValueController as ProductCategoryAttributeAttributeValueController;

Route::middleware(["auth", "verified"])->group(function () {
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
    )->name(
        "datatables.dashboard.categories.attributes.attribute-values.index"
    );

    Route::post("datatables/dashboard/products", [
        ProductController::class,
        "index",
    ])->name("datatables.dashboard.products.index");
    Route::post("datatables/dashboard/products/{product}/categories", [
        ProductCategoryController::class,
        "index",
    ])->name("datatables.dashboard.products.categories.index");

    Route::post(
        "datatables/dashboard/products/{product}/categories/{category}/attributes/{attribute}/attribute-values",
        [ProductCategoryAttributeAttributeValueController::class, "index"]
    )->name(
        "datatables.dashboard.products.categories.attributes.attribute-values.index"
    );
});
