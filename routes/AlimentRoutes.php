<?php

use App\Http\Controllers\AlimentController;
use App\Http\Controllers\FatSecretRequestsController;
use App\Models\Meal;
use Illuminate\Support\Facades\Route;

//? =================== GET REQUESTS ==================== !//

//Obtener alimentos de un meal concreto con el id del meal
Route::get('/meals/{meal}/aliments', function (Meal $meal) {
    return response()->json($meal->aliments);
})->middleware(['auth', 'verified']);

//Busqueda de alimento por nombre
Route::get('/aliment/{aliment}', [FatSecretRequestsController::class, 'getAlimentsByName'])->middleware(['auth', 'verified']);

//Busqueda de alimento por id
Route::get('/aliment/id/{id}', [FatSecretRequestsController::class, 'getAlimentById'])->middleware(['auth', 'verified']);


//? =================== POST REQUESTS ==================== !//

//Almacenar un alimento en la base de datos
Route::post('/store-aliment', [AlimentController::class, 'storeAliment']);

//Eliminar un alimento de la base de datos
Route::post('/delete-aliment', [AlimentController::class, 'DeleteAliment']);