<?php

namespace App\Http\Controllers\Datatables\Dashboard;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Helpers\DatatableController;

class ProductController extends DatatableController
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
        return Product::query();
    }
}
