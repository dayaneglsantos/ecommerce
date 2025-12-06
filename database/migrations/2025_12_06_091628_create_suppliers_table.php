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
    Schema::create('suppliers', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('cnpj')->unique();
      $table->string('email')->unique();
      $table->string('contact_name')->nullable();
      $table->string('phone_number')->nullable();
      $table->unsignedBigInteger('address_id')->nullable();
      $table->foreign('address_id')->references('id')->on('addresses')->onDelete('set null'); // Se o endereço for deletado, define address_id como null
      $table->text('notes')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('suppliers');
  }
};
