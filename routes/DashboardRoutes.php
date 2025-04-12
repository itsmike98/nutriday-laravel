<?php

use App\Http\Controllers\RandomRecipeController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

//? =================== GET REQUESTS ==================== !//

// ruta para las recetas aleatorias 
Route::get('/random-recipe', [RandomRecipeController::class, 'getRandomRecipe'])->middleware(['auth', 'verified']);

//? =================== POST REQUESTS ==================== !//
