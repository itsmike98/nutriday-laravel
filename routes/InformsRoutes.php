<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InformsController;
use App\Http\Controllers\handleWeightController;

//? =================== GET REQUESTS ==================== !//

Route::get('/total-calories/inform', [InformsController::class, 'totalCalores'])->middleware(['auth', 'verified']);

Route::get('/weight-log', [handleWeightController::class, 'getWeightLog'])->middleware(['auth', 'verified']);



//? =================== POST REQUESTS ==================== !//

Route::post('/update-weight', [handleWeightController::class, 'updateWeight'])->middleware(['auth', 'verified']);
