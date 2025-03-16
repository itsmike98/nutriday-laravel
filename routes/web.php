<?php

//controllers

use App\Http\Controllers\AlimentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserPhysicalDataController;
use App\Models\Aliment;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/test', [UserPhysicalDataController::class, 'prueba']);


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

Route::get('/aliment', [AlimentController::class, 'index'])->middleware(['auth', 'verified'])->name('aliment');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/MealRoutes.php';
require __DIR__ . '/AlimentRoutes.php';