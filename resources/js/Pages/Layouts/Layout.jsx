import { Link } from "@inertiajs/react";
import Navigation from "../Generic_components/Navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
    useEffect(() => {
        document.body.style.backgroundColor = "#333";
    }, []);
    return (
        <>
            <header className="flex justify-between items-center bg-[#1a1a1a] p-4 md:p-6 text-white">
                {/* Logo */}
                <div className="text-2xl font-bold flex items-center">
                    Nutriday<span className="text-[#C1C86D] text-2xl">🥑</span>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-6">
                    <span className="font-bold">22/10/2024</span>
                    <Link href="/settings" className="text-gray-400 hover:text-white">Settings</Link>
                    <Link href="/logout" className="text-gray-400 hover:text-white">Log out</Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-4 md:mx-16 lg:mx-32 mt-20">
                <Navigation/>
                {children}
            </main>
        </>
    );
}

