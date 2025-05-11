import { Link, usePage } from "@inertiajs/react";
import Navigation from "../Generic_components/Navigation";
import { useEffect } from "react";

export default function Layout({ children }) {

    useEffect(() => {
        document.body.style.backgroundColor = "#333";
    }, []);

    function logout() {
        axios.post('/logout')
            .then(response => {
                window.location.href = '/';
            })
            .catch(error => {
                console.error('Logout failed:', error);
            });
    }

    return (
        <>
            <header className="flex justify-between items-center bg-[#1a1a1a] p-2 px-4 md:px-16 lg:px-32 text-white">
                {/* Logo */}
                <div className="text-2xl font-bold flex items-center">
                    <a href="/dashboard">
                        <img src="assets/images/Imagen-corporativa/nav-logotipo.png" alt="nutriday-logo" className="w-32" />
                    </a>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-6">
                    <span className="text-gray-400 hover:text-white transition" >07/05/2025</span>
                    <button onClick={logout} className="text-gray-400 hover:text-white transition">Log out</button>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-4 md:mx-16 lg:mx-32 mt-10">
                <Navigation />
                {children}
            </main>
            {/* Footer */}
            <footer className="bg-[#1a1a1a] text-gray-400 text-sm mt-16 py-6 px-4 md:px-16 lg:px-32">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© 2025 NutriDay — Developed by Miguel Gutiérrez Moreno</p>
                    <div className="flex items-center gap-4">
                        <Link href="/contacto" className="hover:text-white transition">Contact</Link>
                        <span className="italic text-xs">"Take care of your body, it's the only place you have to live."</span>
                    </div>
                </div>
            </footer>
        </>
    );
}
