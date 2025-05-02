<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InformsController;


Route::get('/total-calories/inform', [InformsController::class, 'totalCalores'])->middleware(['auth', 'verified']);
