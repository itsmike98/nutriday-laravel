<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Meal;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FoodLogController extends Controller
{
    public function index()
    {
        //obtenermos el usuario actual
        $user = Auth::user();

        // Realizar las comprobaciones en la base de datos y crea meal diario.
        $this->saveData($user, $this->getLastMeal($user));

        return Inertia::render('Food_log/FoodLog');
    }

    //funcion para repetir el meals del ultimo dia.
    private function getLastMeal($user){
        //Obtener la fecha actual, hay que formateat con ->format('Y/m/d') al usarla
        $currentDate = Carbon::now();

        //consulta para saber los meals del dia de hoy
        $todayLogs = Meal::where('user_id', $user->id)
        ->whereDate('created_at', $currentDate->format('Y/m/d'))
        ->get(['meal_name', 'created_at']);

        //si HOY no hay ningun meal...
        if($todayLogs->isEmpty()){
            $foundMeals = false; // Bandera para saber si encontramos algún día con meals
            for ($i = 1; $i <= 5; $i++) {
                $minDate = $currentDate->copy()->subDays($i);
    
                $findingMeal = Meal::where('user_id', $user->id)
                ->whereDate('created_at', $minDate->format('Y/m/d'))
                ->get(['meal_name', 'created_at']);
    
                //si encuentra el dia que tiene registros...
                if (!$findingMeal->isEmpty()) {
                    //creamos array con los nombres de los meals
                    $lastMeals = [];
                    foreach ($findingMeal as $meal) {
                        array_push($lastMeals, $meal->meal_name);
                    }
                    $this->fillEmptyMeals($user, $i, $minDate, $lastMeals);
                    $i = 5;
                    $foundMeals = true;
                    return($lastMeals);                    
                }
            }
            // Si después de revisar los 5 días no encontramos ningún meal...
            if (!$foundMeals) {
                $defaultMeals = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];
                $firstDate = $currentDate->copy()->subDays(6);
                $this->fillEmptyMeals($user, 7, $firstDate, $defaultMeals);
            }
        }
    }

    private function fillEmptyMeals($user, $index, $day, $lastMeals){
        $index = $index - 1;
        $day = $day->addDays(1);
        for ($index ; $index >= 1; $index--) {
            $this->saveData($user, $lastMeals, $day);
            $day = $day->addDays(1);
        }
    }

    private function saveData($user, $data, $date = null) {
        // Si no se pasa una fecha, usamos la fecha actual
        $date = $date ?? now();

        if (!is_array($data)) {
            $data = []; // Evita errores si $data es null
        }
    
        $mealsToInsert = [];
    
        foreach ($data as $meal) {
            $mealsToInsert[] = [
                'user_id'   => $user->id,
                'meal_name' => $meal,
                'created_at' => $date,
                'updated_at' => $date
            ];
        }
    
        if (!empty($mealsToInsert)) { // Evita inserciones vacías
            Meal::insert($mealsToInsert);
        }
    }
    
}