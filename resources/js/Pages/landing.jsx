import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import Header from "../Components/landing/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "@css/landing/calories-section-styles.css";
import "@css/landing/reach-your-goals-styles.css";
import "@css/landing/nav-bar.css";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import "../Components/landing/counter";
import TextRevealSecction from "@/Components/landing/TextRevealSecction";

export default function Landing({ loginRoute, registerRoute }) {
    let chartColors = ["#D06363", "#638FD0", "#8DB768"];


    useEffect(() => {
        const floatingImages = gsap.utils.toArray(".floating-img");

        floatingImages.forEach((img) => {
            gsap.to(img, {
                y: () => gsap.utils.random(-80, 80), // sube y baja entre -20 y +20 px
                x: () => gsap.utils.random(-30, 30), // opcional: mueve un poco en horizontal
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                duration: () => gsap.utils.random(2, 4), // duración entre 2 y 4 seg
                delay: () => gsap.utils.random(0, 4), // desincroniza
            });
        });
    }, []);


    return (
        <>
            <nav>
                <div className="nav-container">
                    <div>
                        <img src="assets/images/Imagen-corporativa/nav-logotipo.png" alt="nutriday_logo" className="h-14" />
                    </div>
                    <div>
                        <a href={loginRoute} className="nav-item">Login</a>
                        <span>|</span>
                        <a href={registerRoute} className="nav-item">Register</a>
                    </div>
                </div>
            </nav>

            {/* enviando el prop de la ruta de login para usarlo en el header */}
            <Header loginRoute={loginRoute} />

            <main>
                {/* texto inicial con efecto scroll */}
                <TextRevealSecction />
                {/* contenedor principal con margenes */}
                <div className="xl:mx-[10%] lg:mx-[7%] md:mx-[4%] max-sm:mx-[4%] flex flex-col items-center mt-32">
                    {/* calories section */}
                    <div
                        id="calories-section"
                        className="calories-section pt-32"
                    >
                        <div id="left-side" className="left-side">
                            <div
                                id="swiper-container"
                                className="swiper-container "
                            >
                                <Swiper
                                    modules={[Autoplay]}
                                    className="swiper"
                                    direction={"vertical"}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    loop={true}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                //onSlideChangeTransitionStart={handleSlideChange}
                                >
                                    <SwiperSlide className="slide-img">
                                        <img src="/assets/images/mid-meal-take-control1.png" />
                                    </SwiperSlide>
                                    <SwiperSlide className="slide-img">
                                        <img src="/assets/images/mid-meal-take-control2.png" />
                                    </SwiperSlide>
                                    <SwiperSlide className="slide-img">
                                        <img src="/assets/images/mid-meal-take-control3.png" />
                                    </SwiperSlide>
                                    <SwiperSlide className="slide-img">
                                        <img src="/assets/images/mid-meal-take-control4.png" />
                                    </SwiperSlide>
                                    <SwiperSlide className="slide-img">
                                        <img src="/assets/images/mid-meal-take-control5.png" />
                                    </SwiperSlide>
                                    <SwiperSlide className="slide-img">
                                        <img src="/assets/images/mid-meal-take-control6.png" />
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                            <div className="chart-container">
                                <Doughnut
                                    className="donut"
                                    data={{
                                        labels: ["A", "B", "C"],
                                        datasets: [
                                            {
                                                data: [200, 300, 400],
                                                backgroundColor: chartColors,
                                                borderRadius: 1000,
                                                borderWidth: 0,
                                                circumference: 180,
                                                cutout: "80%",
                                                rotation: 0,
                                                responsive: true,
                                            },
                                        ],
                                    }}
                                    options={{
                                        plugins: {
                                            legend: {
                                                display: false,
                                            },
                                        },
                                    }}
                                />
                            </div>
                            <div className="calories-counter">
                                <span>
                                    kcal <br />
                                    <span className="kcal-number">234</span>
                                </span>
                            </div>
                        </div>
                        <div
                            id="rigth-side"
                            className="right-side flex flex-col h-[100%] md:w-[50%]"
                        >
                            <div className="flex flex-col max-md:items-center">
                                <h2 className="w-[90%] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-nowrap">
                                    Take control of
                                    <br /> your nutrition
                                </h2>
                                <p className="take-control-description pt-5 ">
                                    Track your meals with ease and precision.
                                    NutriDay helps you log each dish, instantly
                                    breaking down calories and macronutrients so
                                    you can meet your daily goals.
                                </p>
                            </div>
                            <div className="flex flex-col max-md:items-center max-md:pb-10">
                                <div id="macronutrients" className="pt-5">
                                    <div id="macro" className="flex">
                                        <div
                                            id="macro-lines"
                                            className="w-[40px] h-[15px] rounded-lg bg-[#D06363] mr-5 mt-2"
                                        ></div>
                                        <div>
                                            <p className="font-semibold text-[#BBBBBB]">
                                                Fats
                                            </p>
                                            <p className="font-bold">
                                                12.5<span> g</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div id="macronutrients" className="pt-5">
                                    <div id="macro" className="flex">
                                        <div
                                            id="macro-lines"
                                            className="w-[40px] h-[15px] rounded-lg bg-[#638FD0] mr-5 mt-2"
                                        ></div>
                                        <div>
                                            <p className="font-semibold text-[#BBBBBB]">
                                                Carbohydrates
                                            </p>
                                            <p className="font-bold">
                                                27.1<span> g</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div id="macronutrients" className="pt-5">
                                    <div id="macro" className="flex">
                                        <div
                                            id="macro-lines"
                                            className="w-[40px] h-[15px] rounded-lg bg-[#8DB768] mr-5 mt-2"
                                        ></div>
                                        <div>
                                            <p className="font-semibold text-[#BBBBBB]">
                                                Proteins
                                            </p>
                                            <p className="font-bold">
                                                43.7<span> g</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* seccion discover de power of nutriday */}
                    <div className="flex flex-col items-center w-[90%] pt-36 ">
                        <h2 className="text-center">
                            Discover the power <br /> of nutriday
                        </h2>
                        <p className="text-center max-w-[500px] pt-10">
                            NutriDay offers a comprehensive suite of features
                            designed to make tracking your meals, reaching your
                            fitness goals, and staying motivated easier than
                            ever.
                        </p>
                        {/* tres columnas */}
                        <div className="columns-3 w-full gap-20 pt-12">
                            <div className="flex flex-col items-center">
                                <svg
                                    version="1.0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100px"
                                    height="100px"
                                    viewBox="0 0 512.000000 512.000000"
                                    preserveAspectRatio="xMidYMid meet"
                                >
                                    <g
                                        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                        fill="#fff"
                                        stroke="none"
                                    >
                                        <path
                                            d="M2492 4643 c-24 -12 -305 -362 -1042 -1302 l-1010 -1286 23 -17 c252
-197 605 -388 937 -508 1057 -381 2250 -211 3173 451 50 36 92 72 92 80 0 8
-450 586 -1000 1286 -724 920 -1010 1277 -1036 1292 -44 25 -92 26 -137 4z
m-504 -1870 c47 -35 67 -71 67 -122 0 -40 -10 -65 -69 -166 -107 -187 -118
-202 -159 -226 -102 -57 -228 28 -215 146 5 37 113 241 179 336 41 59 140 75
197 32z m1292 6 c29 -16 53 -47 101 -128 112 -188 132 -231 126 -275 -6 -46
-31 -82 -78 -114 -42 -29 -111 -26 -155 5 -17 12 -68 87 -119 175 -84 142 -90
157 -90 208 0 41 6 63 22 86 45 63 126 81 193 43z m-669 -81 c68 -38 79 -76
79 -278 0 -153 -2 -179 -20 -215 -54 -111 -212 -111 -264 0 -15 30 -17 64 -14
228 3 180 4 194 25 223 45 63 126 81 194 42z"
                                        />
                                        <path
                                            d="M134 1665 c-65 -85 -123 -168 -128 -184 -24 -82 19 -139 199 -267
565 -401 1212 -648 1905 -729 74 -9 230 -18 345 -22 851 -24 1680 221 2396
709 177 120 246 180 260 227 21 69 7 99 -117 258 -64 81 -119 152 -124 157 -5
5 -34 -11 -67 -36 -386 -293 -866 -520 -1346 -638 -296 -72 -492 -98 -797
-107 -304 -8 -545 12 -830 68 -552 110 -1094 353 -1546 695 l-30 23 -120 -154z"
                                        />
                                    </g>
                                </svg>
                                <h3 className="font-bold text-[1.1em] mt-5">
                                    Track your meals
                                </h3>
                                <p className="text-center pt-5">
                                    Log your daily meals by manually adding food
                                    items or scanning barcodes for automatic
                                    nutritional information. Get instant
                                    insights into calories and macronutrients,
                                    helping you stay on track.
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <svg
                                    version="1.0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100px"
                                    height="100px"
                                    viewBox="0 0 512.000000 512.000000"
                                    preserveAspectRatio="xMidYMid meet"
                                >
                                    <g
                                        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                        fill="#fff"
                                        stroke="none"
                                    >
                                        <path
                                            d="M2480 4828 c-70 -48 -75 -62 -78 -243 l-3 -164 -37 -6 c-162 -25
-285 -52 -387 -86 -560 -187 -999 -625 -1184 -1184 -34 -102 -61 -225 -86
-387 l-6 -37 -164 -3 c-148 -3 -166 -5 -192 -24 -98 -73 -98 -195 0 -268 26
-19 44 -21 192 -24 l164 -3 6 -37 c40 -261 89 -432 179 -617 220 -453 616
-798 1098 -956 100 -33 223 -60 380 -84 l37 -6 3 -164 c3 -148 5 -166 24 -192
73 -98 195 -98 268 0 19 26 21 44 24 192 l3 164 32 5 c175 27 238 40 314 62
600 174 1066 622 1263 1214 33 98 60 221 85 382 l6 37 164 3 c181 3 195 8 243
78 45 66 23 159 -51 214 -26 19 -44 21 -192 24 l-164 3 -6 37 c-25 162 -52
285 -86 387 -196 588 -663 1036 -1262 1209 -76 22 -139 35 -314 62 l-32 5 -3
164 c-3 148 -5 166 -24 192 -35 48 -82 73 -134 73 -32 0 -57 -7 -80 -22z m-80
-836 l0 -108 -91 -17 c-261 -49 -498 -176 -689 -367 -191 -191 -318 -428 -367
-689 l-17 -91 -109 0 -108 0 6 38 c31 189 72 324 141 469 167 350 495 650 855
782 109 40 292 85 367 90 9 1 12 -27 12 -107z m473 81 c429 -82 827 -379 1050
-783 69 -126 135 -315 157 -455 6 -38 13 -80 16 -92 4 -23 3 -23 -105 -23
l-109 0 -6 48 c-32 220 -140 456 -297 646 -200 242 -512 419 -811 462 l-48 6
0 110 0 109 38 -6 c20 -4 72 -13 115 -22z m-473 -933 l0 -420 -420 0 c-231 0
-420 3 -420 6 0 33 51 188 86 263 131 278 358 466 664 551 36 10 71 19 78 19
9 1 12 -89 12 -419z m435 393 c33 -8 102 -34 154 -59 219 -103 382 -266 485
-485 39 -83 55 -131 80 -241 l6 -28 -420 0 -420 0 0 420 0 420 28 -6 c15 -3
54 -13 87 -21z m-1582 -1224 c49 -261 176 -498 367 -689 191 -191 428 -318
689 -367 l91 -17 0 -108 c0 -107 0 -108 -22 -104 -13 3 -54 10 -93 16 -294 47
-584 200 -816 430 -247 246 -382 518 -444 893 l-6 37 108 0 109 0 17 -91z
m1147 -329 l0 -420 -27 6 c-77 17 -113 27 -160 44 -251 92 -452 276 -567 521
-39 83 -55 131 -80 242 l-6 27 420 0 420 0 0 -420z m1154 393 c-25 -111 -41
-159 -80 -242 -103 -219 -266 -382 -485 -485 -83 -39 -131 -55 -241 -80 l-28
-6 0 420 0 420 420 0 420 0 -6 -27z m542 5 c-3 -13 -10 -57 -17 -98 -16 -102
-72 -275 -125 -387 -147 -307 -420 -581 -727 -727 -113 -54 -286 -110 -387
-125 -41 -7 -85 -14 -97 -17 -23 -4 -23 -3 -23 105 l0 109 48 6 c296 42 610
220 807 456 160 193 269 429 301 653 l6 47 109 0 c108 0 109 0 105 -22z"
                                        />
                                    </g>
                                </svg>
                                <h3 className="font-bold text-[1.1em] mt-5">
                                    Track your meals
                                </h3>
                                <p className="text-center pt-5">
                                    Whether you're aiming to lose weight, gain
                                    muscle, or maintain your fitness, NutriDay
                                    customizes your daily intake targets. Adjust
                                    your diet based on your goals, and receive
                                    recommendations to improve your results.
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <svg
                                    version="1.0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100px"
                                    height="100px"
                                    viewBox="0 0 512.000000 512.000000"
                                    preserveAspectRatio="xMidYMid meet"
                                >
                                    <g
                                        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                        fill="#fff"
                                        stroke="none"
                                    >
                                        <path
                                            d="M2221 4774 c-845 -131 -1547 -740 -1802 -1564 -212 -683 -74 -1434
                                                368 -2013 350 -457 873 -765 1448 -852 147 -22 191 -20 220 10 l25 24 0 2179
                                                0 2179 -21 27 c-18 23 -27 26 -82 25 -34 -1 -104 -7 -156 -15z"
                                        />
                                        <path
                                            d="M2661 4764 c-21 -27 -21 -30 -21 -1051 l0 -1024 25 -24 24 -25 1026
                                                0 1026 0 24 25 c30 29 32 72 10 220 -118 793 -665 1476 -1411 1764 -188 73
                                                -489 141 -624 141 -51 0 -61 -3 -79 -26z"
                                        />
                                        <path
                                            d="M2895 2455 c-17 -16 -25 -35 -25 -57 0 -31 52 -85 648 -681 524 -524
                                                652 -647 673 -647 37 0 67 27 147 133 183 240 315 507 386 782 34 127 66 323
                                                66 397 0 49 -3 59 -26 77 -27 21 -31 21 -936 21 l-909 0 -24 -25z"
                                        />
                                        <path
                                            d="M2665 2225 l-25 -24 0 -911 0 -911 25 -24 c29 -30 76 -32 228 -10
                                                379 57 734 210 1044 452 92 71 113 96 113 133 0 19 -135 160 -647 672 -596
                                                596 -650 648 -681 648 -22 0 -41 -8 -57 -25z"
                                        />
                                    </g>
                                </svg>
                                <h3 className="font-bold text-[1.1em] mt-5">
                                    Track your meals
                                </h3>
                                <p className="text-center pt-5">
                                    Track your progress through interactive
                                    charts and statistics. Visualize your
                                    calorie intake, macronutrient breakdown, and
                                    meal habits over time to make informed
                                    decisions and celebrate your achievements.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="reach-your-goals flex flex-col items-center justify-center h-[800px] w-[100%] relative mt-32">
                    <h2>Ready to reach your goals?</h2>
                    <a href={loginRoute} className="inline-block">
                        <button className="mt-7 font-bold border-4 border-[#c7c7c7] px-8 py-1 rounded-xl hover:bg-[#c7c7c7] hover:px-12 hover:text-stone-900 ease-in duration-300">
                            Join us!
                        </button>
                    </a>
                    <img
                        className="floating-img w-24 absolute left-[5%] bottom-[30%]"
                        src="assets/images/floating-item-1.png"
                    />
                    <img
                        className="floating-img w-16 absolute left-[22%] top-[20%] blur-sm"
                        src="assets/images/floating-item-2.png"
                    />
                    <img
                        className="floating-img w-20 absolute right-[40%] bottom-[20%]"
                        src="assets/images/floating-item-3.png"
                    />
                    <img
                        className="floating-img w-24 absolute right-[5%] top-[30%] blur-[1px]"
                        src="assets/images/floating-item-4.png"
                    />
                    <img
                        className="floating-img w-20 absolute right-[30%] top-[15%] blur-sm"
                        src="assets/images/floating-item-5.png"
                    />
                    <img
                        className="floating-img w-16 absolute left-[25%] bottom-[13%] blur-sm"
                        src="assets/images/floating-item-6.png"
                    />
                    <img
                        className="floating-img w-24 absolute left-[40%] top-[25%] "
                        src="assets/images/floating-item-2.png"
                    />
                    <img
                        className="floating-img w-20 absolute right-[15%] bottom-[20%] blur-[2px] "
                        src="assets/images/floating-item-5.png"
                    />
                </div>
            </main>
        </>
    );
}
