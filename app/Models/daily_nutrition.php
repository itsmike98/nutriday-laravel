<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class daily_nutrition extends Model
{
    protected $table = 'daily_nutrition';
    
    protected $fillable = [
        'user_id',
        'date',
        'total_calories',
        'total_carbs',
        'total_protein',
        'total_fat',
        'total_fiber',
        'total_sugar'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
