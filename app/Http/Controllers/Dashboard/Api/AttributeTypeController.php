<?php

namespace App\Http\Controllers\Dashboard\Api;

use Illuminate\Http\Request;
use App\Enums\AttributeTypeEnum;
use App\Http\Controllers\Controller;

class AttributeTypeController extends Controller
{
    public function index()
    {
        return AttributeTypeEnum::cases();
    }
}
