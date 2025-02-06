<?php

namespace App\Http\Controllers;

use App\Models\UserPhysicalData as ModelsUserPhysicalData;
use App\Models\User as ModelUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserPhysicalDataController extends Controller
{
// // calcular la edad segun el año.
// $fechaNacimiento = new DateTime($request->birthYear);// Suponiendo que es '1995-06-15' (formato YYYY-MM-DD)
// $hoy = new DateTime(); // Fecha actual
// $edad = $hoy->diff($fechaNacimiento)->y; // Calcula la diferencia en años

 //Calculo tasa metabolica basal: NO TERMINADO FALTA LA EDAD.
//     // $tmb = 66.4730 + (13.7516 * intval($request->weight)) + (5.0033 * intval($request->height)) - (6.7550 * )

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
