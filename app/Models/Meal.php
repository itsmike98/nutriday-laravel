<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    protected $table = 'meal';

    protected $fillable = ['user_id', 'meal_name'];

    public function aliment()
    {
        return $this->belongsToMany(Aliment::class, 'meal_aliment');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
