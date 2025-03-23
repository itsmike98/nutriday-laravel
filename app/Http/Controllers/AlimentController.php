<?php

namespace App\Http\Controllers;

use App\Models\Aliment;
use Illuminate\Http\Request;
use App\Models\Meal;

class AlimentController extends Controller
{
    public function storeAliment(Request $request)
    {
        $request->validate([
            'meal_id' => 'required|numeric',
            'aliment_id' => 'required|numeric',
            'aliment_serving_id' => 'required|numeric',
            'aliment_serving_amount' => 'required|string',
        ]);

        // Buscar el meal en la BD
        $dbMeal = Meal::find($request->meal_id);

        if (!$dbMeal) {
            return response()->json(['error' => 'Meal no encontrado'], 404);
        }

        // Buscar el alimento en la BD
        $dbAliment = Aliment::where('aliment_id', $request->aliment_id)->first();

        if (!$dbAliment) {
            // Si el alimento no existe, lo creamos
            $dbAliment = new Aliment();
            $dbAliment->aliment_id = $request->aliment_id;
            $dbAliment->aliment_serving_id = $request->aliment_serving_id;
            $dbAliment->aliment_serving_amount = $request->aliment_serving_amount;
            $dbAliment->save();
        }

        // Crear la relación en la tabla intermedia meal_aliment
        $dbMeal->aliments()->attach($dbAliment->id);

        return response()->json(['message' => 'Aliment creado correctamente'], 201);
    }

    public function deleteAliment(Request $request)
    {
        // Validar los datos recibidos
        $request->validate([
            'meal_id' => 'required|numeric',
            'aliment_id' => 'required|numeric',
        ]);

        // Buscar el meal
        $meal = Meal::findOrFail($request->meal_id);

        $dbAliment = Aliment::where('aliment_id', $request->aliment_id)->first();

        // Eliminar la relación (suponiendo una relación Many-to-Many en la tabla pivot)
        $meal->aliments()->detach($dbAliment->id);

        return response()->json([
            'message' => 'Alimento eliminado del meal con éxito.'
        ], 200);
    }
}
