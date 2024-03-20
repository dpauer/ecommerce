<?php

namespace App\Http\Controllers\Datatables\Dashboard\Product;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Helpers\DatatableController;

class CategoryController extends DatatableController
{
    public function getColumns()
    {
        return ["id", "name"];
    }

    public function getRapidSearchableColumns()
    {
        return ["name"];
    }

    public function buildQuery(Request $request)
    {
        $query = Category::query();
        $query->whereHas("products", function ($query) use ($request) {
            $query->where("id", $request->product);
        });
        return $query;
    }
}
