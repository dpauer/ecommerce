<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Datatables\Dashboard\ProductController;
use App\Http\Controllers\Datatables\Dashboard\CategoryController;
use App\Http\Controllers\Datatables\Dashboard\Category\AttributeController;
use App\Http\Controllers\Datatables\Dashboard\Category\Attribute\AttributeValueController;
use App\Http\Controllers\Datatables\Dashboard\Product\CategoryController as ProductCategoryController;
use App\Http\Controllers\Datatables\Dashboard\Product\Category\Attribute\AttributeValueController as ProductCategoryAttributeAttributeValueController;

Route::middleware(["auth", "verified"])
    ->prefix("datatables/dashboard")
    ->name("datatables.dashboard.")
    ->group(function () {
        Route::post("categories", [CategoryController::class, "index"])->name(
            "categories.index"
        );

        Route::post("categories/{category}/attributes", [
            AttributeController::class,
            "index",
        ])->name("categories.attributes.index");

        Route::post(
            "categories/{category}/attributes/{attribute}/attribute-values",
            [AttributeValueController::class, "index"]
        )->name("categories.attributes.attribute-values.index");

        Route::post("products", [ProductController::class, "index"])->name(
            "products.index"
        );
        Route::post("products/{product}/categories", [
            ProductCategoryController::class,
            "index",
        ])->name("products.categories.index");

        Route::post(
            "products/{product}/categories/{category}/attributes/{attribute}/attribute-values",
            [ProductCategoryAttributeAttributeValueController::class, "index"]
        )->name("products.categories.attributes.attribute-values.index");
    });
