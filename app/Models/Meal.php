<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    protected $table = 'meal';

    protected $fillable = ['user_id', 'meal_name'];

    public function aliments()
    {
        return $this->belongsToMany(Aliment::class, 'meal_aliment', 'meal_id', 'aliment_id');
    }
    


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
