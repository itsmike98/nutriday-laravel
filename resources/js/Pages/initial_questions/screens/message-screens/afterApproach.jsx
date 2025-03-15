import React from "react";
import QuestionButtons from "../../questionsButtons";

const AfterApproach = ({ answers, nextScreen, setCurrentScreen, previousScreen, finishSurvey }) => {
    const handlePreviousScreen = () => {
        if (answers.activityLevel !== "Aggressive" && answers.activityLevel !== "Moderate") {
            setCurrentScreen(4);
        }
    };

    const renderStatusMessage = () => {
        switch (answers.activityLevel) {
            case "Aggressive":
                return (
                    <>
                        <div className="text-center">
                            <h1 className="text-[2em] font-bold">Couch Mode Activated</h1>
                            <p>Minimal movement detected. Are you part of the furniture?</p>
                            <p>A little stretching wouldn’t hurt… probably.</p>
                        </div>
                        <img src="./assets/images/ilustraciones/avocado-squat.png"
                            alt="Sedentary Illustration"
                            className="w-[22em] h-[22em] my-4" />
                    </>
                );
            case "Moderate":
                return (
                    <>
                        <div className="text-center">
                            <h1 className="text-[2em] font-bold">Couch Mode Activated</h1>
                            <p>Minimal movement detected. Are you part of the furniture?</p>
                            <p>A little stretching wouldn’t hurt… probably.</p>
                        </div>
                        <img src="/assets/images/nutrin/Nutri_6.png"
                            alt="Sedentary Illustration"
                            className="w-[22em] h-[22em] my-4" />
                    </>
                );
            default:
                return (
                    <>
                        <div className="text-center">
                            <h1 className="text-[2em] font-bold">Keep Going!</h1>
                            <p>You're doing great. Stay active and keep pushing towards your goals!</p>
                            <p>Remember, consistency is key to achieving your desired results.</p>
                        </div>
                        <img src="/assets/images/nutrin/Nutri_4.png"
                            alt="Motivational Illustration"
                            className="w-auto h-[22em] my-4" />
                    </>
                );
        }
    };

    return (
        <div className="shadow-extra-dark w-[500px] h-[650px] rounded-2xl py-5 pt-10 px-6 flex flex-col items-center justify-center text-center">
            {renderStatusMessage()}
            <QuestionButtons
                nextScreen={nextScreen}
                previousScreen={handlePreviousScreen}
                sendData={finishSurvey}
            />
        </div>
    );
};

export default AfterApproach;