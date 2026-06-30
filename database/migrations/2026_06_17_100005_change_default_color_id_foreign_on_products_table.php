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
    Schema::table('products', function (Blueprint $table) {
      $table->dropForeign(['default_color_id']);
    });

    Schema::table('products', function (Blueprint $table) {
      $table->foreign('default_color_id')->references('id')->on('colors')->onDelete('set null');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('products', function (Blueprint $table) {
      $table->dropForeign(['default_color_id']);
    });

    Schema::table('products', function (Blueprint $table) {
      $table->foreign('default_color_id')->references('id')->on('attribute_values')->onDelete('set null');
    });
  }
};
