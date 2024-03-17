<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Models\Attribute;
use Illuminate\Database\Eloquent\Builder;

class CategoryController extends Controller
{
    public function show(Category $category)
    {
        // $category->load("attributes.attributeValues", "products");
        $attributes = Attribute::with("attributeValues")
            ->where("category_id", $category->id)
            ->get();

        $products = Product::whereHas("categories", function (
            Builder $query
        ) use ($category) {
            $query->where("id", $category->id);
        })->paginate(5);

        return Inertia::render("Categories/Show", [
            "category" => $category,
            "attributes" => $attributes,
            "products" => $products,
        ]);
    }
}
