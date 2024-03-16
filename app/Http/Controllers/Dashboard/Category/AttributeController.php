<?php

namespace App\Http\Controllers\Dashboard\Category;

use Inertia\Inertia;
use App\Models\Category;
use App\Models\Attribute;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Enums\AttributeTypeEnum;
use App\Http\Controllers\Controller;

class AttributeController extends Controller
{
    public function create(Category $category)
    {
        return Inertia::render("Dashboard/Categories/Attributes/Create", [
            "category" => $category,
        ]);
    }

    public function store(Request $request, Category $category)
    {
        $request->validate([
            "type" => ["required", Rule::enum(AttributeTypeEnum::class)],
            "name" => ["required", "string", "max:255"],
        ]);

        $category->attributes()->create($request->all());

        return redirect(
            route("dashboard.categories.show", [
                "category" => $category,
            ])
        );
    }

    public function show(Category $category, Attribute $attribute)
    {
        return Inertia::render("Dashboard/Categories/Attributes/Show", [
            "category" => $category,
            "attribute" => $attribute,
            "attributeValues" => $attribute->attributeValues()->paginate(),
        ]);
    }

    public function edit(Category $category, Attribute $attribute)
    {
        return Inertia::render("Dashboard/Categories/Attributes/Edit", [
            "category" => $category,
            "attribute" => $attribute,
        ]);
    }

    public function update(
        Request $request,
        Category $category,
        Attribute $attribute
    ) {
        $request->validate([
            "type" => ["required", Rule::enum(AttributeTypeEnum::class)],
            "name" => ["required", "string", "max:255"],
        ]);

        $attribute->update($request->all());

        return redirect(
            route("dashboard.categories.attributes.show", [
                "category" => $category,
                "attribute" => $attribute,
            ])
        );
    }

    public function destroy(Category $category, Attribute $attribute)
    {
        $attribute->delete();

        return redirect(
            route("dashboard.categories.show", [
                "category" => $category,
            ])
        );
    }
}
