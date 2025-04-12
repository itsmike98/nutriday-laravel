<?php

namespace Database\Seeders;

use App\Models\nutrition_goals;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NutritionGoalsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        nutrition_goals::create([
            'id' => '1',
            'user_id' => '1',
            'calories' => '1967',
            'carbohydrates' => '245.88',
            'proteins' => '147.53',
            'fats' => '43.71',
        ]);
    }
}
