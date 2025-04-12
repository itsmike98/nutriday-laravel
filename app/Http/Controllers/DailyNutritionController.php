<?php

namespace App\Http\Controllers;

use App\Models\Aliment;
use App\Models\daily_nutrition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Meal;

use Illuminate\Support\Facades\Auth;

class DailyNutritionController extends Controller
{
    public function getDailyNutrition($date)
    {
        $totals = $this->calculateNutrition($date);

        // Guardar los datos en la base de datos
        $this->storeData($totals, $date);

        return response()->json($totals);
    }


    //Obtener los datos de todos los alimentos y sumarlos
    public function calculateNutrition($date)
    {
        $userId = Auth::id();

        $todayMeals = Meal::where('user_id', $userId)
            ->whereDate("created_at", $date)
            ->with('aliments')
            ->get();


        if ($todayMeals->isEmpty()) {
            return response()->json(['error' => 'No se encontraron meals para la fecha especificada'], 404);
        }

        $totalNutritionData = [
            "calories" => 0.00,
            "carbs" => 0.00,
            "fat" => 0.00,
            "protein" => 0.00,
        ];

        foreach ($todayMeals as $meal) {
            foreach ($meal->aliments as $aliment) {
                $totalNutritionData["calories"] += floatval($aliment->pivot->calories ?? 0);
                $totalNutritionData["carbs"] += floatval($aliment->pivot->carbs ?? 0);
                $totalNutritionData["fat"] += floatval($aliment->pivot->fat ?? 0);
                $totalNutritionData["protein"] += floatval($aliment->pivot->protein ?? 0);

                // Log para depuración
                Log::info('Iteración de cálculo:', [
                    'date'  => $date,
                    'meal_id' => $meal->id,
                    'aliment_id' => $aliment->id,
                    'calories' => $aliment->pivot->calories,
                    'carbs' => $aliment->pivot->carbs,
                    'fat' => $aliment->pivot->fat,
                    'protein' => $aliment->pivot->protein,
                    'totalNutritionData' => $totalNutritionData,
                ]);
            }
        }

        return $totalNutritionData;
    }


    private function storeData($totals, $date)
    {

        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

        Log::info('storeData ejecutada para usuario ID ' . $user->id . ' en fecha ' . $date);

        // Asegurar que la fecha tenga el formato correcto (YYYY-MM-DD)
        $date = \Carbon\Carbon::parse($date)->format('Y-m-d');

        // Guardar o actualizar los datos de nutrición diaria
        daily_nutrition::updateOrCreate(
            [
                'user_id' => $user->id,
                'date' => $date, // Ahora está asegurado en el formato correcto
            ],
            [
                'total_calories' => $totals['calories'],
                'total_carbs' => $totals['carbs'],
                'total_fat' => $totals['fat'],
                'total_protein' => $totals['protein'],
            ]
        );
    }
}
