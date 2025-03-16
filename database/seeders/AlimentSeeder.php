<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Aliment;
use App\Models\Meal;
use App\Models\User;

class AlimentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Definir los aliments
        $aliments = [
            ['aliment_name' => 'patatas', 'aliment_serving_amount' => 300.8],
            ['aliment_name' => 'hamburguesa', 'aliment_serving_amount' => 5.1],
            ['aliment_name' => 'pollamen', 'aliment_serving_amount' => 10.2],
            ['aliment_name' => 'albaricoque', 'aliment_serving_amount' => 20],
        ];

        // Crear o actualizar los aliments en la base de datos
        foreach ($aliments as $alimentData) {
            Aliment::updateOrCreate(
                ['aliment_name' => $alimentData['aliment_name']],
                ['aliment_serving_amount' => $alimentData['aliment_serving_amount']]
            );
        }

        // Obtener todos los aliments
        $allAliments = Aliment::all();

        // Asociar alimentos a meals de cada usuario
        $users = User::all();
        foreach ($users as $user) {
            // Obtener los meals del usuario
            $meals = Meal::where('user_id', $user->id)->get();

            foreach ($meals as $meal) {
                // Asociar aleatoriamente 2 aliments a cada meal
                $meal->aliments()->syncWithoutDetaching($allAliments->random(2)->pluck('id')->toArray());
            }
        }
    }
}
