<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class RandomRecipeController extends Controller
{
    public function getRandomRecipe()
    {

        $tokenController = new TokenController();
         $token = $tokenController->getToken();
         
         $randomPage = rand(0, 100);
        // Llamar a la API de FatSecret para obtener una receta aleatoria
        $response = Http::withToken($token)->get('https://platform.fatsecret.com/rest/recipes/search/v3', [
            'method' => 'recipes.search.v3',
            'format' => 'json',

            'calories.to' => 500, // máximo 500 calorías por receta
            'percent_fat.to' => 30, // menos del 30% de calorías en grasa
            'percent_protein.from' => 15, // al menos 15% de proteínas
            'require_images' => true, // solo recetas con imagen
            'sortby' => 'caloriesPerServingAscending',
            'page_number' => $randomPage,
        ]);

        $randomRecipe = json_decode($response);
        
        $getRandomRecipeId = $randomRecipe->recipes->recipe[rand(0,20)]->recipe_id;

        $recipe = Http::withToken($token)->get('https://platform.fatsecret.com/rest/recipe/v2', [
            'method' => 'recipe.get.v2',
            'recipe_id' => $getRandomRecipeId,
            'format' => 'json',
        ]);

        // Verificar si la respuesta fue exitosa
        if ($recipe) {
            // Retornar los datos de la respuesta
            return $recipe->json();
        }

        // Manejar el error en caso de que la respuesta no sea exitosa
        return response()->json(['error' => 'Error al obtener la receta aleatoria'], 500);
    }
}
