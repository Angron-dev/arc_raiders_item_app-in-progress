<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('item_rarity', function (Blueprint $table) {
            $table->id();
            $table->string('rarity_name');
            $table->string('color')->nullable();
            $table->timestamps();
        });

        Schema::create('loot_areas', function (Blueprint $table) {
            $table->id();
            $table->string('loot_area_name');
            $table->string('symbol')->nullable();
            $table->timestamps();
        });

        Schema::create('item_type', function (Blueprint $table) {
            $table->id();
            $table->string('item_type_name');
            $table->timestamps();
        });

        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('item_name');
            $table->integer('price')->nullable();
            $table->string('icon')->nullable();
            $table->string('description')->nullable();
            $table->foreignId('rarity_id')->nullable()->constrained('item_rarity');
            $table->foreignId('item_type_id')->nullable()->constrained('item_type');
            $table->boolean('can_be_deconstructed')->default(true);
            $table->timestamps();
        });

        Schema::create('item_loot_area', function (Blueprint $table) {
            $table->id();
            $table->foreignId('item_id')->constrained()->cascadeOnDelete();
            $table->foreignId('loot_area_id')->constrained('loot_areas')->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create('item_recipe_components', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recipe_item_id')->constrained('items');
            $table->foreignId('component_item_id')->constrained('items');
            $table->integer('amount');
            $table->timestamps();
        });

        Schema::create('item_deconstruction_components', function (Blueprint $table) {
            $table->id();
            $table->foreignId('deconstruct_item_id')->constrained('items');
            $table->foreignId('result_item_id')->constrained('items');
            $table->integer('amount');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item');
        Schema::dropIfExists('item_recipe_components');
        Schema::dropIfExists('item_deconstruction_components');
        Schema::dropIfExists('rarity');
        Schema::dropIfExists('item_can_be_found_in');
        Schema::dropIfExists('item_type');
    }
};
