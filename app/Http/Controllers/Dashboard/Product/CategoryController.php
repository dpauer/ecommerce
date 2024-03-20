<?php

namespace App\Http\Controllers\Dashboard\Product;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Models\Attribute;
use Illuminate\Http\Request;
use App\Models\AttributeValue;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    public function showAttach(Product $product)
    {
        $categories = Category::whereDoesntHave("products", function (
            $query
        ) use ($product) {
            $query->where("id", $product->id);
        })->get();

        return Inertia::render("Dashboard/Products/Categories/ShowAttach", [
            "product" => $product,
            "categories" => $categories,
        ]);
    }

    public function attach(Request $request, Product $product)
    {
        $request->validate([
            "category_id" => ["required", "exists:categories,id"],
        ]);

        $product->categories()->syncWithoutDetaching($request->category_id);

        return redirect(
            route("dashboard.products.show", ["product" => $product])
        );
    }

    public function show(Product $product, Category $category)
    {
        $category->load("attributes");
        return Inertia::render("Dashboard/Products/Categories/Show", [
            "product" => $product,
            "category" => $category,
        ]);
    }

    public function attachAttributeValue(
        Product $product,
        Category $category,
        Attribute $attribute,
        AttributeValue $attributeValue
    ) {
        $product->attributeValues()->attach([$attributeValue->id]);
        return redirect(
            route("dashboard.products.categories.show", [
                "product" => $product,
                "category" => $category,
            ])
        );
    }

    public function detachAttributeValue(
        Product $product,
        Category $category,
        Attribute $attribute,
        AttributeValue $attributeValue
    ) {
        $product->attributeValues()->detach([$attributeValue->id]);
        return redirect(
            route("dashboard.products.categories.show", [
                "product" => $product,
                "category" => $category,
            ])
        );
    }
}
