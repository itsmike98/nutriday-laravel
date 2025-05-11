import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

export default function MacronutrientsAvg() {
    const [protein, setProtein] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [fat, setFat] = useState(0);
    const [tip, setTip] = useState("");
    const [tipIcon, setTipIcon] = useState(""); // For storing the icon name

    const colors = {
        protein: '#638FD0',
        carbs: '#C1C86D',
        fat: '#D06363'
    };

    function calculateAverage(data) {
        if (data.length === 0) return 0;
        const sum = data.reduce((acc, value) => acc + value, 0);
        return sum / data.length;
    }

    useEffect(() => {
        axios.get('/total-calories/inform')
            .then((response) => {
                const proteinArr = [];
                const carbsArr = [];
                const fatArr = [];

                response.data.forEach((item) => {
                    proteinArr.push(parseFloat(item.total_protein));
                    carbsArr.push(parseFloat(item.total_carbs));
                    fatArr.push(parseFloat(item.total_fat));
                });

                const proteinAvg = calculateAverage(proteinArr);
                const carbsAvg = calculateAverage(carbsArr);
                const fatAvg = calculateAverage(fatArr);

                setProtein(proteinAvg);
                setCarbs(carbsAvg);
                setFat(fatAvg);

                const values = [proteinAvg, carbsAvg, fatAvg];
                const max = Math.max(...values);
                const min = Math.min(...values);
                const avg = (proteinAvg + carbsAvg + fatAvg) / 3;

                // If the values are quite similar
                if (max - min < avg * 0.15) {
                    setTip("Your macronutrients are balanced. Keep it up!");
                    setTipIcon("check_circle"); // Check icon for balanced
                } else if (max === fatAvg) {
                    setTip("You're consuming a lot of fats, try to moderate them for a more balanced profile.");
                    setTipIcon("warning"); // Warning icon for fat
                } else if (max === carbsAvg) {
                    setTip("Your carbohydrate intake is high. Prioritize complex carbs like oats, brown rice, or legumes.");
                    setTipIcon("warning"); // Warning icon for carbs
                } else {
                    setTip("Good job with protein. Make sure to balance it with enough fiber and vegetables.");
                    setTipIcon("check_circle"); // Check icon for protein
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    

    const chartData = {
        labels: ['Protein', 'Carbs', 'Fats'],
        datasets: [
            {
                data: [protein, carbs, fat],
                backgroundColor: [
                    colors.protein,
                    colors.carbs,
                    colors.fat
                ],
                borderWidth: 0,  // Remove the border around the slices
                borderColor: 'transparent',  // Optional: ensure no border is visible
            }
        ]
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: false
            },
        },
        maintainAspectRatio: false
    };

    return (
        <div className="flex justify-center pt-5">
            <div className="flex flex-col md:flex-row max-w-4xl w-full justify-between items-center gap-10">
                {/* Información de los macros */}
                <div className="flex flex-col gap-3 flex-1 md:w-1/2">
                    <MacroLine label="Protein" value={protein} color={colors.protein} />
                    <MacroLine label="Carbs" value={carbs} color={colors.carbs} />
                    <MacroLine label="Fats" value={fat} color={colors.fat} />

                    {/* Mensaje debajo de los macros */}
                    {tip && (
                        <div className="mt-4 text-sm md:text-base text-avocado font-[600] bg-[#333] p-3 rounded-xl shadow-md max-w-[90%] md:max-w-full flex items-center gap-2 justify-center md:justify-start">
                            <span className="material-icons text-xl">{tipIcon}</span>
                            {tip}
                        </div>
                    )}
                </div>

                {/* Gráfico de Pie */}
                <div className="flex-0 md:flex-1 h-[250px] max-w-[250px] md:w-1/2">
                    <Pie data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
}

function MacroLine({ label, value, color }) {
    return (
        <div className="flex items-center text-lg gap-3">
            <div className="w-5 h-2 rounded-lg" style={{ backgroundColor: color }} />
            <span><strong>{label}:</strong> {value.toFixed(2)} g</span>
        </div>
    );
}
