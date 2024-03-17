<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    use HasFactory, SoftDeletes, Searchable;

    protected $fillable = ["name", "description", "price"];

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    public function attributeValues(): BelongsToMany
    {
        return $this->belongsToMany(AttributeValue::class);
    }

    public function toSearchableArray()
    {
        return [
            "id" => (int) $this->id,
            "name" => $this->name,
            "price" => (int) $this->price,
            "categories" => $this->categories()->pluck("id"),
            "attributeValues" => $this->attributeValues()->pluck("id"),
        ];
    }
}
