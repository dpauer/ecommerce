<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Dashboard\ProductController;
use App\Http\Controllers\Dashboard\CategoryController;
use App\Http\Controllers\Dashboard\Category\AttributeController;
use App\Http\Controllers\Dashboard\Category\Attribute\AttributeValueController;
use App\Http\Controllers\Dashboard\Product\CategoryController as ProductCategoryController;

Route::middleware(["auth", "verified"])->group(function () {
    Route::get("dashboard", [DashboardController::class, "index"])->name(
        "dashboard"
    );

    Route::get("dashboard/categories", [
        CategoryController::class,
        "index",
    ])->name("dashboard.categories.index");
    Route::get("dashboard/categories/create", [
        CategoryController::class,
        "create",
    ])->name("dashboard.categories.create");
    Route::post("dashboard/categories", [
        CategoryController::class,
        "store",
    ])->name("dashboard.categories.store");
    Route::get("dashboard/categories/{category}", [
        CategoryController::class,
        "show",
    ])->name("dashboard.categories.show");
    Route::get("dashboard/categories/{category}/edit", [
        CategoryController::class,
        "edit",
    ])->name("dashboard.categories.edit");
    Route::patch("dashboard/categories/{category}", [
        CategoryController::class,
        "update",
    ])->name("dashboard.categories.update");
    Route::delete("dashboard/categories/{category}", [
        CategoryController::class,
        "destroy",
    ])->name("dashboard.categories.destroy");

    Route::get("dashboard/categories/{category}/attributes/create", [
        AttributeController::class,
        "create",
    ])->name("dashboard.categories.attributes.create");
    Route::post("dashboard/categories/{category}/attributes", [
        AttributeController::class,
        "store",
    ])->name("dashboard.categories.attributes.store");
    Route::get("dashboard/categories/{category}/attributes/{attribute}", [
        AttributeController::class,
        "show",
    ])->name("dashboard.categories.attributes.show");
    Route::get("dashboard/categories/{category}/attributes/{attribute}/edit", [
        AttributeController::class,
        "edit",
    ])->name("dashboard.categories.attributes.edit");
    Route::patch("dashboard/categories/{category}/attributes/{attribute}", [
        AttributeController::class,
        "update",
    ])->name("dashboard.categories.attributes.update");
    Route::delete("dashboard/categories/{category}/attributes/{attribute}", [
        AttributeController::class,
        "destroy",
    ])->name("dashboard.categories.attributes.destroy");

    Route::get(
        "dashboard/categories/{category}/attributes/{attribute}/attribute-values/create",
        [AttributeValueController::class, "create"]
    )->name("dashboard.categories.attributes.attribute-values.create");
    Route::post(
        "dashboard/categories/{category}/attributes/{attribute}/attribute-values",
        [AttributeValueController::class, "store"]
    )->name("dashboard.categories.attributes.attribute-values.store");
    Route::get(
        "dashboard/categories/{category}/attributes/{attribute}/attribute-values/{attributeValue}",
        [AttributeValueController::class, "show"]
    )->name("dashboard.categories.attributes.attribute-values.show");
    Route::get(
        "dashboard/categories/{category}/attributes/{attribute}/attribute-values/{attributeValue}/edit",
        [AttributeValueController::class, "edit"]
    )->name("dashboard.categories.attributes.attribute-values.edit");
    Route::patch(
        "dashboard/categories/{category}/attributes/{attribute}/attribute-values/{attributeValue}",
        [AttributeValueController::class, "update"]
    )->name("dashboard.categories.attributes.attribute-values.update");
    Route::delete(
        "dashboard/categories/{category}/attributes/{attribute}/attribute-values/{attributeValue}",
        [AttributeValueController::class, "destroy"]
    )->name("dashboard.categories.attributes.attribute-values.destroy");

    /**
     * -------------------------------------------------------------------------
     * Dashboard / Products
     * ---
     */
    Route::get("dashboard/products", [ProductController::class, "index"])->name(
        "dashboard.products.index"
    );
    Route::get("dashboard/products/create", [
        ProductController::class,
        "create",
    ])->name("dashboard.products.create");
    Route::post("dashboard/products", [
        ProductController::class,
        "store",
    ])->name("dashboard.products.store");
    Route::get("dashboard/products/{product}", [
        ProductController::class,
        "show",
    ])->name("dashboard.products.show");
    Route::get("dashboard/products/{product}/edit", [
        ProductController::class,
        "edit",
    ])->name("dashboard.products.edit");
    Route::patch("dashboard/products/{product}", [
        ProductController::class,
        "update",
    ])->name("dashboard.products.update");
    Route::delete("dashboard/products/{product}", [
        ProductController::class,
        "destroy",
    ])->name("dashboard.products.destroy");

    Route::get("dashboard/products/{product}/categories/attach", [
        ProductCategoryController::class,
        "showAttach",
    ])->name("dashboard.products.categories.show-attach");
    Route::post("dashboard/products/{product}/categories/attach", [
        ProductCategoryController::class,
        "attach",
    ])->name("dashboard.products.categories.attach");

    Route::get("dashboard/products/{product}/categories/{category}", [
        ProductCategoryController::class,
        "show",
    ])->name("dashboard.products.categories.show");

    Route::patch(
        "dashboard/products/{product}/categories/{category}/attributes/{attribute}/attribute-values/{attributeValue}/attach",
        [ProductCategoryController::class, "attachAttributeValue"]
    )->name("dashboard.products.categories.attributes.attribute-values.attach");
    Route::patch(
        "dashboard/products/{product}/categories/{category}/attributes/{attribute}/attribute-values/{attributeValue}/detach",
        [ProductCategoryController::class, "detachAttributeValue"]
    )->name("dashboard.products.categories.attributes.attribute-values.detach");
});
