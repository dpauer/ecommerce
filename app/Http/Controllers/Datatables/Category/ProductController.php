<?php

namespace App\Http\Controllers\Datatables\Category;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function index(Request $request, Category $category)
    {
        $search = $request->get("search", null);
        $products = Product::search($search)->whereIn("categories", [
            $category->id,
        ]);

        $priceSort = $request->get("priceSort", null);
        if (!is_null($priceSort)) {
            $products->orderBy("price", "desc");
        }

        $filters = $request->get("filters", null);
        if (!is_null($filters) && count($filters) > 0) {
            $products->whereIn("attributeValues", $filters);
        }

        return $products->paginate();
    }
}
