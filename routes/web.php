<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Models\Post;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Route::get('/', [PostController::class, 'index']);

Route::get('/', function () {
    return Inertia::render('landing');
});

// Route::resource('posts', PostController::class)->except('index');

Route::get('prueba', function () {
    // Crear datos para la database
    // $post = new Post;

    // $post->title = 'Titulo de prueba 1';
    // $post->content = 'Contenido de prueba 1';
    // $post->category = 'Categoria de prueba 1';

    // $post->save();

    // return $post;

    // // Actualizar datos de la database
    // $post = Post::find(5); // Buscar el post con id 5
    // $post->title = 'Titulo de prueba 5'; // Actualizar el titulo
    // $post->save(); // Guardar los cambios

    //$post = Post::all(); // Obtener todos los posts

    //$post = Post::where('id', '>=','2') ->get(); // Obtener todos los posts con id mayor o igual a 2

    $post = Post::find(5);
    //$post->delete(); // Eliminar el post con id 1

    return $post;
});
