<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    protected $table = 'posts'; // Conexion con la tabla posts


    //En la siguiente funcion llamada cast, se le va a dar instrucciones a la base de datos de como guardar los datos y como mostrarlos en la vista.
    protected function casts(): array
    {
        return [
            'title' => 'string',
            'content' => 'string',
            'category' => 'string',
        ];
        //En este caso es muy simple e innecesario, pero en otros casos puede ser muy util para modificar campor como el de la fecha de creacion o modificacion, o un booleano, etc.
    }


    // Esta funcion es para dar instrucciones a la base de datos de como guardar los datos y como mostrarlos en la vista. 
    // El nombre de la funcion debe ser el nombre del campo en la base de datos.
    protected function title(): Attribute
    {
        return Attribute::make(
            // el set va a modificar el valor antes de guardarlo en la base de datos
            set: function ($value) {
                return strtolower($value);
            },
            // el get va a modificar el valor antes de mostrarlo en la vista
            get: function ($value) {
                return ucfirst($value);
            }
        );
    }
}
