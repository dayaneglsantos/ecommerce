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
    Schema::dropIfExists('product_variation_attributes');
    Schema::dropIfExists('attribute_values');
    Schema::dropIfExists('attributes');
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::create('attributes', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->timestamps();
    });

    Schema::create('attribute_values', function (Blueprint $table) {
      $table->id();
      $table->foreignId('attribute_id')->constrained('attributes')->onDelete('cascade');
      $table->string('value');
      $table->timestamps();
    });

    Schema::create('product_variation_attributes', function (Blueprint $table) {
      $table->id();
      $table->foreignId('product_variation_id')->constrained('product_variations')->onDelete('cascade');
      $table->foreignId('attribute_value_id')->constrained('attribute_values')->onDelete('cascade');
      $table->timestamps();
    });
  }
};
