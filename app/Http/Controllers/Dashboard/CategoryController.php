<?php

namespace App\Http\Controllers\Dashboard;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::paginate();
        return Inertia::render("Dashboard/Categories/Index", [
            "categories" => $categories,
        ]);
    }

    public function create()
    {
        return Inertia::render("Dashboard/Categories/Create");
    }

    public function store(Request $request)
    {
        $request->validate([
            "name" => ["required", "string", "max:255"],
        ]);

        Category::create($request->all());

        return redirect(route("dashboard.categories.index"));
    }

    public function show(Category $category)
    {
        return Inertia::render("Dashboard/Categories/Show", [
            "category" => $category,
            "attributes" => $category->attributes()->paginate(),
        ]);
    }

    public function edit(Category $category)
    {
        return Inertia::render("Dashboard/Categories/Edit", [
            "category" => $category,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            "name" => ["required", "string", "max:255"],
        ]);

        $category->update($request->all());

        return redirect(
            route("dashboard.categories.show", [
                "category" => $category,
            ])
        );
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return redirect(route("dashboard.categories.index"));
    }
}
