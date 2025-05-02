<?php

namespace App\Http\Controllers;

use App\Models\daily_nutrition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InformsController extends Controller
{
    public function totalCalores(){
        $totalCalories = 0;

        $user = Auth::user()->id;

        $dailyNutritionDb = daily_nutrition::where('user_id', $user)
            ->where('total_calories', '>', 0)
            ->orderBy('date', 'desc') // ordenar por fecha descendente
            ->take(15)
            ->orderBy('date', 'asc')  // volver a ordenarlos en orden ascendente
            ->get();

    
        // Obtener los últimos 15 registros
        $lastDays = $dailyNutritionDb->reverse()->take(15)->reverse(); 
        
        return $lastDays->values();
    
    }
}
