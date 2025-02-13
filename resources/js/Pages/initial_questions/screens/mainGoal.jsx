import React from "react";
import QuestionButtons from '../questionsButtons';

const MainGoal = ({ answers, handleChange, nextScreen, previousScreen, setCurrentScreen, finishSurvey}) => {
    const handleNext = () => {
        if (answers.goal === "Maintain my current weight") {
            finishSurvey();
            setCurrentScreen(5);
        } else {
            nextScreen();
        }
    };
    return (
        <div className="shadow-extra-dark w-[500px] h-[650px] rounded-2xl py-5 pt-10 px-6 flex flex-col items-center justify-between">
            <div className="w-full text-center">
                <h2 className="text-[2em] font-bold mb-2">Your Main Goal</h2>
                <p className="mb-10">What is your main goal in NutriDay?</p>
                <div className="flex flex-col gap-2">
                    {["Lose weight", "Maintain my current weight", "Gain weight"].map((goal) => (
                        <button
                            key={goal}
                            className={`px-4 py-6 rounded w-full font-bold text-left ${answers.goal === goal
                                ? "bg-[#C1C86D] text-[#1F1F1F]"
                                : "bg-[#1F1F1F] text-white"
                                }`}
                            onClick={() => handleChange("goal", goal)}
                        >
                            {goal}
                        </button>
                    ))}
                </div>
            </div>

            <QuestionButtons
                nextScreen={handleNext}
                previousScreen={previousScreen}
            />
        </div>
    )
};
export default MainGoal;