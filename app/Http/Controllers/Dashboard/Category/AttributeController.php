<?php

namespace App\Http\Controllers\Dashboard\Category;

use Attribute;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AttributeController extends Controller
{
    public function show(Category $category, Attribute $attribute)
    {
        return Inertia::render('Dashboard/Categories/Attributes/Show', [
            'category' => $category,
            'attribute' => $attribute,
        ]);
    }
}
