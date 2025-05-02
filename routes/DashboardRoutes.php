<?php

use App\Http\Controllers\DailyNutritionController;
use App\Http\Controllers\FollowUp;
use App\Http\Controllers\RandomRecipeController;
use App\Http\Controllers\WaterHandlerController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

//? =================== GET REQUESTS ==================== !//

// ruta para las recetas aleatorias 
Route::get('/random-recipe', [RandomRecipeController::class, 'getRandomRecipe'])->middleware(['auth', 'verified']);

//obtener los totals de un dia
Route::get('daily-totals/{date}', [DailyNutritionController::class, 'getDailyTotals'])->middleware(['auth', 'verified']);

//obtener la frase del dia 
Route::get("/today-quote", [FollowUp::class, 'getQuote'])->middleware(['auth', 'verified']);

//? =================== POST REQUESTS ==================== !//

Route::post('/handle-water', [WaterHandlerController::class, 'storeWater'])->middleware(['auth', 'verified']);