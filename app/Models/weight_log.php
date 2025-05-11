<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class weight_log extends Model
{
    protected $table = "weight_log";

    protected $fillable = [
        'user_id',
        'weight',
        'created_at',
        'updated_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
