import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import QuestionButtons from "./questionsButtons";
import "@css/questions.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Survey() {

    //Añadir estilos al body de la pagina
    useEffect(() => {
        document.body.style.backgroundColor = "#2F2F2F";
        document.body.style.height = '100vh';
        document.body.style.display = 'flex';
        document.body.style.justifyContent = 'center';
        document.body.style.alignItems = 'center';
    }, []);

    // Control the current screen (0 = start, 1 = personal info, etc.)
    const [currentScreen, setCurrentScreen] = useState(0);

    // Save the answers
    const [answers, setAnswers] = useState({
        birthYear: "",
        gender: "",
        height: "",
        weight: "",
        activityLevel: "",
        goal: "",
        approach: ""
    });

    // Handle the change of an answer
    const handleChange = (field, value) => {
        console.log(`Setting ${field} to:`, value);
        setAnswers({ ...answers, [field]: value });
    };

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

        if (currentScreen === 3 && answers.goal) {
            if (answers.goal === "Maintain my current weight") {
                finishSurvey(); // Send data to backend
                setCurrentScreen(5); // Go directly to the last screen if the goal is to maintain weight
            } else {
                setCurrentScreen(4); // Go to the new screen if goal is selected
            }
        } else {
            setCurrentScreen(currentScreen + 1);
        }
    };

    // Move to the previous screen (optional)
    const previousScreen = () => {
        if (currentScreen === 5 && answers.goal === "Maintain my current weight") {
            setCurrentScreen(3); // Go back to the goal selection screen if the goal is to maintain weight
        } else {
            setCurrentScreen(currentScreen - 1);
        }
        console.log(currentScreen);
    };

    const finishSurvey = () => {
        axios.post('http://nutriday.local/guardar-datos', answers)
            .then(function (response) {
                console.log("Server response:", response.data);
            })
            .catch(function (error) {
                if (error.response) {
                    console.error("Error sending data:", error.response.data);
                } else {
                    console.error("Error sending data:", error.message);
                }
            });
            
        console.log("Final answers:", answers);
        alert("Survey completed! Wait a second, we are processing your data.");
    };

    const routeToDashboard = () => {
        //redireccion a dashboard
        window.location.href = '/dashboard';
    }

    const activityLevels = [
        { name: "Sedentary", description: "(Little to no exercise)" },
        { name: "Lightly active", description: "(Light exercise 1-3 days/week)" },
        { name: "Moderately active", description: "(Moderate exercise 3-5 days/week)" },
        { name: "Very active", description: "(Hard exercise 6-7 days/week)" },
        { name: "Extremely active", description: "(Twice a day, very intense training sessions.)" }
    ];

    const [startDate, setStartDate] = useState(null);

    const handleDateChange = (date) => {
        setStartDate(date);
        handleChange('birthYear', date.toISOString().split("T")[0]);
    }

    return (
        <div className="">
            {currentScreen === 0 && (
                <div className="shadow-extra-dark text-center w-[500px] h-[650px] rounded-2xl py-5 px-6 pt-20 flex flex-col items-center justify-between">

                    <img src="./assets/images/Imagen-corporativa/Logotipo_blanco.png" className="w-64 h-auto" alt="Logotipo"></img>
                    <div>
                        <h2 className="text-2xl font-semibold pt-10">Welcome to the diet revolution!</h2>
                        <p className="mt-4">We're glad you're here.<br />
                            Let's get to know you a little.</p>
                    </div>
                    <button
                        className="mt-10 w-full py-4 border-4 border-[#C1C86D] text-white rounded-lg bg-transparent hover:bg-[#C1C86D] hover:text-[#2F2F2F] transition-colors duration-300 font-bold"
                        onClick={nextScreen}
                    >
                        Start
                    </button>
                </div>
            )}

            {currentScreen === 1 && (
                <div className="shadow-extra-dark text-center w-[500px] h-[650px] rounded-2xl py-5 pt-10 px-6 flex flex-col items-center justify-between">
                    <div>

                        <h2 className="text-[2em] font-bold mb-4">Thanks, Miguel! <br />
                            Let’s Start with the Basics</h2>
                        <p className="mb-10" >Help us get to know you better by completing these fields.</p>

                        <DatePicker
                            className="text-[#909090] w-full rounded p-2 bg-[#1F1F1F] border-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-transparent mt-5 py-4"
                            placeholderText="Birth date"
                            selected={startDate}
                            onChange={handleDateChange}
                            showYearDropdown
                            dateFormatCalendar="MMMM"
                            yearDropdownItemNumber={80}
                            scrollableYearDropdown
                            minDate={new Date(1950, 0, 1)}
                            maxDate={new Date()}
                        />

                        <select
                            className="text-[#909090] block w-full rounded p-2 bg-[#1F1F1F] border-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-transparent mt-5 py-4"
                            value={answers.gender}
                            onChange={(e) => handleChange("gender", e.target.value)}
                        >
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <input
                            type="number"
                            className="block w-full rounded p-2 mt-5 bg-[#1F1F1F] border-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-transparent placeholder:text-[#909090] py-4"
                            value={answers.height}
                            onChange={(e) => handleChange("height", e.target.value)}
                            placeholder="Height (cm)"
                        />
                        <input
                            type="number"
                            className="mt-5 block w-full rounded p-2 bg-[#1F1F1F] border-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-transparent placeholder:text-[#909090] py-4"
                            value={answers.weight}
                            onChange={(e) => handleChange("weight", e.target.value)}
                            placeholder="Weight (kg)"
                        />
                    </div>
                    <QuestionButtons
                        nextScreen={nextScreen}
                        previousScreen={previousScreen}
                    />
                </div>
            )}

            {currentScreen === 2 && (
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
            )}

            {currentScreen === 3 && (
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
                        nextScreen={nextScreen}
                        previousScreen={previousScreen}
                    />
                </div>
            )}

            {currentScreen === 4 && (
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
                                    {approach}
                                </button>
                            ))}
                        </div>
                    </div>

                    <QuestionButtons
                        nextScreen={nextScreen}
                        previousScreen={previousScreen}
                        sendData={finishSurvey}
                    />
                </div>
            )}

            {currentScreen === 5 && (
                <div className="shadow-extra-dark w-[500px] h-[650px] rounded-2xl py-5 pt-10 px-6 flex flex-col items-center justify-between">
                    <h2 className="text-[2em] font-bold">We’re ready to start!</h2>
                    {/* contenedor principal */}
                    <div className="flex flex-col">
                        {/* fila */}
                        <div className="flex flex-row gap-10 bg-slate-600 items-center">
                        <img src="./assets/images/icons/apple-icon.png" alt="apple-icon"  />
                            <div className="flex flex-col">
                                <p>Calorias calculadas:</p>
                                <p className="text-[2em] font-bold">
                                    2344 <span className="text-base font-normal">kcal</span>
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* arreglar boton para que finalice el cuestionario */}
                    <QuestionButtons
                        previousScreen={previousScreen}
                        routeToDashboard={routeToDashboard}
                    />
                </div>
            )}
        </div>
    );
}

export default Survey;