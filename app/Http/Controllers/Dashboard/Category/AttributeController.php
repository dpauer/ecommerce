<?php

namespace App\Http\Controllers\Dashboard\Category;

use Inertia\Inertia;
use App\Models\Category;
use App\Models\Attribute;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AttributeController extends Controller
{
    public function show(Category $category, Attribute $attribute)
    {
        return Inertia::render('Dashboard/Categories/Attributes/Show', [
            'category' => $category,
            'attribute' => $attribute,
            'attributeValues' => $attribute->attributeValues,
        ]);
    }
}
