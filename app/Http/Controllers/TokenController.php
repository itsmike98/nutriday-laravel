<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class TokenController extends Controller
{
    //obtener un nuevo token o obtener el del caché
    public function getToken()
    {
        // Intentar obtener el token de la caché
        $accessToken = Cache::get('fatsecret_token');

        if (!$accessToken) {
            // Si el token no está en caché o ha expirado, obtener uno nuevo
            $clientID = "5f03e151b864498b963681b0d911dbae";
            $clientSecret = "f00d3d52895045e99799711d754e6c61";

            $response = Http::withBasicAuth($clientID, $clientSecret)
                ->asForm()
                ->post('https://oauth.fatsecret.com/connect/token', [
                    'grant_type' => 'client_credentials',
                    'scope' => 'basic',
                ]);

            if ($response->successful()) {
                $accessToken = $response->json()['access_token'];
                
                // Guardar el token en la caché por 24 horas (86400 segundos)
                Cache::put('fatsecret_token', $accessToken, 86400); // 24 horas
            } else {
                return response()->json(['error' => 'No se pudo obtener el token'], 400);
            }
        }

        return $accessToken;
    }
}
