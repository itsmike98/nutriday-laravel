import React, { useState } from "react";
import { Link, usePage } from '@inertiajs/react';
import '../../../css/nav-menu.css';

const Navigation = () => {
    const { url } = usePage(); // url actual para marcar activo
    const [isOpen, setIsOpen] = useState(false); // estado del menú móvil

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="nav-container">
            <button className="hamburger" onClick={toggleMenu}>
                ☰
            </button>
            <nav className={isOpen ? "open" : ""}>
                <Link href="/dashboard" className={url === "/dashboard" ? "item active" : "item"}>
                    Home
                </Link>
                <Link href="/food-log" className={url === "/food-log" ? "item active" : "item"}>
                    Food Log
                </Link>
                <Link href="/informs" className={url === "/informs" ? "item active" : "item"}>
                    Informs
                </Link>
                <Link href="/profile" className={url === "/profile" ? "item active" : "item"}>
                    Profile
                </Link>
            </nav>
        </div>
    );
};

export default Navigation;
