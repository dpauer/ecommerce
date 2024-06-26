<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use App\Models\Attribute;
use App\Models\AttributeValue;
use Illuminate\Database\Seeder;
use App\Enums\AttributeTypeEnum;

class AmazonSeeder extends Seeder
{
    public $cachedCategories = [];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            "name" => "admin",
            "email" => "admin@example.com",
        ]);

        $content = file_get_contents(__DIR__ . "/amazon.json");
        $rows = json_decode($content, true);
        foreach ($rows as $row) {
            $product = Product::firstOrCreate([
                "name" => $row["title"],
                "description" => $row["description"],
                "price" => $row["price"],
            ]);
            $category = Category::firstOrCreate([
                "name" => $row["category"],
            ]);
            $product->categories()->syncWithoutDetaching([$category->id]);

            // handle brand as category attribute
            $brandAttribute = Attribute::firstOrCreate([
                "type" => AttributeTypeEnum::CHECKBOX,
                "category_id" => $category->id,
                "name" => "Brand",
            ]);
            $brandAttributeValue = AttributeValue::firstOrCreate([
                "attribute_id" => $brandAttribute->id,
                "value" => $row["brand"],
            ]);
            $product
                ->attributeValues()
                ->syncWithoutDetaching([$brandAttributeValue->id]);

            // handle tag as category attribute
            $tagAttribute = Attribute::firstOrCreate([
                "type" => AttributeTypeEnum::CHECKBOX,
                "category_id" => $category->id,
                "name" => "Tag",
            ]);
            $tagAttributeValue = AttributeValue::firstOrCreate([
                "attribute_id" => $tagAttribute->id,
                "value" => $row["tag"],
            ]);
            $product
                ->attributeValues()
                ->syncWithoutDetaching([$tagAttributeValue->id]);
        }
    }
}
