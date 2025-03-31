import React from "react";
import { useState } from "react";

export default function AlimentMealTable({ aliment, mealId, onDelete }) {
    const [alimentData, setAlimentData] = useState([]);

    //post para eliminar un alimento en un meal
    function deleteAliment() {
        axios.post('/delete-aliment', {
            meal_id: mealId,
            aliment_id: aliment.aliment_id,
        })
            .then(function (response) {
                console.log(response);
                onDelete(aliment.aliment_id);
            })
            .catch(function (error) {
                console.log(error);
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
                    <span className="ml-0 group-hover:ml-6 transition-all duration-300">
                        {aliment.aliment_name}
                    </span>
                </td>
                <td>{aliment.aliment_serving_amount}</td>
                <td>{aliment.calories} <span>g</span></td>
                <td>{aliment.carbs} <span>g</span></td>
                <td>{aliment.fat}</td>
                <td>{aliment.protein}</td>
            </tr>
        </>
    )
}