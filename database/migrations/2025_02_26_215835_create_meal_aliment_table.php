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
        Schema::create('meal_aliment', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('meal_id');
            $table->unsignedBigInteger('aliment_id');
            
            $table->foreign('meal_id')->references('id')->on('meal')->onDelete('cascade');
            $table->foreign('aliment_id')->references('id')->on('aliment')->onDelete('cascade');
        
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meal_aliment');
    }
};
