<?php

namespace App\Http\Controllers\Datatables\Dashboard\Product\Category\Attribute;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\AttributeValue;
use App\Helpers\DatatableController;

class AttributeValueController extends DatatableController
{
    public function getColumns()
    {
        return [
            "attribute_values.id",
            "attribute_values.value",
            "attribute_value_product.product_id",
        ];
    }

    public function getRapidSearchableColumns()
    {
        return ["value"];
    }

    public function buildQuery(Request $request)
    {
        $query = AttributeValue::query();
        $query
            ->where("attribute_id", $request->attribute)
            ->leftJoin("attribute_value_product", function ($join) use (
                $request
            ) {
                $join->on(
                    "attribute_value_product.attribute_value_id",
                    "attribute_values.id"
                );
                $join->where(
                    "attribute_value_product.product_id",
                    $request->product
                );
            });

        return $query;
    }
}
