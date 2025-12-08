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
    Schema::create('comments', function (Blueprint $table) {
      $table->id();
      $table->text('content');
      $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Excluir comentários se o usuário for excluído
      $table->foreignId('product_id')->constrained()->onDelete('cascade'); // Excluir comentários se o produto for excluído
      $table->foreignId('parent_id')->nullable()->constrained('comments')->onDelete('cascade'); // Excluir respostas se o comentário pai for excluído
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('comments');
  }
};
