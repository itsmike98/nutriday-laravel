<?php

namespace App\Http\Controllers;

use App\Models\UserPhysicalData as ModelsUserPhysicalData;
use App\Models\User as ModelUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DateTime;
use Illuminate\Support\Facades\Log;

class UserPhysicalDataController extends Controller
{
    public function storeData(Request $request){

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
        $fechaNacimiento = new DateTime($request->birthYear);// Suponiendo que es '1995-06-15' (formato YYYY-MM-DD)
        $hoy = new DateTime(); // Fecha actual
        $edad = $hoy->diff($fechaNacimiento)->y; // Calcula la diferencia en años

        if (strcmp($request->gender, 'male') == 0) {
            // Calculo de la TMB con Harris-Benedict
            $tmbMaleHarris = (10 * floatval($request->weight)) + (6.25 * floatval($request->height)) - (5 * intval($edad)) + 5;
        
            // Conversión de altura a metros para IMC
            $heightInMeters = floatval($request->height) / 100;
        
            // Cálculo del IMC
            $imc = floatval($request->weight) / ($heightInMeters * $heightInMeters);
        
            // Cálculo del porcentaje de grasa corporal
            $corporalFat = (1.2 * $imc) + (0.23 * intval($edad)) - (10.8 * 1) - 5.4;
        
            // Cálculo de la Masa Magra (peso sin grasa)
            $leanMass = floatval($request->weight) * (1 - ($corporalFat / 100));
        
            // Cálculo de la TMB con Katch-McArdle (usando masa magra)
            $tmbMaleKatch = 370 + (21.6 * $leanMass);
        
            // Promedio de ambas TMB
            $tmbAvg = ($tmbMaleHarris + $tmbMaleKatch) / 2;
        
        } elseif(strcmp($request->gender, 'female') == 0) {
            // Calculo de la TMB con Harris-Benedict
            $tmbMaleHarris = (10 * floatval($request->weight)) + (6.25 * floatval($request->height)) - (5 * intval($edad)) - 161;
            // Conversión de altura a metros para IMC
            $heightInMeters = floatval($request->height) / 100;
            // Cálculo del IMC
            $imc = floatval($request->weight) / ($heightInMeters * $heightInMeters);
            // Cálculo del porcentaje de grasa corporal
            $corporalFat = (1.2 * $imc) + (0.23 * intval($edad)) - (10.8 * 2) - 5.4;
            // Cálculo de la Masa Magra (peso sin grasa)
            $leanMass = floatval($request->weight) * (1 - ($corporalFat / 100));
            // Cálculo de la TMB con Katch-McArdle (usando masa magra)
            $tmbMaleKatch = 370 + (21.6 * $leanMass);
            // Promedio de ambas TMB
            $tmbAvg = ($tmbMaleHarris + $tmbMaleKatch) / 2;

            // Logs para verificar valores
            Log::info('tmbHarris: ', ['value' => $tmbMaleHarris]);
            Log::info('IMC: ', ['value' => $imc]);
            Log::info('Porcentaje de grasa corporal: ', ['value' => $corporalFat]);
            Log::info('Masa magra: ', ['value' => $leanMass]);
            Log::info('tmbKatch: ', ['value' => $tmbMaleKatch]);
            Log::info('Promedio TMB: ', ['value' => $tmbAvg]);
        } else{
            Log::info('Esto es el else nen');
        }
        
        
        // elseif (strcmp($request->gender, 'Famale') == 0) {
        //     $mbFamale = (10 * intval($request->weight)) + (6.25 * intval($request->height)) - (5 * intval($edad)) - 161;
        // }



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