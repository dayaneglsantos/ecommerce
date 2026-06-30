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
    Schema::table('product_images', function (Blueprint $table) {
      $table->dropForeign(['attribute_id']);
    });

    Schema::table('product_images', function (Blueprint $table) {
      $table->renameColumn('attribute_id', 'color_id');
    });

    Schema::table('product_images', function (Blueprint $table) {
      $table->foreign('color_id')->references('id')->on('colors');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('product_images', function (Blueprint $table) {
      $table->dropForeign(['color_id']);
    });

    Schema::table('product_images', function (Blueprint $table) {
      $table->renameColumn('color_id', 'attribute_id');
    });

    Schema::table('product_images', function (Blueprint $table) {
      $table->foreign('attribute_id')->references('id')->on('attribute_values');
    });
  }
};
