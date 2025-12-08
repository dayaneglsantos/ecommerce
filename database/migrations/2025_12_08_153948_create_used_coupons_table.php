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
      $table->unsignedBigInteger('coupon_id');
      $table->foreign('coupon_id')->references('id')->on('coupons')->onDelete('cascade');
      $table->unsignedBigInteger('user_id');
      $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
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
