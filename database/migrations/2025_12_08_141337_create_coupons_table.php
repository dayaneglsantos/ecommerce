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
      $table->string('description')->nullable(); // Descrição da regra
      $table->string('type'); // Produto ou frete
      $table->enum('discount_type', ['percentage', 'fixed'])->default('fixed')->nullable();
      $table->unsignedInteger('discount_value')->default(0)->nullable();
      $table->string('code')->unique(); // Código único do cupom
      $table->dateTime('start_date'); // Data de início da validade do cupom
      $table->dateTime('end_date'); // Data de término da validade do cupom
      $table->integer('available_quantity'); // Número de cupons disponíveis
      $table->integer('available_per_user')->default(1); // Número de cupons disponíveis por usuário
      $table->unsignedInteger('minimum_order_value')->default(0)->nullable(); // Valor mínimo do pedido para aplicar o cupom
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
