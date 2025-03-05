<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Meal;

class MealSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $defaultMeals = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

        foreach ($defaultMeals as $meal) {
            Meal::create([
                'user_id' => '1',
                'meal_name' => $meal,
            ]);
        }
    }
}
