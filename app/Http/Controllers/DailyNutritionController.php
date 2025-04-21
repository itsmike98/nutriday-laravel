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

        if (is_null($totals)) {
            $newDailyLog = $this->createDailyTotal($date);
            if ($newDailyLog) {
                return response()->json(['success' => 'Se ha creado un nuevo registro diario.']);
            }
            return response()->json(['error' => 'No se ha podido crear el nuevo registro diario.'], 401);
        }

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
            return null;
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
            }
        }
        return $totalNutritionData;
    }

    //Almacenar la informacion
    private function storeData($totals, $date)
    {

        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

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

    //si el daily de la fecha especificada no existe, se crea automaticamente.
    public function createDailyTotal($date)
    {
        $user = Auth::user();

        $created = daily_nutrition::create(
            [
                'user_id' => $user->id,
                'date' => $date,
                'total_calories' => 0,
                'total_carbs' => 0,
                'total_fat' => 0,
                'total_protein' => 0,
            ]
        );

        return $created ? true : false;
    }

    //obtener todas las columnas de el daily nutrition con la fecha especificada.
    public function getDailyTotals($date)
    {
        $user = Auth::user();

        $dbDailyNutrition = daily_nutrition::where('user_id', $user->id)->where('date', $date)->first();

        if($dbDailyNutrition){
        return response()->json($dbDailyNutrition);
        }
        return response()->json(['error', 'No se ha encontrado ningun daily_nutrition de el dia de hoy.']);
    }
}
