<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ["name"];

    protected function casts(): array
    {
        return [
            "created_at" => "datetime:Y-m-d H:i:s",
            "updated_at" => "datetime:Y-m-d H:i:s",
        ];
    }

    protected $touches = ["products"];

    public function attributes(): HasMany
    {
        return $this->hasMany(Attribute::class);
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class);
    }
}
