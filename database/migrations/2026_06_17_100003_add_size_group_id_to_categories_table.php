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
    Schema::table('categories', function (Blueprint $table) {
      // Define quais tamanhos (do grupo) podem ser usados nos produtos dessa categoria
      $table->foreignId('size_group_id')->nullable()->constrained('size_groups')->onDelete('set null');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('categories', function (Blueprint $table) {
      $table->dropForeign(['size_group_id']);
      $table->dropColumn('size_group_id');
    });
  }
};
