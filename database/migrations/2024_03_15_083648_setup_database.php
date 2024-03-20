<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("categories", function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create("attributes", function (Blueprint $table) {
            $table->id();
            $table->string("type");
            $table->string("name");
            $table->foreignId("category_id")->constrained();
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create("attribute_values", function (Blueprint $table) {
            $table->id();
            $table->string("value");
            $table->foreignId("attribute_id")->constrained();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create("products", function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->text("description")->nullable();
            $table->float("price")->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create("category_product", function (Blueprint $table) {
            $table->foreignId("category_id")->constrained();
            $table->foreignId("product_id")->constrained();

            $table->primary(["category_id", "product_id"]);
        });

        Schema::create("attribute_value_product", function (Blueprint $table) {
            $table->foreignId("attribute_value_id")->constrained();
            $table->foreignId("product_id")->constrained();

            $table->primary(["attribute_value_id", "product_id"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("attribute_value_product");
        Schema::dropIfExists("category_product");
        Schema::dropIfExists("products");
        Schema::dropIfExists("attribute_values");
        Schema::dropIfExists("attributes");
        Schema::dropIfExists("categories");
    }
};
