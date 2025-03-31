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
        // Schema::create('aliment', function (Blueprint $table) {
        //     $table->id();
        //     $table->integer('aliment_id');
        //     $table->integer('aliment_serving_id');
        //     $table->string('aliment_serving_amount');
        //     $table->timestamps();
        // });

        Schema::create('aliment', function (Blueprint $table) {
            $table->id();
            $table->integer('aliment_id');
            $table->string('aliment_name');
            $table->integer('aliment_serving_id');
            $table->float('aliment_serving_amount');
            $table->float('calories');
            $table->float('carbs');
            $table->float('fat');
            $table->float('protein');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aliment');
    }
};