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
            ['aliment_id' => 4501, 'aliment_name' => 'Bread', 'aliment_serving_amount' => '300.8'],
            ['aliment_id' => 3422, 'aliment_serving_amount' => '5.1'],
            ['aliment_id' => 35755, 'aliment_serving_amount' => '10.2'],
            ['aliment_id' => 35718, 'aliment_serving_amount' => '20'],
        ];

        // Crear o actualizar los aliments en la base de datos
        foreach ($aliments as $alimentData) {
            Aliment::updateOrCreate(
                ['aliment_id' => $alimentData['aliment_id']],
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
