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
        Schema::create('nutrition_goals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Relación 1:1 con usuarios
            $table->integer('calories')->nullable();
            $table->decimal('carbohydrates', 8, 2)->nullable();
            $table->decimal('proteins', 8, 2)->nullable();
            $table->decimal('fats', 8, 2)->nullable();
            $table->decimal('fiber', 8, 2)->nullable();
            $table->decimal('sugar', 8, 2)->nullable();
            $table->decimal('sodium', 8, 2)->nullable();
            $table->decimal('potassium', 8, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nutrition_goals');
    }
};
