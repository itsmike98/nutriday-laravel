<?php

namespace App\Http\Controllers;

use App\Models\UserPhysicalData as ModelsUserPhysicalData;
use App\Models\User as ModelUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DateTime;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserPhysicalDataController extends Controller
{
    public function storeData(Request $request)
    {

        //Validar los datos Y decir que campos son obligatorios
        $request->validate([
            'birthYear' => 'required|string',
            'gender' => 'required|string',
            'height' => 'required|string',
            'weight' => 'required|string',
            'activityLevel' => 'required|string',
            'goal' => 'required|string',
        ]);

        // Verificar si el usuario está autenticado
        $userId = Auth::id();
        if (!$userId) {
            return response()->json(['mensaje' => 'Usuario no autenticado'], 401);
        }

        //Esto es equivalente a un insert en la base de datos:
        ModelsUserPhysicalData::create([
            'user_id' => $userId, // Agregar el ID del usuario autenticado
            'height' => $request->height,
            'weight' => $request->weight,
            'activity_level' => $request->activityLevel,
            'main_goal' => $request->goal,
            'questions_answered' => true,
        ]);


        // calcular la edad segun el año.
        $fechaNacimiento = new DateTime($request->birthYear); // Suponiendo que es '1995-06-15' (formato YYYY-MM-DD)
        $hoy = new DateTime(); // Fecha actual
        $edadString = $hoy->diff($fechaNacimiento)->y; // Calcula la diferencia en años

        $edad = intval($edadString);
        $weight = floatval($request->weight);
        $height = floatval($request->height);
        // Conversión de altura a metros para IMC
        $heightInMeters = $height / 100;

        $activiti_level = $request->activityLevel;
        $main_goal = $request->activityLevel;
        $approach = $request->approach;


        if (strcmp($request->gender, 'male') == 0) {
            // Calculo de la TMB con Harris-Benedict
            $tmbMaleHarris = (10 * $weight) + (6.25 * $height) - (5 * $edad) + 5;
            // Cálculo del IMC
            $imc = (float) number_format($weight / ($heightInMeters * $heightInMeters), 2);
            // Cálculo del porcentaje de grasa corporal
            $corporalFat = (float) number_format((1.20 * $imc) + (0.23 * $edad) - (10.8 * 1) - 5.4, 2);
            // Cálculo de la Masa Magra (peso sin grasa)
            $leanMass = (float) number_format($weight * (1 - ($corporalFat / 100)), 2);
            // Cálculo de la TMB con Katch-McArdle (usando masa magra)
            $tmbMaleKatch = 370 + (21.6 * $leanMass);
            // Promedio de ambas TMB
            $tmbAvg = intval(($tmbMaleHarris + $tmbMaleKatch) / 2);

            switch ($activiti_level) {
                case "Sedentary":
                    $caloriesActLvl = $tmbAvg * 1.2;
                    break;
                case "Lightly active":
                    $caloriesActLvl = $tmbAvg * 1.375;
                    break;
                case "Moderately active":
                    $caloriesActLvl = $tmbAvg * 1.55;
                    break;
                case "Very active":
                    $caloriesActLvl = $tmbAvg * 1.725;
                    break;
                case "Extremely active":
                    $caloriesActLvl = $tmbAvg * 1.9;
                    break;
            }

            //Buscar la manera de transferir datos desde aqui a la vista:
            switch ($main_goal) {
                case 'Lose weight':
                    if ($approach == 'Aggressive') {
                        $finalCalories = $caloriesActLvl * 0.75;
                        return Inertia::render('initial_questions/questions', [
                            'finalCalories' => $finalCalories
                        ]);
                    } else {
                        $finalCalories = $caloriesActLvl * 0.85;
                        return Inertia::render('initial_questions/questions', [
                            'finalCalories' => $finalCalories
                        ]);
                    }
                    break;
                case 'Maintain my current weight':
                    return Inertia::render('initial_questions/questions', [
                        'finalCalories' => $caloriesActLvl
                    ]);
                    break;
                case 'Gain weight':
                    if ($approach == 'Aggressive') {
                        $finalCalories = $caloriesActLvl * 1.25;
                        return Inertia::render('initial_questions/questions', [
                            'finalCalories' => $finalCalories
                        ]);
                    } else {
                        $finalCalories = $caloriesActLvl * 1.15;
                        return Inertia::render('initial_questions/questions', [
                            'finalCalories' => $finalCalories
                        ]);
                    }
                    break;
            }
        } elseif (strcmp($request->gender, 'female') == 0) {
            // Calculo de la TMB con Harris-Benedict
            $tmbFemaleHarris = (10 * $weight) + (6.25 * $height) - (5 * $edad) - 161;
            // Cálculo del IMC
            $imc = (float) number_format($weight / ($heightInMeters * $heightInMeters), 2);
            // Cálculo del porcentaje de grasa corporal
            $corporalFat = (float) number_format((1.20 * $imc) + (0.23 * $edad) - (10.8 * 2) - 5.4, 2);
            // Cálculo de la Masa Magra (peso sin grasa)
            $leanMass = (float) number_format($weight * (1 - ($corporalFat / 100)), 2);
            // Cálculo de la TMB con Katch-McArdle (usando masa magra)
            $tmbMaleKatch = 370 + (21.6 * $leanMass);
            // Promedio de ambas TMB
            $tmbAvg = intval(($tmbFemaleHarris + $tmbMaleKatch) / 2);
        } else {
            Log::info('Esto es el else nen');
        }

        // Imprimir el año en los logs del servidor, esto es como un console.log(). pero tiene que ir a laravel.log.
        // Log::info('Año de nacimientosdfsf:', ['birthYear' => $request->birthYear]);
        // Log::info('Edad calculadsdfsdfa:', ['edad' => $edad]);

        // Guardar bith year y gender en la tabla User. 
        $user = ModelUser::find($userId);
        if ($user) {
            // Verificar los datos del request
            if (isset($request['birthYear']) && isset($request['gender'])) {
                $user->update([
                    'birth_year' => $request['birthYear'],
                    'gender' => $request['gender'],
                ]);
                return response()->json(['mensaje' => 'Datos guardados correctamente']);
            } else {
                return response()->json(['mensaje' => 'Datos de birthYear o gender no encontrados'], 400);
            }
        } else {
            return response()->json(['mensaje' => 'Usuario no encontrado'], 404);
        }
    }
}
