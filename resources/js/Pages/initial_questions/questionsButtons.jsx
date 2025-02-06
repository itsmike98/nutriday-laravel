import React from "react";

export default function QuestionButtons({ nextScreen, previousScreen, sendData, routeToDashboard }) {
    const handleNext = () => {
        if (nextScreen) {
            nextScreen(); // Llamamos a la función nextScreen correctamente
        }
        if (sendData) {
            sendData(); // Llamamos a sendData si está definida
        }
        if(routeToDashboard){
            routeToDashboard(); //LLamamos a routeToDashboard solo si esta definido
        }
    };

    return (
        <div className="flex gap-5 w-full">
            <button
                className="mt-10 w-[50%] py-4 rounded-md bg-[#c4c4c4] text-[#2F2F2F] transition-colors duration-300 font-bold"
                onClick={previousScreen}
            >
                Back
            </button>
            <button
                className="mt-10 w-[50%] py-4 rounded-md bg-[#C1C86D] text-[#2F2F2F] transition-colors duration-300 font-bold"
                onClick={handleNext}
            >
                Next
            </button>
        </div>
    );
}
