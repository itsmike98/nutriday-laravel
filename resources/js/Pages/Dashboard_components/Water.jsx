import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Water = ({ formattedDate }) => {
    const [num, setNum] = useState(0);
    const [userLiters, setUserLiters] = useState(0);
    const [barPercentage, setBarPercentage] = useState("15");

    const firstNumLoad = useRef(true);

    function handleWater(data) {
        const rawValue = data.target.value;
        let numero = parseFloat(rawValue);

        // "Full" button → set to userLiters
        if (rawValue === userLiters.toString()) {
            setNum(parseFloat(userLiters));
            return;
        }

        if (isNaN(numero)) return;

        const newValue = parseFloat((num + numero).toFixed(1)); // 🔄 redondear

        if (newValue < 0) {
            console.log("error: no se puede restar más de lo consumido");
            return;
        }

        setNum(newValue);
    }

    // POST cuando cambia `num` (después de carga inicial)
    useEffect(() => {
        if (firstNumLoad.current) {
            firstNumLoad.current = false;
            return;
        }

        if (userLiters > 0) {
            axios.post('/handle-water', {
                newCuantity: num,
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log("Error storing the liters into the database: ", error);
                });

            const percentage = Math.min((num / userLiters) * 100, 100).toFixed(0);
            setBarPercentage(percentage);
        }
    }, [num]);

    // Obtener litros recomendados
    useEffect(() => {
        axios.get('/user-data')
            .then(function (response) {
                const weight = response.data.weight;
                const waterLiters = parseFloat((weight * 0.035).toFixed(1));
                setUserLiters(waterLiters);
            })
            .catch(function (error) {
                console.log("Error getting the user physical data", error);
            });
    }, []);

    // Obtener total del día
    useEffect(() => {
        axios.get(`/daily-totals/${formattedDate}`)
            .then(function (response) {
                const totalWater = parseFloat(parseFloat(response.data.total_water).toFixed(1));
                setNum(totalWater);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [formattedDate]);

    return (
        <div className="flex gap-5 items-center">
            <div className="flex flex-col gap-[10px]">
                <button value={userLiters} onClick={handleWater} className="border-2 border-blue-500 text-[1.1em] hover:bg-blue-500 transition font-bold rounded-lg w-[60px] h-[45px]">
                    Full
                </button>
                <button value="1" onClick={handleWater} className="border-2 border-blue-500 text-[1.1em] hover:bg-blue-500 transition font-bold rounded-lg w-[60px] h-[45px]">
                    +1
                </button>
                <button value="0.5" onClick={handleWater} className="border-2 border-blue-500 text-[1.1em] hover:bg-blue-500 transition font-bold rounded-lg w-[60px] h-[45px]">
                    +0.5
                </button>
                <button value="-0.5" onClick={handleWater} className="border-2 border-blue-500 text-[1.1em] hover:bg-blue-500 transition font-bold rounded-lg w-[60px] h-[45px]">
                    -0.5
                </button>
                <button value="-1" onClick={handleWater} className="border-2 border-blue-500 text-[1.1em] hover:bg-blue-500 transition font-bold rounded-lg w-[60px] h-[45px]">
                    -1
                </button>
            </div>
            <div className="flex flex-col w-full justify-center items-center">
                <h3 className="text-[1.7em] font-bold">{userLiters} L</h3>
                <div className="bg-[#171717] rounded-xl h-[230px] w-[130px] flex items-end justify-center overflow-hidden">
                    <div
                        className="bg-blue-500 opacity-50 rounded-xl flex justify-center items-center w-full transition-all duration-700 ease-in-out"
                        style={{ height: `${barPercentage}%` }}
                    >
                        <span className="font-bold">{num} L</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Water;
