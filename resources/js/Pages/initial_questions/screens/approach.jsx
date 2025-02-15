import React from "react";
import QuestionButtons from '../questionsButtons';

const Approach = ({ answers, handleChange, nextScreen, previousScreen }) => {
    return(
        <div className="shadow-extra-dark w-[500px] h-[650px] rounded-2xl py-5 pt-10 px-6 flex flex-col items-center justify-between">
        <div className="w-full text-center">
            <h2 className="text-[2em] font-bold mb-2">Choose Your Approach</h2>
            <p className="mb-10">Do you want to achieve your goal aggressively or moderately?</p>
            <div className="flex flex-col gap-2">
                {["Aggressive", "Moderate"].map((approach) => (
                    <button
                        key={approach}
                        className={`px-4 py-6 rounded w-full font-bold text-left ${answers.approach === approach
                            ? "bg-[#C1C86D] text-[#1F1F1F]"
                            : "bg-[#1F1F1F] text-white"
                            }`}
                        onClick={() => handleChange("approach", approach)}
                    >
                        {approach === "Moderate" ? "Moderate (Recommended)" : approach}
                    </button>
                ))}
            </div>
        </div>

        <QuestionButtons
            nextScreen={nextScreen}
            previousScreen={previousScreen}
        />
    </div>
)};
export default Approach;
