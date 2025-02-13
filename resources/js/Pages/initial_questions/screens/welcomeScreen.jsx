// WelcomeScreen.js
import React from 'react';

const WelcomeScreen = ({ nextScreen }) => {
    return (
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
    );
};
export default WelcomeScreen;