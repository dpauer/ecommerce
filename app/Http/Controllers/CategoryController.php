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

        return Inertia::render("Categories/Show", [
            "category" => $category,
            "attributes" => $attributes,
        ]);
    }
}
