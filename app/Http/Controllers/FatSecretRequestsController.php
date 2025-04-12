<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;


class FatSecretRequestsController extends Controller
{
    //obtener un alimento por el nombre
    public function getAlimentsByName($aliment)
    {
         // Llamamos al TokenController para obtener el token
         $tokenController = new TokenController();
         $token = $tokenController->getToken(); // Llamamos al controlador de tokens

        // Realizar la petición a la API de FatSecret
        $response = Http::withToken($token)
            ->get('https://platform.fatsecret.com/rest/server.api', [
                'method' => 'foods.search',
                'search_expression' => $aliment,
                'format' => 'json',
            ]);

        // Verificar si la respuesta fue exitosa
        if ($response->successful()) {
            // Retornar los datos de la respuesta
            return response()->json($response->json(), 200);
        }
    }


    //Buscar un alimento por ID
    public function getAlimentById($id){
         // Llamamos al TokenController para obtener el token
         $tokenController = new TokenController();
         $token = $tokenController->getToken();

         // Realizar la petición a la API de FatSecret
        $response = Http::withToken($token)
        ->get('https://platform.fatsecret.com/rest/food/v4', [
            'method' => 'food.get.v4',
            'food_id' => $id,
            'format' => 'json',
        ]);

        // Verificar si la respuesta fue exitosa
        if ($response->successful()) {
            // Retornar los datos de la respuesta
            return response()->json($response->json(), 200);
        }

    }
}
