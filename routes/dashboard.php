<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Dashboard\ProductController;
use App\Http\Controllers\Dashboard\CategoryController;
use App\Http\Controllers\Dashboard\Category\AttributeController;
use App\Http\Controllers\Dashboard\Category\Attribute\AttributeValueController;
use App\Http\Controllers\Dashboard\Product\CategoryController as ProductCategoryController;

Route::get("dashboard", [DashboardController::class, "index"])->name(
    "dashboard"
);
Route::prefix("dashboard")
    ->name("dashboard.")
    ->group(function () {
        Route::get("categories", [CategoryController::class, "index"])->name(
            "categories.index"
        );
        Route::get("categories/create", [
            CategoryController::class,
            "create",
        ])->name("categories.create");
        Route::post("categories", [CategoryController::class, "store"])->name(
            "categories.store"
        );
        Route::get("categories/{category}", [
            CategoryController::class,
            "show",
        ])->name("categories.show");
        Route::get("categories/{category}/edit", [
            CategoryController::class,
            "edit",
        ])->name("categories.edit");
        Route::patch("categories/{category}", [
            CategoryController::class,
            "update",
        ])->name("categories.update");
        Route::delete("categories/{category}", [
            CategoryController::class,
            "destroy",
        ])->name("categories.destroy");

        Route::get("categories/{category}/attributes/create", [
            AttributeController::class,
            "create",
        ])->name("categories.attributes.create");
        Route::post("categories/{category}/attributes", [
            AttributeController::class,
            "store",
        ])->name("categories.attributes.store");
        Route::get("categories/{category}/attributes/{attribute}", [
            AttributeController::class,
            "show",
        ])->name("categories.attributes.show");
        Route::get("categories/{category}/attributes/{attribute}/edit", [
            AttributeController::class,
            "edit",
        ])->name("categories.attributes.edit");
        Route::patch("categories/{category}/attributes/{attribute}", [
            AttributeController::class,
            "update",
        ])->name("categories.attributes.update");
        Route::delete("categories/{category}/attributes/{attribute}", [
            AttributeController::class,
            "destroy",
        ])->name("categories.attributes.destroy");

        Route::get(
            "categories/{category}/attributes/{attribute}/attribute-values/create",
            [AttributeValueController::class, "create"]
        )->name("categories.attributes.attribute-values.create");
        Route::post(
            "categories/{category}/attributes/{attribute}/attribute-values",
            [AttributeValueController::class, "store"]
        )->name("categories.attributes.attribute-values.store");
        Route::get(
            "categories/{category}/attributes/{attribute}/attribute-values/{attributeValue}",
            [AttributeValueController::class, "show"]
        )->name("categories.attributes.attribute-values.show");
        Route::get(
            "categories/{category}/attributes/{attribute}/attribute-values/{attributeValue}/edit",
            [AttributeValueController::class, "edit"]
        )->name("categories.attributes.attribute-values.edit");
        Route::patch(
            "categories/{category}/attributes/{attribute}/attribute-values/{attributeValue}",
            [AttributeValueController::class, "update"]
        )->name("categories.attributes.attribute-values.update");
        Route::delete(
            "categories/{category}/attributes/{attribute}/attribute-values/{attributeValue}",
            [AttributeValueController::class, "destroy"]
        )->name("categories.attributes.attribute-values.destroy");

        /**
         * -------------------------------------------------------------------------
         * Dashboard / Products
         * ---
         */
        Route::get("products", [ProductController::class, "index"])->name(
            "products.index"
        );
        Route::get("products/create", [
            ProductController::class,
            "create",
        ])->name("products.create");
        Route::post("products", [ProductController::class, "store"])->name(
            "products.store"
        );
        Route::get("products/{product}", [
            ProductController::class,
            "show",
        ])->name("products.show");
        Route::get("products/{product}/edit", [
            ProductController::class,
            "edit",
        ])->name("products.edit");
        Route::patch("products/{product}", [
            ProductController::class,
            "update",
        ])->name("products.update");
        Route::delete("products/{product}", [
            ProductController::class,
            "destroy",
        ])->name("products.destroy");

        Route::get("products/{product}/categories/attach", [
            ProductCategoryController::class,
            "showAttach",
        ])->name("products.categories.show-attach");
        Route::post("products/{product}/categories/attach", [
            ProductCategoryController::class,
            "attach",
        ])->name("products.categories.attach");

        Route::get("products/{product}/categories/{category}", [
            ProductCategoryController::class,
            "show",
        ])->name("products.categories.show");

        Route::patch(
            "products/{product}/categories/{category}/attributes/{attribute}/attribute-values/{attributeValue}/attach",
            [ProductCategoryController::class, "attachAttributeValue"]
        )->name("products.categories.attributes.attribute-values.attach");
        Route::patch(
            "products/{product}/categories/{category}/attributes/{attribute}/attribute-values/{attributeValue}/detach",
            [ProductCategoryController::class, "detachAttributeValue"]
        )->name("products.categories.attributes.attribute-values.detach");
    });
