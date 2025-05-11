import axios from "axios";
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';

export default function TotalCalories() {
    const [caloriesList, setCaloriesList] = useState([]);
    const [days, setDays] = useState([]);
    const [data, setData] = useState({});
    const [maxCalories, setMaxCalories] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // Obtener la lista de calorías totales maximo 15 días
    useEffect(() => {
        axios.get("/total-calories/inform")
            .then((res) => {
                setCaloriesList(res.data);

                // Formatear las fechas
                const formattedDays = res.data.map(item => {
                    const splittedDate = item.date.split("-");
                    return `${splittedDate[1]}/${splittedDate[2]}`;
                });

                setDays(formattedDays);
            })
            .catch((err) => {
                console.log(err.message);
            });

        axios.get("user-data").then((res) => {
            setMaxCalories(res.data.daily_caloric_intake);
        })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    // Inicializar el chart con los datos que necesitaré
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        Tooltip
    );

    // Definir los labels y los datos para el gráfico
    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                type: "linear",
                position: "left",
                display: true,
                min: 0,
                max: maxCalories + 500,
            },
            y1: {
                type: "linear",
                position: "right",
                display: false,
                min: 0,
                max: maxCalories + 500,
            }
        }
    }

    // Actualizar los datos del gráfico cuando cambian los días o la lista de calorías
    useEffect(() => {
        if (days.length === 0 || caloriesList.length === 0 || maxCalories === 0) {
            setIsVisible(false);
            return;
        } else {
            setIsVisible(true);
        }

        // Usar .slice() para no modificar el state directamente
        const reversedCalories = caloriesList.slice().reverse();
        const reversedDays = days.slice().reverse();



        setData({
            labels: reversedDays,
            datasets: [
                {
                    label: `Meta (${maxCalories})`,
                    data: Array(reversedDays.length).fill(maxCalories),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    pointRadius: 0,
                    type: 'line',
                    yAxisID: 'y1',

                   
                },
                {
                    label: 'Calorías consumidas',
                    data: reversedCalories.map((item) => item.total_calories),
                    borderColor: 'rgb(193, 200, 109)',
                    backgroundColor: 'rgba(193, 200, 109)',
                    pointRadius: 7,
                    type: 'bar',
                    yAxisID: 'y',
                },
            ],
        });

    }, [days, caloriesList, maxCalories]);

    return (
        <>
            <div className="chart-container">
                {isVisible ? (
                    data.labels && data.datasets ? (
                        <Line data={data} options={options} />
                    ) : <p>Cargando datos del gráfico...</p>
                ) : <div className="flex flex-row">
                    <div className="flex justify-center items-center text-center w-1/2">
                        <h3 className="font-bold text-[1.7em]">
                            Keep using the app to track your progress! <br />
                            You'll be able to see your chart soon.
                        </h3>

                    </div>
                    <div className="flex justify-center w-1/2 ">
                        <img src="assets/images/nutrin/Nutri_11.png" alt="nutrin_img" className="nutrin-img" />
                    </div>
                </div>}

            </div>

        </>
    );
}
