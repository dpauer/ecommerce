<?php

namespace App\Http\Controllers\Dashboard;

use Inertia\Inertia;
use App\Models\Category;
use App\Models\Attribute;
use Illuminate\Http\Request;
use App\Helpers\DataTableHelpers;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render(
            "Dashboard/Categories/Index",
            DataTableHelpers::paginationHelper(
                $request,
                Category::query(),
                ["name"],
                fn($el) => [
                    "id" => $el->id,
                    "name" => $el->name,
                ]
            )
        );
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

    public function show(Request $request, Category $category)
    {
        return Inertia::render("Dashboard/Categories/Show", [
            "category" => $category,
            ...DataTableHelpers::paginationHelper(
                $request,
                Attribute::query()->where("category_id", $category->id),
                ["name"],
                fn($el) => [
                    "id" => $el->id,
                    "name" => $el->name,
                ]
            ),
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
