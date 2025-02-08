<?php

namespace Database\Seeders;

use App\Models\UserPhysicalData;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserPhysicalDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserPhysicalData::create([
            'id' => '1',
            'user_id' => '1',
            'height' => '174',
            'weight' => '75',
            'activity_level' => 'Moderately active',
            'main_goal' => 'Lose weight',
            'questions_answered' => '1',
        ]);
    }
}
