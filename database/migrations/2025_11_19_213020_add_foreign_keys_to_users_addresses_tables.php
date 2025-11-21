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
      $table->unsignedBigInteger('address_id')->nullable();
      $table->foreign('address_id')->references('id')->on('addresses');
    });
    Schema::table('addresses', function (Blueprint $table) {
      $table->unsignedBigInteger('user_id'); // Cria a a coluna user_id. Unsigned para evitar valores negativos
      $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); // Define a chave estrangeira
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('users', function (Blueprint $table) {
      $table->dropForeign(['address_id']);
      $table->dropColumn('address_id');
    });
    Schema::table('addresses', function (Blueprint $table) {
      $table->dropForeign(['user_id']);
      $table->dropColumn('user_id');
    });
  }
};
