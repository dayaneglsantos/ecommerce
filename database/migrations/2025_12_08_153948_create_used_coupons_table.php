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
    Schema::create('used_coupons', function (Blueprint $table) {
      $table->id();
      $table->foreignId('coupon_id')->constrained()->onDelete('cascade');
      $table->foreignId('user_id')->constrained()->onDelete('cascade');
      //  AJUSTAR POSTERIORMENTE E INCLUIR O ID DO PEDIDO
      $table->timestamp('used_at')->useCurrent(); // Data e hora em que o cupom foi usado
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('used_coupons');
  }
};
