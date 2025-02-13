import { useState } from "react";
import WelcomeScreen from "./screens/welcomeScreen";
import PersonalInfoScreen from "./screens/personalInfo";
import ActivityLevel from "./screens/activityLevel";
import MainGoal from "./screens/mainGoal";
import Approach from "./screens/approach";
import FinalScreen from "./screens/finalScreen";
import "@css/questions.css";

function Survey() {
    // Controlar la pantalla actual
    const [currentScreen, setCurrentScreen] = useState(0);

    // Guardar las respuestas
    const [answers, setAnswers] = useState({
        birthYear: "",
        gender: "",
        height: "",
        weight: "",
        activityLevel: "",
        goal: "",
        approach: ""
    });

    // Validate if all required fields are filled
    const validateScreen = () => {
        switch (currentScreen) {
            case 1:
                return answers.birthYear && answers.gender && answers.height && answers.weight;
            case 2:
                return answers.activityLevel;
            case 3:
                return answers.goal;
            case 4:
                return answers.approach;
            default:
                return true;
        }
    };

    // Move to the next screen
    const nextScreen = () => {
        if (!validateScreen()) {
            alert("Please answer all the questions before proceeding.");
            return;
        }
        setCurrentScreen(currentScreen + 1);
    };

    // Función para manejar cambios en las respuestas
    const handleChange = (field, value) => {
        setAnswers({ ...answers, [field]: value });
    };

    const [calories, setCalories] = useState(null);

    const finishSurvey = () => {
        console.log('these are the anwers:', answers);
        axios.post('http://nutriday.local/guardar-datos', answers)
            .then(function (response) {
                console.log("Server response:", response.data);
                setCalories(response.data.finalCalories);
            })
            .catch(function (error) {
                if (error.response) {
                    console.error("Error sending data:", error.response.data);
                } else {
                    console.error("Error sending data:", error.message);
                }
            });
        alert("Survey completed! Wait a second, we are processing your data.");
    };

    return (
        <div className="flex items-center justify-center h-screen bg-[#2f2f2f]">
            {currentScreen === 0 && <WelcomeScreen nextScreen={nextScreen} />}
            {currentScreen === 1 && (
                <PersonalInfoScreen
                    answers={answers}
                    handleChange={handleChange}
                    nextScreen={nextScreen}
                    previousScreen={() => setCurrentScreen(currentScreen - 1)} // Maneja la pantalla anterior
                />
            )}
            {currentScreen === 2 && (
                <ActivityLevel
                answers={answers}
                handleChange={handleChange}
                nextScreen={nextScreen}
                previousScreen={() => setCurrentScreen(currentScreen - 1)}
            />
            )}
            {currentScreen === 3 && (
                <MainGoal
                answers={answers}
                handleChange={handleChange}
                nextScreen={nextScreen}
                previousScreen={() => setCurrentScreen(currentScreen - 1)}
                setCurrentScreen={setCurrentScreen}
                finishSurvey={finishSurvey}
                />
            )}
            {currentScreen === 4 && (
                <Approach 
                answers={answers}
                handleChange={handleChange}
                nextScreen={nextScreen}
                previousScreen={() => setCurrentScreen(currentScreen - 1)}
                finishSurvey={finishSurvey}
                />
            )}

            {currentScreen === 5 && (
                <FinalScreen 
                calories={calories}
                nextScreen={nextScreen}
                />
            )}
            
        </div>
    );
}

export default Survey;