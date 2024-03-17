<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Helpers\DataTableHelpers;

class WelcomeController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render(
            "Welcome",
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
}
