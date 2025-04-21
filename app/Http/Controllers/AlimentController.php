<?php

namespace App\Http\Controllers;

use App\Models\Aliment;
use Illuminate\Http\Request;
use App\Models\Meal;
use Illuminate\Support\Facades\Log;

class AlimentController extends Controller
{

    //todo: La funcion storeAliment ya funciona correctamente con la nueva configuracion de la base de datos.
    //todo: Ahora se tiene que mirar de corregir el controller que lleva la logica de calcular los datos de el alimento
    public function storeAliment(Request $request)
    {
        $request->validate([
            'meal_id' => 'required|numeric',
            'aliment_id' => 'required|numeric',
            'aliment_name' => 'required|string',
            'aliment_serving_id' => 'required|numeric',
            'aliment_serving_amount' => 'required|numeric',
            'metric_serving_amount' => 'required|numeric',
            'calories' => 'required|numeric',
            'carbs' => 'required|numeric',
            'fat' => 'required|numeric',
            'protein' => 'required|numeric',
        ]);

        //Calcular cuanto se esta consumiendo de cada macronutriente
        function calculateNutritionalData($valor_nutricional_por_porcion, $cantidad_consumida, $metric_serving_amount)
        {
            return ($valor_nutricional_por_porcion * $cantidad_consumida) / $metric_serving_amount;
        }

        $calories = calculateNutritionalData($request->calories, $request->aliment_serving_amount, $request->metric_serving_amount);
        $protein = calculateNutritionalData($request->protein, $request->aliment_serving_amount, $request->metric_serving_amount);
        $carbs = calculateNutritionalData($request->carbs, $request->aliment_serving_amount, $request->metric_serving_amount);
        $fat = calculateNutritionalData($request->fat, $request->aliment_serving_amount, $request->metric_serving_amount);

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
            $dbAliment->aliment_name = $request->aliment_name;
            $dbAliment->save();
        }

        // Crear la relación en la tabla intermedia meal_aliment
        $dbMeal->aliments()->attach($dbAliment->id, [
            'serving_amount' => $request->aliment_serving_amount,
            'aliment_serving_id' => $request->aliment_serving_id,
            'calories' => round($calories, 2),
            'carbs' => round($carbs, 2),
            'fat' => round($fat, 2),
            'protein' => round($protein, 2),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Aliment creado correctamente'], 201);
    }

    public function deleteAliment(Request $request)
{
    // Validar los datos recibidos
    $validatedData = $request->validate([
        'meal_id' => 'required|numeric',
        'aliment_id' => 'required|numeric',
    ]);

    Log::error('Datos recibidos para eliminar alimento:', $validatedData);

    // Buscar el meal
    $meal = Meal::find($request->meal_id);
    if (!$meal) {
        return response()->json(['error' => 'Meal no encontrado'], 404);
    }

    // Buscar el alimento en la BD
    $dbAliment = Aliment::where('id', $request->aliment_id)->first();
    if (!$dbAliment) {
        return response()->json(['error' => 'Aliment no encontrado'], 404);
    }

    // Verificar si la relación existe antes de eliminar
    // Specify the table explicitly to avoid ambiguity
    if ($meal->aliments()->where('meal_aliment.aliment_id', $dbAliment->id)->exists()) {
        $meal->aliments()->detach($dbAliment->id);
        return response()->json(['message' => 'Alimento eliminado del meal con éxito.'], 200);
    } else {
        return response()->json(['error' => 'El alimento no está asociado a este meal.'], 400);
    }
}

}
