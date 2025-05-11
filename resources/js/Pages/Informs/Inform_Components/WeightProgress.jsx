import { use } from "react";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import WeightChart from "./WeightChart";


export default function WeightProgress() {
    const [currentWeight, setCurrentWeight] = useState(0);
    const [newWeight, setNewWeight] = useState(0);

    useEffect(() => {
        axios.get("user-data").then((res) => {
            setNewWeight(res.data.weight);
            setCurrentWeight(res.data.weight);
        })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    useEffect(() => {
        if (newWeight === currentWeight) return;
        axios.post('/update-weight', {
            newWeight: newWeight
        })
            .catch(function (error) {
                console.log(error);
            });
    }, [newWeight])

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-6 w-full">
            {/* Chart Section */}
            <div className="w-full lg:w-1/2">
                <WeightChart newWeight={newWeight} />
            </div>

            {/* Weight Info Section */}
            <div className="w-full lg:w-1/2">
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center bg-[#2D2D2D] rounded-2xl p-6 md:h-[300px] shadow-lg">
                    {/* Text Section */}
                    <div className="flex flex-col items-center justify-center w-full md:w-1/2 text-center text-white">
                        <h3 className="text-xl font-semibold mb-2">Your Current Weight</h3>
                        <h3 className="text-4xl font-extrabold my-3 bg-[#1E1E1E] py-3 px-6 rounded-2xl shadow-inner">{newWeight} kg</h3>

                        <Popup
                            trigger={
                                <button className="mt-4 font-semibold text-lg border-2 px-5 py-2 rounded-xl border-avocado text-avocado hover:bg-avocado hover:text-[#222] transition-colors duration-300">
                                    Update Weight
                                </button>
                            }
                            modal
                            nested
                        >
                            {close => (
                                <div className="modal w-[90vw] max-w-[400px] bg-[#1E1E1E] text-white rounded-xl p-6">
                                    <h3 className="text-lg font-semibold mb-2">Update Weight</h3>
                                    <hr className="border-gray-600 mb-4" />
                                    <div className="bg-[#191919] text-avocado text-sm rounded-md p-3 mb-4 border-l-4 border-avocado">
                                        ⚠️ Please make sure to enter the correct number. <strong>You won’t be able to change or delete this weight after saving it.</strong>
                                    </div>
                                    <p className="mb-2">Enter your new weight:</p>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            setNewWeight(e.target[0].value);
                                            close();
                                        }}
                                    >
                                        <input
                                            type="number"
                                            step="0.01"
                                            inputMode="decimal"
                                            className="w-full h-12 mb-4 px-3 rounded-md bg-[#333] text-white border border-gray-500"
                                        />
                                        <button
                                            type="submit"
                                            className="w-full py-3 border-2 border-avocado text-white rounded-lg bg-transparent hover:bg-avocado hover:text-[#2F2F2F] transition-colors duration-300 font-bold"
                                        >
                                            Update
                                        </button>
                                    </form>
                                </div>
                            )}
                        </Popup>
                    </div>

                    {/* Image Section */}
                    <div className="flex items-center justify-center w-full md:w-1/2 p-4">
                        <img
                            src="assets/images/nutrin/Nutri_12.png"
                            alt="nutrin-weight"
                            className="transform -scale-x-100 w-28 md:w-36 h-auto object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}