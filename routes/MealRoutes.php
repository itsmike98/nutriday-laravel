<?php

use Illuminate\Support\Facades\Route;
use App\Models\Meal;
use Illuminate\Http\Request;

// Ruta para obtener los datos de la tabla meal del usuario actual en un dia concreto
// http://nutriday.local/user-meals/2025-03-05
Route::get('/user-meals/{date}', function (Request $request, $date) {
    $user = $request->user(); // Obtiene el usuario autenticado

    if ($user) {
        $meals = Meal::where('user_id', $user->id)
        ->whereDate('created_at', $date)
        ->get(['user_id', 'meal_name']);
        return $meals;
    } else {
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

})->middleware(['auth', 'verified']);