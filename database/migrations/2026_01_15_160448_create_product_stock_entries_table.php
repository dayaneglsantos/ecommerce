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
    Schema::create('product_stock_entries', function (Blueprint $table) {
      $table->id();
      $table->foreignId('product_variation_id')->constrained('product_variations');
      $table->foreignId('supplier_id')->constrained('suppliers');
      $table->integer('quantity');
      $table->decimal('unit_cost', 10, 2); // Custo unitário do item
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('product_stock_entries');
  }
};
