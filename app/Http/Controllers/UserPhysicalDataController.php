<?php

namespace App\Http\Controllers;

use App\Models\UserPhysicalData;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DateTime;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserPhysicalDataController extends Controller
{
    public function storeData(Request $request)
    {
        // Validar datos
        $validatedData = $this->validateRequest($request);
        Log::info("Datos validados: ", $validatedData);

        // Obtener usuario autenticado
        $userId = Auth::id();
        if (!$userId) {
            return response()->json(['mensaje' => 'Usuario no autenticado'], 401);
        }

        Log::info("Usuario autenticado con ID: $userId");

        $calculatedData = $this->calculateAndRespond($validatedData, $userId);
        Log::info("Datos calculados: ", $calculatedData);

        // Guardar datos físicos del usuario
        $this->saveUserPhysicalData($userId, $validatedData, $calculatedData);
        Log::info("Datos guardados en la base de datos correctamente.");

        // Calcular calorías y devolver la vista con los datos
        return response()->json([
            'success' => true,
            'finalCalories' => $calculatedData,
        ]);
    }

    private function validateRequest(Request $request)
    {
        return $request->validate([
            'birthYear' => 'required|string',
            'gender' => 'required|string',
            'height' => 'required|string',
            'weight' => 'required|string',
            'activityLevel' => 'required|string',
            'goal' => 'required|string',
            'approach' => 'nullable|string',
        ]);
    }

    private function saveUserPhysicalData($userId, $data, $calculatedData)
    {
        UserPhysicalData::create([
            'user_id' => $userId,
            'height' => $data['height'],
            'weight' => $data['weight'],
            'activity_level' => $data['activityLevel'],
            'main_goal' => $data['goal'],
            'approach' => $data['approach'],
            'questions_answered' => true,
            'daily_caloric_intake' => $calculatedData['finalCalories'],
            'body_fat' => $calculatedData['fatPercentage'],
            'bmi' => $calculatedData['imc'],
            'tmb' => $calculatedData['tmb'],
        ]);

        // Guardar birthYear y gender en la tabla User
        $user = User::find($userId);
        if ($user) {
            $user->update([
                'birth_year' => $data['birthYear'],
                'gender' => $data['gender'],
            ]);
        }
    }

    private function calculateAndRespond($data)
    {
        $edad = $this->calculateAge($data['birthYear']);
        $weight = floatval($data['weight']);
        $height = floatval($data['height']);

        $tmbData = $this->calculateTMB($data['gender'], $weight, $height, $edad);
        $caloriesActLvl = $this->applyActivityLevel($tmbData['tmb'], $data['activityLevel']);
        $finalCalories = $this->applyGoalAndApproach($caloriesActLvl, $data['goal'], $data['approach']);

        return [
            'fatPercentage' => round($tmbData['fatPercentage'], 1),
            'imc' => round($tmbData['imc'], 1),
            'tmb' => round($tmbData['tmb']),
            'finalCalories' => round($finalCalories),
        ];
    }

    private function calculateAge($birthYear)
    {
        $birthDate = new DateTime($birthYear);
        $today = new DateTime();
        return $today->diff($birthDate)->y;
    }

    private function calculateTMB($gender, $weight, $height, $edad)
    {
        if ($gender == 'male') {
            $tmbHarris = (10 * $weight) + (6.25 * $height) - (5 * $edad) + 5;
        } else {
            $tmbHarris = (10 * $weight) + (6.25 * $height) - (5 * $edad) - 161;
        }

        $imc = $weight / (($height / 100) ** 2);
        $corporalFat = (1.20 * $imc) + (0.23 * $edad) - (10.8 * ($gender == 'male' ? 1 : 0)) - 5.4;
        $leanMass = $weight * (1 - ($corporalFat / 100));
        $tmbKatch = 370 + (21.6 * $leanMass);

        $corporalData = [
            'fatPercentage' => $corporalFat,
            'imc' => $imc,
            'tmb' => ($tmbHarris + $tmbKatch) / 2,
        ];

        return $corporalData;
    }

    private function applyActivityLevel($tmb, $activityLevel)
    {
        $activityMultipliers = [
            "Sedentary" => 1.2,
            "Lightly active" => 1.375,
            "Moderately active" => 1.55,
            "Very active" => 1.725,
            "Extremely active" => 1.9,
        ];
        return $tmb * ($activityMultipliers[$activityLevel] ?? 1.2);
    }

    private function applyGoalAndApproach($caloriesActLvl, $goal, $approach)
    {
        $modifiers = [
            'Lose weight' => $approach === 'Aggressive' ? 0.75 : 0.85,
            'Maintain my current weight' => 1.0,
            'Gain weight' => $approach === 'Aggressive' ? 1.25 : 1.15,
        ];
        return $caloriesActLvl * ($modifiers[$goal] ?? 1.0);
    }
}
