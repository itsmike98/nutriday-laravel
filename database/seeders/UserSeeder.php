<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'id' => '1',
            'name' => 'Miguel Gutierrez',
            'birth_year' => '1998-05-18',
            'gender' => 'Male',
            'email' => 'ilsmorenogutierrezmiguel@gmail.com',
            'password' => Hash::make('asdf'),
        ]);
    }
}


//comando para ejecutar el seeder:
//php artisan db:seed --class=UserSeeder

//comando para ejecutar todos los seeders:
//php artisan db:seed
