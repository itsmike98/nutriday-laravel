<?php

namespace App\Http\Controllers;

use App\Models\UserPhysicalData;
use App\Models\weight_log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use function Pest\Laravel\json;

class handleWeightController extends Controller
{
    public function updateWeight(Request $request){
        $request->validate([
            'newWeight' => 'required|numeric|min:0',
        ]);

        $user = Auth::user()->id;
        $physicalDataDb = UserPhysicalData::where("user_id", $user)->first();

        if (!$physicalDataDb) {
            return redirect()->back()->with('error', 'User physical data not found.');
        }
        
        $physicalDataDb->weight = $request->input('newWeight');
        $physicalDataDb->save();

        DB::table('weight_log')->insert([
            'user_id' => $user,
            'weight' => $request->input('newWeight'),
            'created_at' => now(),
            'updated_at' => now()
        ]);

        return redirect()->back()->with('success', 'Weight updated successfully.');
    }

    public function getWeightLog(){
        $user = Auth::user()->id;
        $weightLogDb = weight_log::where('user_id', $user)
            ->orderBy('created_at', 'desc')
            ->take(15)
            ->get();

        return response()->json([
            'weightLog' => $weightLogDb
        ]);
    }
}