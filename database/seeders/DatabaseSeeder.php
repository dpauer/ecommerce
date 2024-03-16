<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Product;
use App\Models\Category;
use App\Models\Attribute;
use App\Models\AttributeValue;
use Illuminate\Database\Seeder;
use App\Enums\AttributeTypeEnum;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            "name" => "admin",
            "email" => "admin@example.com",
        ]);

        $this->seedTShirts();
        $this->seedJeans();

        Category::factory()->create([
            "name" => "SCARPE",
        ]);

        Category::factory()->create([
            "name" => "OROLOGI",
        ]);
        Category::factory()->create([
            "name" => "PALLONI",
        ]);
    }

    private function seedTShirts()
    {
        $magliette = Category::factory()->create([
            "name" => "MAGLIETTE",
        ]);

        $taglia = Attribute::factory()->create([
            "name" => "taglia",
            "category_id" => $magliette->id,
        ]);
        AttributeValue::factory()->create([
            "attribute_id" => $taglia->id,
            "value" => "XS",
        ]);
        AttributeValue::factory()->create([
            "attribute_id" => $taglia->id,
            "value" => "S",
        ]);
        AttributeValue::factory()->create([
            "attribute_id" => $taglia->id,
            "value" => "M",
        ]);
        AttributeValue::factory()->create([
            "attribute_id" => $taglia->id,
            "value" => "L",
        ]);
        AttributeValue::factory()->create([
            "attribute_id" => $taglia->id,
            "value" => "XL",
        ]);

        $colore = Attribute::factory()->create([
            "type" => AttributeTypeEnum::COLOR,
            "name" => "colore",
            "category_id" => $magliette->id,
        ]);
        $black = AttributeValue::factory()->create([
            "attribute_id" => $colore->id,
            "value" => "#000000",
        ]);
        $white = AttributeValue::factory()->create([
            "attribute_id" => $colore->id,
            "value" => "#FFFFFF",
        ]);
        AttributeValue::factory()->create([
            "attribute_id" => $colore->id,
            "value" => "#FF0000",
        ]);
        AttributeValue::factory()->create([
            "attribute_id" => $colore->id,
            "value" => "#00FF00",
        ]);
        AttributeValue::factory()->create([
            "attribute_id" => $colore->id,
            "value" => "#0000FF",
        ]);

        $tessuto = Attribute::factory()->create([
            "name" => "tessuto",
            "category_id" => $magliette->id,
        ]);
        AttributeValue::factory()->create([
            "attribute_id" => $tessuto->id,
            "value" => "COTONE",
        ]);
        $wool = AttributeValue::factory()->create([
            "attribute_id" => $tessuto->id,
            "value" => "LANA",
        ]);
        AttributeValue::factory()->create([
            "attribute_id" => $tessuto->id,
            "value" => "LINO",
        ]);
        $silk = AttributeValue::factory()->create([
            "attribute_id" => $tessuto->id,
            "value" => "SETA",
        ]);
        AttributeValue::factory()->create([
            "attribute_id" => $tessuto->id,
            "value" => "ACRILICO",
        ]);

        $test = Attribute::factory()->create([
            "name" => "test attribute",
            "category_id" => $magliette->id,
        ]);
        for ($i = 0; $i < 1000; $i++) {
            AttributeValue::factory()->create([
                "attribute_id" => $test->id,
                "value" => "$i - test attribute value",
            ]);
        }

        // maglietta bianca di seta
        $p1 = Product::factory()->create([
            "name" => "t-shirt: seta, bianca",
        ]);
        $p1->categories()->attach([$magliette->id]);
        $p1->attributeValues()->attach([$silk->id, $white->id]);

        // maglietta nera di lana
        $p2 = Product::factory()->create([
            "name" => "t-shirt: lana, nera",
        ]);
        $p2->categories()->attach([$magliette->id]);
        $p2->attributeValues()->attach([$wool->id, $black->id]);
    }

    private function seedJeans()
    {
        $jeans = Category::factory()->create([
            "name" => "JEANS",
        ]);
        Attribute::factory()->create([
            "name" => "colore",
            "category_id" => $jeans->id,
        ]);
        Attribute::factory()->create([
            "name" => "dimensione del giro vita",
            "category_id" => $jeans->id,
        ]);
        Attribute::factory()->create([
            "name" => "tipo di lavaggio",
            "category_id" => $jeans->id,
        ]);
    }
}
