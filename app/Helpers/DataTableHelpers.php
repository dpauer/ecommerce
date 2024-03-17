<?php

namespace App\Helpers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class DataTableHelpers
{
    public static function paginationHelper(
        Request $request,
        Builder $query,
        $searchableKeys,
        $selectCB
    ) {
        return [
            "paginatedData" => $query
                ->when($request->input("search"), function (
                    $query,
                    $search
                ) use ($searchableKeys) {
                    foreach ($searchableKeys as $searchableKey) {
                        $query->where($searchableKey, "like", $search . "%");
                    }
                })
                ->paginate()
                ->withQueryString()
                ->through($selectCB),
            "filters" => $request->only(["search"]),
        ];
    }
}
