import React from "react";
import QuestionButtons from "../../questionsButtons";

const AfterActivityLevel = ({ answers, nextScreen, previousScreen }) => {
    const renderStatusMessage = () => {
        switch (answers.activityLevel) {
            case "Sedentary":
                return (
                    <>
                        <div className="text-center">
                            <h1 className="text-[2em] font-bold">Couch Mode Activated</h1>
                            <p>Minimal movement detected. Are you part of the furniture?</p>
                            <p>A little stretching wouldn’t hurt… probably.</p>
                        </div>
                        <img src="assets/images/nutrin/Nutri_3.png" 
                             alt="Sedentary Illustration" 
                             className="w-auto h-[22em] my-4" />
                    </>
                );
            case "Lightly active":
                return (
                    <>
                        <div className="text-center">
                            <h1 className="text-[2em] font-bold">Casual Mover</h1>
                            <p>You move just enough to keep things interesting. Nice effort!</p>
                            <p>Maybe take the stairs next time? Just a thought.</p>
                        </div>
                        <img src="/assets/images/nutrin/Nutri_1.png" 
                             alt="Lightly Active Illustration" 
                             className="w-auto h-[22em] my-4" />
                    </>
                );
            case "Moderately active":
                return (
                    <>
                        <div className="text-center">
                            <h1 className="text-[2em] font-bold">Part-Time Athlete</h1>
                            <p>A good balance of movement and rest. Keep it up!</p>
                            <p>At this rate, you might just unlock “Fitness Enthusiast” mode. 🚀</p>
                        </div>
                        <img src="/assets/images/nutrin/Nutri_8.png" 
                             alt="Moderately Active Illustration" 
                             className="w-auto h-[22em] my-4" />
                    </>
                );
            case "Very active":
                return (
                    <>
                        <div className="text-center">
                            <h1 className="text-[2em] font-bold">High Energy Mode</h1>
                            <p>You're always on the move! Impressive stamina.</p>
                            <p>Just don’t forget to rest once in a while. Your legs will thank you. 🏃‍♂️</p>
                        </div>
                        <img src="/assets/images/nutrin/Nutri_5.png" 
                             alt="Very Active Illustration" 
                             className="w-auto h-[22em] my-4" />
                    </>
                );
            case "Extremely active":
                return (
                    <>
                        <div className="text-center">
                            <h1 className="text-[2em] font-bold">Fitness Machine</h1>
                            <p>You train like it’s your full-time job. Respect!</p>
                            <p>Ever heard of a rest day? It’s a thing, I promise.</p>
                        </div>
                        <img src="/assets/images/nutrin/Nutri_2.png" 
                             alt="Extremely Active Illustration" 
                             className="w-auto h-[22em] my-4" />
                    </>
                );
            default:
                return (
                    <>
                        <div className="text-center">
                            <h1 className="text-[2em] font-bold">Unknown Mode</h1>
                            <p>Somewhere between "couch potato" and "Olympic athlete."</p>
                            <p>Mind clarifying before we make assumptions?</p>
                        </div>
                        <img src="/assets/images/nutrin/Nutri_1.png" 
                             alt="Unknown Illustration" 
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
                        previousScreen={previousScreen}
                    />
        </div>
    );
};

export default AfterActivityLevel;
