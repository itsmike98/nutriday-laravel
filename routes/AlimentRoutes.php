<?php

use App\Http\Controllers\FatSecretAuthController;
use App\Models\Meal;
use Illuminate\Support\Facades\Route;

Route::get('/meals/{meal}/aliments', function (Meal $meal) {
    return response()->json($meal->aliments);
})->middleware(['auth', 'verified']);

Route::get('/aliment/{aliment}', [FatSecretAuthController::class, 'apiRequestHandler'])->middleware(['auth', 'verified']);

// Route::post('/save-aliment', [])
Route::post('/guardar-datos', [UserPhysicalDataController::class, 'storeData']);
