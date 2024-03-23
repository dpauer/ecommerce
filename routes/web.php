<?php

use Illuminate\Support\Facades\Route;

require __DIR__ . "/ecommerce.php";
require __DIR__ . "/datatables/ecommerce.php";

require __DIR__ . "/auth.php";

Route::middleware(["auth", "verified"])->group(function () {
    require __DIR__ . "/dashboard.php";
    require __DIR__ . "/dashboard_api.php";
    require __DIR__ . "/datatables/dashboard.php";
});
