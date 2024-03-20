<?php

namespace App\Http\Controllers\Datatables\Dashboard\Category\Attribute;

use Illuminate\Http\Request;
use App\Models\AttributeValue;
use App\Helpers\DatatableController;

class AttributeValueController extends DatatableController
{
    public function getColumns()
    {
        return ["id", "value"];
    }

    public function getRapidSearchableColumns()
    {
        return ["value"];
    }

    public function buildQuery(Request $request)
    {
        $query = AttributeValue::query();
        $query->where("attribute_id", $request->attribute);
        return $query;
    }
}
