<?php

namespace App\Http\Controllers;

use App\Models\Aliment;
use Illuminate\Http\Request;

class DailyNutritionController extends Controller
{
    public function getDailyNutrition($date)
    {   
        $totals = $this->calculateNutrition($date);

        return $totals;
    }

    //Obtener los datos de todos los alimentos y subarlos
    public function calculateNutrition($date){
        $todayAliments = Aliment::whereDate("created_at", $date)->get();
        $totalNutritionData = [
            "calories" => 0,
            "carbs" => 0,
            "fat" => 0,
            "protein" => 0,
        ];
        foreach ($todayAliments as $aliment) {
            $totalNutritionData["calories"] += $aliment->calories;
            $totalNutritionData["carbs"] += $aliment->carbs;
            $totalNutritionData["fat"] += $aliment->fat;
            $totalNutritionData["protein"] += $aliment->protein;
        }
        return $totalNutritionData;
    }
}
