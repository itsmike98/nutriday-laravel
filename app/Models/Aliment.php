<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Aliment extends Model
{
    
    protected $table = 'aliment';

    protected $fillable = [
        'meal_id',
        'aliment_id',
        'aliment_serving_id',
        'aliment_serving_amount'
    ];
    
    public function meal()
    {
        return $this->belongsToMany(Meal::class, 'meal_aliment');
    }
}