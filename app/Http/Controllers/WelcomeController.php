<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Category;

class WelcomeController extends Controller
{
    public function index()
    {
        return Inertia::render("Welcome", [
            "categories" => Category::paginate(),
        ]);
    }
}
