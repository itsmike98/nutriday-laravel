import React, { useEffect } from "react";
import { useState } from "react";

export default function AlimentMealTable({ aliment, mealId, onDelete }) {

    //post para eliminar un alimento en un meal
    function deleteAliment() {
    console.log("Aliment object:", aliment); // <-- Verifica qué contiene el objeto

    axios.post('/delete-aliment', {
        meal_id: mealId,
        aliment_id: aliment.pivot.aliment_id, // <-- Asegúrate de que esta propiedad existe
    })
    .then(function (response) {
        console.log('Alimento eliminado');
        console.log(response);
        onDelete(aliment.aliment_id);
    })
    .catch(function (error) {
        console.log("Error en deleteAliment:", error.response?.data || error);
    });
}


    //printa el nombre del alimento, y luego el serving id escogido, no terminado, se tienen que hacer primero los calculos y luego printarlos aqui
    return (
        <>
            <tr className="alimento group">
                <td className="aliment-name flex items-center gap-5 relative ml-5">
                    <button 
                    onClick={deleteAliment}
                        className="material-icons text-avocado absolute left-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 -translate-x-5"
                    >
                        cancel
                    </button>
                    <span className="ml-0 group-hover:ml-6 transition-all duration-300 truncate overflow-hidden whitespace-nowrap pr-5 font-semibold">
                        {aliment.aliment_name}
                    </span>
                </td>
                <td>{aliment.pivot.serving_amount}</td>
                <td>{aliment.pivot.calories} <span>g</span></td>
                <td>{aliment.pivot.carbs} <span>g</span></td>
                <td>{aliment.pivot.fat}</td>
                <td>{aliment.pivot.protein}</td>
            </tr>
        </>
    )
}