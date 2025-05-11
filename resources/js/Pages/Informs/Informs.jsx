import Layout from "../Layouts/Layout";
import "../../../css/informs.css";
import "../../../css/dashboard.css";
import TotalCalories from "./Inform_Components/TotalCalories";
import Tippy from "@tippyjs/react";
import WeightProgress from "./Inform_Components/WeightProgress";
import MacronutrientsAvg from "./Inform_Components/MacronutrientsAvg";

function Informs() {

    return (
        <>
            <div className="informs-container">
                <div className="card">
                    <div className="flex flex-row justify-between">
                        <h3 className="card-title">Calorie Consumption vs. Daily Goal</h3>
                        <Tippy
                            content={
                                <div className="tippy-box">
                                    <h3 className="tippy-title">Calorie Chart Info</h3>
                                    <hr />
                                    <p className="">
                                        This chart shows your calorie intake over the last 15 days and how it compares to your daily goal.
                                    </p>
                                    <br />
                                    <ul className="">
                                        <li>
                                            <strong className="text-avocado">Red line (Calories consumed):</strong> Your actual total calorie intake per day based on logged meals.
                                        </li>
                                        <li>
                                            <strong className="text-avocado">Blue line (Daily goal):</strong> Your personalized daily calorie target based on your physical stats and activity level.
                                        </li>
                                        <li>
                                            <strong className="text-avocado">Interpretation:</strong> Days when the red line is below the blue line mean you stayed under your goal; above it means you exceeded it.
                                        </li>
                                    </ul>
                                </div>
                            }
                            placement="bottom"
                        >
                            <button className="material-icons text-2xl">info</button>
                        </Tippy>

                    </div>

                    <hr />
                    <TotalCalories />
                </div>
                <div className="card">
                    <div className="flex flex-row justify-between">
                        <h3 className="card-title">Macronutrients average</h3>
                        <Tippy
                            content={
                                <div className="tippy-box">
                                    <h3 className="tippy-title">Calorie Chart Info</h3>
                                    <hr />
                                    <p className="">
                                        This chart shows your calorie intake over the last 15 days and how it compares to your daily goal.
                                    </p>
                                    <br />
                                    <ul className="">
                                        <li>
                                            <strong className="text-avocado">Red line (Calories consumed):</strong> Your actual total calorie intake per day based on logged meals.
                                        </li>
                                        <li>
                                            <strong className="text-avocado">Blue line (Daily goal):</strong> Your personalized daily calorie target based on your physical stats and activity level.
                                        </li>
                                        <li>
                                            <strong className="text-avocado">Interpretation:</strong> Days when the red line is below the blue line mean you stayed under your goal; above it means you exceeded it.
                                        </li>
                                    </ul>
                                </div>
                            }
                            placement="bottom"
                        >
                            <button className="material-icons text-2xl">info</button>
                        </Tippy>

                    </div>
                    <hr />
                    <MacronutrientsAvg/>
                </div>
                <div className="card expanded">
                    <div className="flex flex-row justify-between">
                        <h3 className="card-title">Weight progress</h3>
                        <Tippy
                            content={
                                <div className="tippy-box">
                                    <h3 className="tippy-title">Calorie Chart Info</h3>
                                    <hr />
                                    <p className="">
                                        This chart shows your calorie intake over the last 15 days and how it compares to your daily goal.
                                    </p>
                                    <br />
                                    <ul className="">
                                        <li>
                                            <strong className="text-avocado">Red line (Calories consumed):</strong> Your actual total calorie intake per day based on logged meals.
                                        </li>
                                        <li>
                                            <strong className="text-avocado">Blue line (Daily goal):</strong> Your personalized daily calorie target based on your physical stats and activity level.
                                        </li>
                                        <li>
                                            <strong className="text-avocado">Interpretation:</strong> Days when the red line is below the blue line mean you stayed under your goal; above it means you exceeded it.
                                        </li>
                                    </ul>
                                </div>
                            }
                            placement="bottom"
                        >
                            <button className="material-icons text-2xl">info</button>
                        </Tippy>

                    </div>
                    <hr />0
                    <WeightProgress />
                </div>
            </div>
        </>
    );
}

Informs.layout = (page) => <Layout children={page} />;
export default Informs;