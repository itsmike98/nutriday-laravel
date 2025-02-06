<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPhysicalData extends Model
{
    use HasFactory;

    //Selecciona la tabla con la que trabaja este modelo.
    protected $table = 'user_physical_data';

    // Permitir asignación masiva de estos campos.
    protected $fillable = [
        'user_id',
        'height',
        'weight',
        'activity_level',
        'main_goal',
        'questions_answered'
    ];

    

    /**
     * Get the user that owns the UserPhysicalData.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
