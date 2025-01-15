import React, { useState } from "react";
import Header from "../Components/landing/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "../../../resources/css/landing/landing-styles.css";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import "../Components/landing/counter";

export default function Landing() {
    let chartColors = ["#D06363", "#638FD0", "#8DB768"];

    return (
        <>
            <Header />

            <main className="xl:mx-[10%] lg:mx-[7%] md:mx-[4%] max-sm:mx-[4%] flex flex-col items-center">
                {/* calories section */}
                <div id="calories-section" className="calories-section">
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
                                <span className="kcal-number">000</span>
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
                                breaking down calories and macronutrients so you
                                can meet your daily goals.
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
                                            Carbohydrates
                                        </p>
                                        <p className="font-bold">
                                            00.0<span> g</span>
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
                                            00.0<span> g</span>
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
                                            Carbohydrates
                                        </p>
                                        <p className="font-bold">
                                            00.0<span> g</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
