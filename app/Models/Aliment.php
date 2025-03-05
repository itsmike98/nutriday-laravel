<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Aliment extends Model
{
    
    protected $table = 'aliment';

    protected $fillable = [
        'aliment_name',
        'aliment_serving_amount'
    ];
    
    public function meal()
    {
        return $this->belongsToMany(Meal::class, 'meal_aliment');
    }
}

// Url fat secret
// https://platform.fatsecret.com/rest/foods/search/v1?search_expression=apple&page_number=1&format=json