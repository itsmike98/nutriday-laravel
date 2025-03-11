<?php

use Illuminate\Support\Facades\Route;
use App\Models\Meal;
use Illuminate\Http\Request;

// Ruta para obtener los datos de la tabla meal del usuario actual en un dia concreto
// http://nutriday.local/user-meals/2025-03-05
Route::get('/user-meals/{data}', function (Request $request, $data) {
    $user = $request->user(); // Obtiene el usuario autenticado

    $formatData = explode(" ", $data);

    if ($user) {
        if (isset($formatData[0])) { // Verifica si $formatData tiene al menos un elemento
            $meals = Meal::where('user_id', $user->id)
                         ->whereDate('created_at', $formatData[0]) // Usa whereDate()
                         ->get(['user_id', 'meal_name']);
            return $meals;
        } else {
            return response()->json(['error' => 'Formato de fecha incorrecto'], 400); // Devuelve un error si el formato es incorrecto
        }
    } else {
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

})->middleware(['auth', 'verified']);