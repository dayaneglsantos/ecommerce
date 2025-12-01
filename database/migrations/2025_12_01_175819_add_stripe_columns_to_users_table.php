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
    Schema::table('users', function (Blueprint $table) {
      $table->string('stripe_id')->nullable()->index(); // ID do cliente Stripe
      $table->string('pm_type')->nullable(); // Método de pagamento
      $table->string('pm_last_four', 4)->nullable(); // Últimos 4 dígitos
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('users', function (Blueprint $table) {
      //
    });
  }
};
