<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Category;

class CategoryController extends Controller
{
    public function show(Category $category)
    {
        return Inertia::render("Categories/Show", [
            "category" => $category,
        ]);
    }
}
