import React from "react";
import QuestionButtons from "../questionsButtons";

const FinalScreen = ({ calories, nextScreen, previousScreen }) => {

    const routeToDashboard = () => {
        //redireccion a dashboard
        window.location.href = '/dashboard';
    }
    return (
        <div className="shadow-extra-dark w-[500px] h-[650px] rounded-2xl py-5 pt-10 px-6 flex flex-col items-center justify-between">
            <h2 className="text-[2em] font-bold text-center">Your Personalized Nutrition</h2>

            {/* Contenedor principal */}
            <div className="w-full flex flex-col items-center gap-6">
                {/* Sección de calorías */}
                <div className="flex flex-row items-center gap-4 bg-[#222] px-5 py-3 rounded-lg shadow-md w-full">
                    <img src="./assets/images/icons/apple-icon.png" alt="apple-icon" className="w-12 h-12" />
                    <div className="flex flex-col">
                        <p className="text-white text-sm font-bold">Daily Caloric Intake</p>
                        <p className="text-[2em] font-bold">
                            {calories ? calories.finalCalories : "Calculating..."}
                            <span className="text-base font-normal"> kcal</span>
                        </p>
                    </div>
                </div>

                {/* Información adicional */}
                {calories && (
                    <div className="w-full flex flex-col gap-4 bg-[#222] p-5 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-center text-white">Your Body Metrics</h3>
                        <div className="flex justify-between items-center">
                            <p className="text-white font-bold">💪 Body Fat %:</p>
                            <p className="font-bold">{calories.fatPercentage}%</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-white font-bold">📏 BMI:</p>
                            <p className="font-bold">{calories.imc}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-white font-bold">🔥 Basal Metabolic Rate (TMB):</p>
                            <p className="font-bold">{calories.tmb} kcal</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Botón para finalizar el cuestionario */}
            <button
                className="mt-10 w-full py-4 border-4 border-[#C1C86D] text-white rounded-lg bg-transparent hover:bg-[#C1C86D] hover:text-[#2F2F2F] transition-colors duration-300 font-bold"
                onClick={routeToDashboard}
            >
                Finish
            </button>
        </div>
    )
};
export default FinalScreen;