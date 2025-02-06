import React, { useEffect, useRef } from "react";
import "@css/landing/text-reveal.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TextRevealSection() {
    useEffect(() => {
        const linesContainer = document.querySelector(".lines");
        const lines = Array.from(linesContainer.querySelectorAll("h2"));
        const trigger = document.querySelector(".text");

        lines.forEach((line) => {
            gsap.to(line, {
                backgroundPositionX: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: line,
                    markers: true,
                    scrub: 1,
                    start: "top center",
                    end: "bottom center",
                },
            });
        });

        gsap.to(".text", {
            scrollTrigger: {
                trigger: ".text",
                pin: true, // Pinnea el contenedor .text
                start: "top top", // Comienza cuando el contenedor .text llega a la parte superior de la pantalla
                end: "+=100%", // Pinnea durante toda la altura del contenedor
                scrub: true, // Sincroniza la animación con el desplazamiento
                markers: false, // Muestra los marcadores para el control visual
            },
        });
    }, []);
    return (
        <div className=" scroll-container h-[170vh] ">
            <div className="text h-screen flex items-center justify-center w-full">
                <div className="lines">
                    <h2>Your journey to</h2>
                    <h2>a healthier life</h2>
                    <h2>starts here.</h2>
                </div>
            </div>
        </div>
    );
}
