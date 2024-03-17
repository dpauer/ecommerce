<?php

namespace App\Http\Controllers\Dashboard\Category;

use Inertia\Inertia;
use App\Models\Category;
use App\Models\Attribute;
use Illuminate\Http\Request;
use App\Models\AttributeValue;
use Illuminate\Validation\Rule;
use App\Enums\AttributeTypeEnum;
use App\Helpers\DataTableHelpers;
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

    public function show(
        Request $request,
        Category $category,
        Attribute $attribute
    ) {
        return Inertia::render("Dashboard/Categories/Attributes/Show", [
            "category" => $category,
            "attribute" => $attribute,
            ...DataTableHelpers::paginationHelper(
                $request,
                AttributeValue::query()->where("attribute_id", $attribute->id),
                ["value"],
                fn($el) => [
                    "id" => $el->id,
                    "value" => $el->value,
                ]
            ),
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
