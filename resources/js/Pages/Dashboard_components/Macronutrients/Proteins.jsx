import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect } from "react";
import { use } from "react";

export default function Proteins({ nutritionGoals, todayTotals }) {
    const calories = nutritionGoals?.calories || 0;
    const goal = nutritionGoals?.goal || 100; // Ajusta esto según tus datos

    ChartJS.register(ArcElement);

    const proteins = (todayTotals?.protein ?? 0).toFixed(1);

    const remaining = Math.max(goal - proteins, 0);
    const displayProteins = Math.min(proteins, goal);

    const proteinsData = {
        labels: ["Proteins", "Remaining"],
        datasets: [
            {
                data: [displayProteins, remaining],
                backgroundColor: ["#638FD0", "rgba(0,0,0,0)"],
                borderWidth: 0,
                cutout: "50%",
                rotation: 0,
                borderRadius: 10,
                responsive: true,
            },
        ],
    };
    
    const background = {
        labels: ["Goal"],
        datasets: [
            {
                data: [goal],
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
        <div className="relative w-full h-[150px] md:h-[250px] flex items-center justify-center">
            {/* Fondo (Background) - centrado de forma normal */}
            <Doughnut data={background} />

            <h3 className="font-bold absolute text-[2em]">{proteins}<span className="font-normal]">g</span></h3>
            {/* Donut encima - centrado de forma absoluta */}
            <Doughnut className="absolute inset-0 m-auto" data={proteinsData} />
        </div>
        <h3 className="font-semibold text-[1.4em] text-center">Proteins</h3>
    </>
    

    );
}
