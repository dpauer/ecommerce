<?php

namespace App\Http\Controllers\Datatables;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Category::query();

        // handle page
        $page = $request->get("page", 1);

        // handle search
        $search = $request->get("search", "");
        if (strlen($search) > 0) {
            $query->where("name", "like", $search . "%");
        }

        // handle sort
        if ($request->has("sort")) {
            $sortColumn = $request->input("sort.column", null);
            $sortDirection = $request->input("sort.direction", null);
            if (!is_null($sortColumn) && !is_null($sortDirection)) {
                $query->orderBy($sortColumn, $sortDirection);
            }
        }

        return $query->paginate(10, ["id", "name"], "page", $page);
    }
}
