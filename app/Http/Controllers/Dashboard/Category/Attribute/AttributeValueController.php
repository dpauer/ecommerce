<?php

namespace App\Http\Controllers\Dashboard\Category\Attribute;

use Inertia\Inertia;
use App\Models\Category;
use App\Models\Attribute;
use Illuminate\Http\Request;
use App\Models\AttributeValue;
use App\Http\Controllers\Controller;

class AttributeValueController extends Controller
{
    public function create(Category $category, Attribute $attribute)
    {
        return Inertia::render(
            "Dashboard/Categories/Attributes/AttributeValues/Create",
            [
                "category" => $category,
                "attribute" => $attribute,
            ]
        );
    }

    public function store(
        Request $request,
        Category $category,
        Attribute $attribute
    ) {
        $request->validate([
            "value" => ["required", "string", "max:255"],
        ]);

        $attribute->attributeValues()->create($request->all());

        return redirect(
            route("dashboard.categories.attributes.show", [
                "category" => $category,
                "attribute" => $attribute,
            ])
        );
    }

    public function show(
        Category $category,
        Attribute $attribute,
        AttributeValue $attributeValue
    ) {
        return Inertia::render(
            "Dashboard/Categories/Attributes/AttributeValues/Show",
            [
                "category" => $category,
                "attribute" => $attribute,
                "attributeValue" => $attributeValue,
            ]
        );
    }

    public function edit(
        Category $category,
        Attribute $attribute,
        AttributeValue $attributeValue
    ) {
        return Inertia::render(
            "Dashboard/Categories/Attributes/AttributeValues/Edit",
            [
                "category" => $category,
                "attribute" => $attribute,
                "attributeValue" => $attributeValue,
            ]
        );
    }

    public function update(
        Request $request,
        Category $category,
        Attribute $attribute,
        AttributeValue $attributeValue
    ) {
        $request->validate([
            "value" => ["required", "string", "max:255"],
        ]);

        $attributeValue->update($request->all());

        return redirect(
            route("dashboard.categories.attributes.show", [
                "category" => $category,
                "attribute" => $attribute,
            ])
        );
    }

    public function destroy(
        Category $category,
        Attribute $attribute,
        AttributeValue $attributeValue
    ) {
        $attributeValue->delete();

        return redirect(
            route("dashboard.categories.attributes.show", [
                "category" => $category,
                "attribute" => $attribute,
            ])
        );
    }
}
