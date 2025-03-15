import React from "react";

const Navigation = ({ page }) => {
    // Función para determinar si un botón es activo
    const isActive = (name) => name === page ? "border-b-4 border-[#C1C86D]" : "hover:border-b-4 hover:border-x-zinc-500";

    return (
        <div className="mx-auto w-full">
            <div className="overflow-hidden bg-[#222] shadow-sm sm:rounded-lg flex flex-row gap-10 px-6">
                <button className={`bg-transparent py-4 px-4 ${isActive("Dashboard")}`} onClick={() => window.location.href = '/dashboard'}>
                    Dashboard
                </button>
                <button className={`bg-transparent py-4 px-4 ${isActive("Aliment")}`} onClick={() => window.location.href = '/aliment'}>
                    Aliment
                </button>
                <button className={`bg-transparent py-4 px-4 ${isActive("Informs")}`} onClick={() => window.location.href = '/informs'}>
                    Informs
                </button>
                <button className={`bg-transparent py-4 px-4 ${isActive("Profile")}`} onClick={() => window.location.href = '/profile'}>
                    Profile
                </button>
            </div>
        </div>
    );
};

export default Navigation;
