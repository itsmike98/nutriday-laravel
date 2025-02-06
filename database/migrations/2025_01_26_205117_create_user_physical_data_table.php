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
        Schema::create('user_physical_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->float('height');
            $table->float('weight');
            $table->enum('activity_level', ['Sedentary', 'Lightly active', 'Moderately active', 'Very active', 'Extremely active']);
            $table->enum('main_goal', ['Lose weight', 'Maintain my current weight', 'Gain weight']);
            $table->boolean('questions_answered')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_physical_data');
    }
};
