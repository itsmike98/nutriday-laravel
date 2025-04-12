<?php

//controllers

use App\Http\Controllers\FoodLogController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserPhysicalDataController;
use App\Models\Aliment;
use App\Models\nutrition_goals;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Models\UserPhysicalData;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


// ruta para la landing page
Route::get('/', function () {
    return Inertia::render('landing', [
        // enlaces a los que se podra acceder desde la landing
        'loginRoute' => route('login'),
        'registerRoute' => route('register'),
    ]);
});


//Ruta para las preguntas iniciales
Route::get('/survey', function () {
    return Inertia::render('initial_questions/survey');
})->middleware(['auth', 'verified'])->name('survey');


//Aqui se recuperan los datos fisicos despues de contestar las preguntas iniciales y se envian al controller.
//Cambiar nombre ruta...
Route::post('/guardar-datos', [UserPhysicalDataController::class, 'storeData']);


//Dashboard inicial
Route::get('/dashboard', function () {
    $user = Auth::user();
    if ($user) {
        $physicalData = $user->physicalData;

        // Verificar si physicalData es null o si questions_answered es 0
        if (is_null($physicalData) || $physicalData->questions_answered == 0) {
            return redirect()->route('survey');
        }
    }
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard'); //este middleware verifica que el usuario este autenticado

Route::get('/food-log', [FoodLogController::class, 'index'])->middleware(['auth', 'verified'])->name('food-log');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('user-data', function () {
    $userData = UserPhysicalData::where('user_id', Auth::id())->first();
    if ($userData) {
        return response()->json($userData);
    } else {
        return response()->json(['error' => 'No se encontraron datos físicos para el usuario'], 404);
    }
});

Route::get('user-data-nutrition', function () {
    $nutritionData = nutrition_goals::where('user_id', Auth::id())->first();
    if ($nutritionData) {
        return response()->json($nutritionData);
    } else {
        return response()->json(['error' => 'No se encontraron datos de nutrición para el usuario'], 404);
    }
});


require __DIR__ . '/auth.php';
require __DIR__ . '/MealRoutes.php';
require __DIR__ . '/AlimentRoutes.php';
require __DIR__ . '/DashboardRoutes.php';