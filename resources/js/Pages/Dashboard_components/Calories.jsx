import React from "react";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const Calories = ({ todayTotals, userPhysicalData }) => {
    const calories = parseInt(todayTotals.calories) || 0;
    const goal = parseInt(userPhysicalData.daily_caloric_intake) || 0;

    ChartJS.register(ArcElement);

    const remaining = Math.max(goal - calories, 0); // Nunca negativo
    const displayCalories = Math.min(calories, goal); // Nunca mayor al objetivo

    const data = {
        labels: ["Calories", "Remaining"],
        datasets: [
            {
                data: [displayCalories, remaining],
                backgroundColor: ["#C1C86D", "rgba(0,0,0,0)"], // Color transparente válido
                borderWidth: 0,
                cutout: "70%",
                rotation: 0,
                borderRadius: 1000,
                responsive: true,
            },
        ],
    };

    const data2 = {
        labels: ["Remaining"],
        datasets: [
            {
                data: [goal - calories],
                backgroundColor: ["#171717"],
                borderWidth: 0,
                cutout: "70%",
                rotation: 0,
                responsive: true,
            },
        ],
    };

    console.log(todayTotals);

    return (
        <div className="flex flex-row flex-1 rounded-lg overflow-hidden h-[270px] bg-[#222]">
            {/* Parte izquierda: Gráfico */}
            <div className="flex flex-col items-center justify-center w-1/2 relative">
                <Doughnut className="z-10" data={data} />
                <Doughnut className="absolute" data={data2} />
                <p className="flex flex-col gap-0 font-bold text-white text-[2em] absolute">
                    {calories}
                    <span className="text-[0.8em] mt-[-5px]">kcal</span>
                </p>
            </div>

            {/* Parte derecha: Información */}
            <div className="flex flex-col justify-center w-1/2 bg-[#2a2a2a] p-4 rounded-xl shadow-lg">
                {/* Calories Goal */}
                <div className="flex flex-row items-center gap-2 mb-6">
                    <span className="material-icons text-[#8a8a8a] !text-[2.5em]">local_fire_department</span>
                    <div>
                        <p className="text-white text-xl font-semibold">Calories Goal</p>
                        <p className="text-white text-lg">{goal} kcal</p>
                    </div>
                </div>

                {/* Remaining Calories */}
                <div className="mb-6 flex flex-row items-center gap-2">
                    <span className="material-icons text-[#8a8a8a] !text-[2.5em]">update</span>
                    <div>
                        <p className="text-white text-xl font-semibold">Remaining Calories</p>
                        <p className="text-white text-lg">{goal - calories} kcal</p>
                    </div>
                </div>

                {/* Botón de Añadir alimento */}
                <button className="w-full py-3 bg-[#transparent] border-2 border-[#C1C86D] text-white font-semibold rounded-lg hover:bg-[#C1C86D] transition duration-300">
                    Añadir alimento
                </button>
            </div>
        </div>
    );
};

export default Calories;
