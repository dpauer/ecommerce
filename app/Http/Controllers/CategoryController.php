<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Models\Attribute;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function show(Request $request, Category $category)
    {
        $attributes = Attribute::with("attributeValues")
            ->where("category_id", $category->id)
            ->get();

        $search = $request->get("search", null);
        $products = Product::search($search)->whereIn("categories", [
            $category->id,
        ]);

        $priceSort = $request->get("priceSort", null);
        if (!is_null($priceSort)) {
            $products->orderBy("price", "desc");
        }

        return Inertia::render("Categories/Show", [
            "category" => $category,
            "attributes" => $attributes,
            "products" => $products->paginate(),
        ]);
    }
}
