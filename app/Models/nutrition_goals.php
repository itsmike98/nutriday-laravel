<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class nutrition_goals extends Model
{
    protected $table = 'nutrition_goals';

    protected $fillable = [
        'user_id',
        'calories',
        'carbohydrates',
        'proteins',
        'fats'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}