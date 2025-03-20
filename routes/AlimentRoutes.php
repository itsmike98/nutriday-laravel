<?php

use App\Http\Controllers\FatSecretAuthController;
use App\Models\Meal;
use Illuminate\Support\Facades\Route;

Route::get('/meals/{meal}/aliments', function (Meal $meal) {
    return response()->json($meal->aliments);
})->middleware(['auth', 'verified']);

Route::get('/aliment/{aliment}', [FatSecretAuthController::class, 'apiRequestHandler'])->middleware(['auth', 'verified']);