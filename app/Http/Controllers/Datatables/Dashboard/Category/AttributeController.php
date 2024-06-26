<?php

namespace App\Http\Controllers\Datatables\Dashboard\Category;

use App\Models\Category;
use App\Models\Attribute;
use Illuminate\Http\Request;
use App\Helpers\DatatableController;

class AttributeController extends DatatableController
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
        $query = Attribute::query();
        $query->where("category_id", $request->category);
        return $query;
    }
}
