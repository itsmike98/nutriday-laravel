import React from "react";
import QuestionButtons from '../questionsButtons';

const ActivityLevel = ({ answers, handleChange, nextScreen, previousScreen }) => {

    const activityLevels = [
        { name: "Sedentary", description: "(Little to no exercise)" },
        { name: "Lightly active", description: "(Light exercise 1-3 days/week)" },
        { name: "Moderately active", description: "(Moderate exercise 3-5 days/week)" },
        { name: "Very active", description: "(Hard exercise 6-7 days/week)" },
        { name: "Extremely active", description: "(Twice a day, very intense training sessions.)" }
    ];
    return(
    <div className="shadow-extra-dark w-[500px] h-[650px] rounded-2xl py-5 pt-10 px-6 flex flex-col items-center justify-end">
        <h2 className="text-[2em] font-bold mb-2">Activity Level</h2>
        <p className="mb-10">What is your activity level?</p>
        <div className="flex flex-col gap-2 w-full">
            {activityLevels.map(({ name, description }) => (
                <button
                    key={name}
                    className={`px-4 py-3 rounded w-full font-bold text-left ${answers.activityLevel === name
                        ? "bg-[#C1C86D] text-[#1F1F1F]"
                        : "bg-[#1F1F1F] text-white"
                        }`}
                    onClick={() => handleChange("activityLevel", name)} // Guardamos solo el nombre
                >
                    <span className="block">{name}</span>
                    <span className="text-sm opacity-70">{description}</span>
                </button>
            ))}
        </div>
        <QuestionButtons
            nextScreen={nextScreen}
            previousScreen={previousScreen}
        />
    </div>
)};
export default ActivityLevel;