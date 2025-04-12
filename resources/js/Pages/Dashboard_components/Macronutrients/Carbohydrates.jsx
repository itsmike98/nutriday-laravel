import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect } from "react";
import { use } from "react";

export default function Carbohydrates({ nutritionGoals, todayTotals }) {
    const calories = nutritionGoals?.calories || 0;
    const goal = nutritionGoals?.goal || 100; // Ajusta esto según tus datos

    ChartJS.register(ArcElement);

    const carbs = (todayTotals?.carbs ?? 0).toFixed(1);

    const proteinsData = {
        labels: ["Calories", "Remaining"],
        datasets: [
            {
                data: [carbs, nutritionGoals.proteins],
                backgroundColor: ["#C1C86D", "transparent"],
                borderWidth: 0,
                cutout: "50%",
                rotation: 0,
                borderRadius: 10,
                responsive: true,
            },
        ],
    };

    const background = {
        labels: ["Remaining"],
        datasets: [
            {
                data: [goal - calories],
                backgroundColor: ["#171717"],
                borderWidth: 0,
                cutout: "50%",
                rotation: 0,
                responsive: true,
            },
        ],
    };

    return (
        <>
        <div className="relative w-full h-[250px] flex items-center justify-center">
            {/* Fondo (Background) - centrado de forma normal */}
            <Doughnut data={background} />

            <h3 className="font-bold absolute text-[2em]">{carbs}<span className="font-normal]">g</span></h3>
            {/* Donut encima - centrado de forma absoluta */}
            <Doughnut className="absolute inset-0 m-auto" data={proteinsData} />
        </div>
        <h3 className="font-semibold text-[1.4em] text-center">Carbohydrates</h3>
    </>
    

    );
}
