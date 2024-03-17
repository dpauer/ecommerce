<?php

namespace App\Http\Controllers\Datatables\Dashboard\Category;

use App\Models\Category;
use App\Models\Attribute;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AttributeController extends Controller
{
    public function index(Request $request, Category $category)
    {
        $query = Attribute::query();
        $query->where("category_id", $category->id);

        // handle page
        $page = $request->get("page", 1);

        // handle search
        $search = $request->get("search", "");
        if (strlen($search) > 0) {
            $query->where("name", "like", $search . "%");
        }

        return $query->paginate(10, ["id", "name"], "page", $page);
    }
}
