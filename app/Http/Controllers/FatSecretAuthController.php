<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class FatSecretAuthController extends Controller
{
    public function getToken()
    {
        $clientID = '5f03e151b864498b963681b0d911dbae';
        $clientSecret = 'f00d3d52895045e99799711d754e6c61';

        $response = Http::withBasicAuth($clientID, $clientSecret)
            ->asForm()
            ->post('https://oauth.fatsecret.com/connect/token', [
                'grant_type' => 'client_credentials',
                'scope' => 'basic',
            ]);

        if ($response->successful()) {
            $accessToken = $response->json()['access_token'] ?? null;
            $query = 'apple';
            $finalData = $this->fatSecretRequest($accessToken, $query);
            return $finalData;
        }
    }

    public function fatSecretRequest($token, $query)
    {
        // Realizar la petición a la API de FatSecret
        $response = Http::withToken($token)
            ->get('https://platform.fatsecret.com/rest/server.api', [
                'method' => 'foods.search',
                'search_expression' => $query,
                'format' => 'json',
            ]);

        // Verificar si la respuesta fue exitosa
        if ($response->successful()) {
            // Retornar los datos de la respuesta
            return response()->json($response->json(), 200);
        }
    }
}
