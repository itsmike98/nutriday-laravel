import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    Filler
} from 'chart.js';
import { Line } from "react-chartjs-2";
import "../../../../css/informs.css";
import { max, set } from "date-fns";


export default function WeightChart({ newWeight }) {
    const [weightList, setWeightList] = useState([]);
    const [minWeight, setMinWeight] = useState(0);
    const [maxWeight, setMaxWeight] = useState(0);

    ChartJS.register(
        Filler
    );

    function formatDate(date){
        const splitted = date.split('-');
        let formattedDate = `${splitted[1]} / ${splitted[2].split('T')[0]}`;
        return formattedDate;
    }

    useEffect(() => {
        axios.get("/weight-log")
            .then((res) => {
                const list = res.data.weightLog;
                const weightsObj = [];
                
                let min = parseFloat(list[0].weight);
                let max  = parseFloat(list[0].weight);

                list.forEach((item) => {
                    const itemNumber = parseFloat(item.weight);

                    if (itemNumber < min) {
                        min = itemNumber;
                    }
                    if (itemNumber > max) {
                        max = itemNumber;
                    }
                    
                    weightsObj.push({
                        weight: item.weight,
                        date: formatDate(item.created_at)
                      });
                })

                setMinWeight(min);
                setMaxWeight(max);
                setWeightList(weightsObj.reverse());
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, [newWeight])

    const data = {
        labels: weightList.map(item => item.date),
        datasets: [
            {
                label: 'Weight Progress',
                data: weightList.map(item => item.weight),
                borderColor: '#C1C86D',
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) return null;

                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0.1, 'rgba(193, 200, 109, 0)');
                    gradient.addColorStop(1, 'rgba(193, 200, 109, 0.15)');

                    return gradient;
                },
                fill: true,
                tension: 0.4,
            },
        ]
    };


    const options = {
        responsive: true,
        maintainAspectRatio: false,
        tension: 0.4,
        y: {
            min: minWeight - 5,
            max: maxWeight + 5,
        }
    }

    return (
        <div className="chart-container">
            <Line
                options={options}
                data={data}
            />
        </div>
    )
}