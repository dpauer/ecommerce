<?php

namespace App\Http\Controllers\Datatables\Dashboard\Category\Attribute;

use App\Models\Category;
use App\Models\Attribute;
use Illuminate\Http\Request;
use App\Models\AttributeValue;
use App\Http\Controllers\Controller;

class AttributeValueController extends Controller
{
    public function index(
        Request $request,
        Category $category,
        Attribute $attribute
    ) {
        $query = AttributeValue::query();
        $query->where("attribute_id", $attribute->id);

        // handle page
        $page = $request->get("page", 1);

        // handle search
        $search = $request->get("search", "");
        if (strlen($search) > 0) {
            $query->where("value", "like", $search . "%");
        }

        return $query->paginate(10, ["id", "value"], "page", $page);
    }
}
