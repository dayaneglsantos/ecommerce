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
    Schema::create('coupons', function (Blueprint $table) {
      $table->id();
      $table->string('type'); // Produto ou frete
      $table->integer('discount_percentage')->nullable(); // Percentual de desconto OU
      $table->decimal('discount_value', 8, 2)->nullable(); // Valor do desconto
      $table->string('code')->unique(); // Código único do cupom
      $table->string('status'); // Ex: active, inactive, expired
      $table->date('start_date'); // Data de início da validade do cupom
      $table->date('end_date'); // Data de término da validade do cupom
      $table->integer('available_quantity'); // Número de cupons disponíveis
      $table->integer('available_per_user')->default(1); // Número de cupons disponíveis por usuário
      $table->decimal('minimum_order_value', 8, 2)->nullable(); // Valor mínimo do pedido para aplicar o cupom
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('coupons');
  }
};
