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
    Schema::create('product_images', function (Blueprint $table) {
      $table->id();
      $table->foreignId('attribute_id')->constrained('attribute_values');
      $table->foreignId('product_id')->constrained('products')->onDelete('cascade'); // Deleta as imagens quando o produto for deletado
      $table->string('path');
      $table->integer('position')->default(0);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('product_images');
  }
};
