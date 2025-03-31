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
        Schema::create('daily_nutrition', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('date')->unique();
            $table->integer('total_calories')->default(0);
            $table->decimal('total_carbs', 8, 2)->default(0);
            $table->decimal('total_protein', 8, 2)->default(0);
            $table->decimal('total_fat', 8, 2)->default(0);
            $table->decimal('total_fiber', 8, 2)->default(0);
            $table->decimal('total_sugar', 8, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_nutrition');
    }
};
