<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Meal;
use Carbon\Carbon;

class MealSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaultMeals = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];
        $userId = 1; // ID del usuario para el que se crean las comidas

        for ($i = 0; $i < 5; $i++) {
            $date = Carbon::now()->subDays($i)->toDateString(); // Obtiene la fecha de hoy y los 4 días anteriores

            foreach ($defaultMeals as $meal) {
                Meal::create([
                    'user_id' => $userId,
                    'meal_name' => $meal,
                    'created_at' => Carbon::parse($date)->setTime(rand(0, 23), rand(0, 59), rand(0, 59)), // Establece la fecha y hora aleatoria
                ]);
            }
        }
    }
}
