<?php

use App\Http\Controllers\FatSecretAuthController;
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
                         ->get(['id' ,'user_id', 'meal_name']);
            return $meals;
        } else {
            return response()->json(['error' => 'Formato de fecha incorrecto'], 400); // Devuelve un error si el formato es incorrecto
        }
    } else {
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

})->middleware(['auth', 'verified']);


//Ruta para añadir un nuevo meal a la base de datos
Route::post('/new-meal', function (Request $request) {
    $request->validate([
        'meal_name' => 'required|string|max:255'
    ]);

    $mealDB = new Meal();
    $mealDB->user_id = $request->user()->id;
    $mealDB->meal_name = $request->input('meal_name');
    $mealDB->save();

    print_r("Meal saved into the database correctly.");
})->middleware(['auth', 'verified']);

//Ruta para eliminar un meal concreto de la base de datos
//Al eliminar un meal tambien se tendran que eliminar los registros de la tabla de meal-aliment asociados a ese meal
Route::post('/delete-meal', function(Request $request){
    $request->validate([
        'meal_id' => 'required|integer'
    ]);

    $deletedMeal = Meal::where('id', $request->get('meal_id'))->delete();

    return "Funciona!";
})->middleware(['auth', 'verified']);

//Ruta para cambiar nombre a un meal concreto de la base de datos
Route::post('/change-meal-name', function(Request $request){
    $request->validate([
        'meal_id' => 'required|integer',
        'meal_name' => 'required|string'
    ]);

    $mealToChange = Meal::where('id', $request->get('meal_id'))->first();

    if($mealToChange){
        $mealToChange->meal_name = $request->input('meal_name');
        $mealToChange->save();
        return response()->json(['message' => 'Meal name updated successfully'], 200);
    } else {
        return response()->json(['error' => 'Meal not found'], 404);
    }
})->middleware(['auth', 'verified']);