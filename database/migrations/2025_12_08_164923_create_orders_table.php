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
    Schema::create('orders', function (Blueprint $table) {
      $table->id();
      // Usuário que fez o pedido
      $table->foreignId('user_id')->constrained()->onDelete('cascade');
      // Cupons
      $table->foreignId('coupon_id')->nullable()->constrained()->onDelete('set null');
      // Endereço de entrega
      $table->foreignId('shipping_address_id')->constrained('addresses')->onDelete('cascade');

      $table->string('status');
      $table->string('payment_method');

      // Informações de envio
      $table->string('tracking_code')->nullable(); // Código de rastreamento do pedido
      $table->string('shipping_service')->nullable(); // Serviço de frete utilizado. Ex: Correios, FedEx, etc.
      $table->dateTime('shipped_at')->nullable(); // Data e hora do envio
      $table->dateTime('delivered_at')->nullable(); // Data e hora da entrega

      // Valores
      $table->decimal('total_value', 10, 2); // Valor total do pedido
      $table->decimal('shipping_cost', 8, 2)->default(0); // Custo de frete
      $table->decimal('discount_value', 8, 2)->default(0); // Valor do desconto aplicado

      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('orders');
  }
};
