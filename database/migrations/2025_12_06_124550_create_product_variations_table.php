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
    Schema::create('product_variations', function (Blueprint $table) {
      $table->id();
      $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
      $table->unsignedInteger('old_price')->nullable();
      $table->unsignedInteger('price');
      $table->integer('stock_quantity')->default(0);
      $table->enum('pix_discount_type', ['percentage', 'fixed'])->default('fixed')->nullable();
      $table->unsignedInteger('pix_discount_value')->default(0)->nullable();
      $table->string('sku')->unique();
      $table->foreignId('supplier_id')->nullable()->constrained('suppliers')->onDelete('set null');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('product_variations');
  }
};
