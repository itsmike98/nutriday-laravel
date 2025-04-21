<?php

namespace App\Http\Controllers;

use App\Models\daily_nutrition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WaterHandlerController extends Controller
{
    public function storeWater(Request $request){
        $request->validate([
            'newCuantity' => 'required|numeric'
        ]);

    $current_date = date("Y-m-d");
    
    $userId = Auth::id();

    $db_daily_nutrition = daily_nutrition::where('date', $current_date)->where('user_id', $userId)->first();

    if($db_daily_nutrition){
        $db_daily_nutrition->total_water = $request->newCuantity;
        $db_daily_nutrition->save();
    }

    return $db_daily_nutrition->total_water;
    }
};
