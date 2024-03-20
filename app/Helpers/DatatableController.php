<?php

namespace App\Helpers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

abstract class DatatableController extends Controller
{
    abstract public function getColumns();

    public function getRapidSearchableColumns()
    {
        return [];
    }

    abstract public function buildQuery(Request $request);

    public function getPerPage()
    {
        return 10;
    }

    public function index(Request $request)
    {
        $query = $this->buildQuery($request);

        // handle page
        $page = $request->get("page", 1);

        // handle search
        $search = $request->get("search", "");
        if (strlen($search) > 0) {
            foreach ($this->getRapidSearchableColumns() as $column) {
                $query->where($column, "like", $search . "%");
            }
        }

        // handle sort
        if ($request->has("sort")) {
            $sortColumn = $request->input("sort.column", null);
            $sortDirection = $request->input("sort.direction", null);
            if (!is_null($sortColumn) && !is_null($sortDirection)) {
                $query->orderBy($sortColumn, $sortDirection);
            }
        }

        return $query->paginate(
            $this->getPerPage(),
            $this->getColumns(),
            "page",
            $page
        );
    }
}
