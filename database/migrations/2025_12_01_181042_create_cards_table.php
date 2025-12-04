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
    Schema::create('cards', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Exclui o cartão se o usuário for excluído
      $table->string('token')->unique(); // Token do cartão gerado pelo Stripe
      $table->string('last_four', 4); // Últimos 4 dígitos do cartão
      $table->string('brand'); // bandeira do cartão (Visa, MasterCard, etc.)
      $table->string('expiration_month', 2); // Mês de expiração do cartão
      $table->string('expiration_year', 4); // Ano de expiração do cartão
      $table->boolean('is_default')->default(false); // Indica se é o cartão padrão
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('cards');
  }
};
