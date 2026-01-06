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
    Schema::create('product_variation_attributes', function (Blueprint $table) {
      $table->id();
      // Deleta o registro quando a variação do produto for deletada
      $table->foreignId('product_variation_id')->constrained('product_variations')->onDelete('cascade');
      // Deleta o registro quando o valor do atributo for deletado
      $table->foreignId('attribute_value_id')->constrained('attribute_values')->onDelete('cascade');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('product_variation_attributes');
  }
};
