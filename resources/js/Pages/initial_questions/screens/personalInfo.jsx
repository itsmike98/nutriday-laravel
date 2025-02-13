// screens/PersonalInfoScreen.js
import React, { useState } from 'react';
import QuestionButtons from '../questionsButtons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PersonalInfoScreen = ({ answers, handleChange, nextScreen, previousScreen }) => {
    // Definir el estado para la fecha de nacimiento
    const [startDate, setStartDate] = useState(null);

    // Manejar el cambio de fecha
    const handleDateChange = (date) => {
        setStartDate(date);
        handleChange('birthYear', date.toISOString().split("T")[0]); // Guardar el año de nacimiento en las respuestas
    };

    return (
        <div className="shadow-extra-dark text-center w-[500px] h-[650px] rounded-2xl py-5 pt-10 px-6 flex flex-col items-center justify-between">
            <div>
                <h2 className="text-[2em] font-bold mb-4">Thanks, Miguel! <br />
                    Let’s Start with the Basics</h2>
                <p className="mb-10">Help us get to know you better by completing these fields.</p>

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
    );
};
export default PersonalInfoScreen;