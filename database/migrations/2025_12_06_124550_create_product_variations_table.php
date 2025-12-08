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
      $table->string('color')->nullable();
      $table->string('color_code')->nullable();
      $table->string('size')->nullable();
      $table->decimal('old_price', 10, 2)->nullable();
      $table->decimal('price', 10, 2);
      $table->integer('stock_quantity')->default(0);
      $table->integer('pix_discount_percent')->default(0);
      $table->string('sku')->unique();
      $table->json('technical_specifications')->nullable();
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
