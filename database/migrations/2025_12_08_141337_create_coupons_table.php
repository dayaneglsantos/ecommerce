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
      $table->enum('discount_type', ['percentage', 'fixed'])->default('fixed')->nullable();
      $table->unsignedInteger('discount_value')->default(0)->nullable();
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
