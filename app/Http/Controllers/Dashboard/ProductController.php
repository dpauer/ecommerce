<?php

namespace App\Http\Controllers\Dashboard;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render("Dashboard/Products/Index");
    }

    public function create()
    {
        return Inertia::render("Dashboard/Products/Create");
    }

    public function store(Request $request)
    {
        $request->validate([
            "name" => ["required", "string", "max:255"],
            "description" => ["nullable", "string", "max:255"],
            "price" => ["nullable", "numeric", "min:0"],
        ]);

        Product::create($request->all());

        return redirect(route("dashboard.products.index"));
    }

    public function show(Product $product)
    {
        return Inertia::render("Dashboard/Products/Show", [
            "product" => $product,
        ]);
    }

    public function edit(Product $product)
    {
        return Inertia::render("Dashboard/Products/Edit", [
            "product" => $product,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            "name" => ["required", "string", "max:255"],
            "description" => ["nullable", "string", "max:255"],
            "price" => ["nullable", "numeric", "min:0"],
        ]);

        $product->update($request->all());

        return redirect(
            route("dashboard.products.show", [
                "product" => $product,
            ])
        );
    }

    public function destroy(Request $request, Product $product)
    {
        $product->delete();

        return redirect(route("dashboard.products.index"));
    }
}
