<?php

namespace App\Http\Controllers\Datatables\Category;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Meilisearch\Endpoints\Indexes;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function index(Request $request, Category $category)
    {
        $filters = $request->get("filters", null);
        $search = $request->get("search", null);
        $products = Product::search($search, function (
            Indexes $meiliSearch,
            $query,
            $options
        ) use ($request) {
            $options["facets"] = ["attributeValues"];
            $options["offset"] = $request->input("pagination.offset", 0);
            $options["limit"] = $request->input("pagination.limit", 5);

            return $meiliSearch->search($query, $options);
        })->whereIn("categories", [$category->id]);

        if ($request->has("priceSort")) {
            $products->orderBy("price", $request->get("priceSort"));
        }

        $filters = $request->get("filters", null);
        if (!is_null($filters) && count($filters) > 0) {
            $products->whereIn("attributeValues", $filters);
        }

        return $products->raw();
    }
}
