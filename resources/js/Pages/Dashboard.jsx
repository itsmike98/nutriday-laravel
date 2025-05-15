import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Layout from './Layouts/Layout';
import { Head, usePage } from '@inertiajs/react';
import Navigation from './Generic_components/Navigation';
import Calories from './Dashboard_components/Calories';
import { useState, useEffect, useRef } from "react";
import { formatDate } from "../hooks/formatDate.jsx";
import axios from 'axios';
import Macronutrients from './Dashboard_components/Macronutrients';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import RecipeIdea from './Dashboard_components/RecipeIdea';
import "../../css/dashboard.css";
import Water from './Dashboard_components/Water';
import FollowUp from './Dashboard_components/FollowUp';

function Dashboard() {
    const { auth } = usePage().props;
    const [todayTotals, setTodayTotals] = useState([]);
    const [userPhysicalData, setUserPhysicalData] = useState([]);
    const name = auth.user.name.split(" ")[0];
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        const date = new Date();
        const formattedDate = formatDate(date.toLocaleDateString('en-US'));
        setFormattedDate(formattedDate);

        axios.get(`/user-meals/totals/${formattedDate}`).then((res) => {
            setTodayTotals(res.data);
        });

        axios.get("/user-data").then((res) => {
            setUserPhysicalData(res.data);
        });
    }, []);

    return (
        <>
            <Head title="Dashboard" />
            <div
                className="dashboard-container"
            >

                {/* Calories*/}
                <div

                className="card calories">
                    <div>
                        <div className='card-title'>
                            <h3 className=''>Calories</h3>

                            <Tippy
                                content={
                                    <div className="tippy-box">
                                        <h3 className="tippy-title">Calorie information</h3>
                                        <hr />
                                        <p className="">
                                            This section helps you track your daily calorie intake compared to your personal goal.
                                        </p>
                                        <br />
                                        <ul className="">
                                            <li><strong className="text-avocado">Calories consumed:</strong> The total calories you’ve eaten today based on the foods you've logged.</li>
                                            <li><strong className="text-avocado">Daily goal:</strong> The target number of calories you should consume in a day, based on your physical data and activity level.</li>
                                            <li><strong className="text-avocado">Remaining calories:</strong> The difference between your goal and what you've consumed so far. It shows how much more you can eat today.</li>
                                        </ul>
                                    </div>
                                }
                                placement="bottom"
                            >
                                <button className="material-icons text-2xl">info</button>
                            </Tippy>

                        </div>

                        <hr />
                        <Calories todayTotals={todayTotals} userPhysicalData={userPhysicalData} />
                    </div>
                </div>

                {/* WATER*/}
                <div className='card water'>
                    <div>
                        <div className='card-title'>
                            <h3 className=''>Water</h3>

                            <Tippy
                                content={
                                    <div className="tippy-box">
                                        <h3 className="tippy-title">Water Information</h3>
                                        <hr />
                                        <p className="">
                                            Track your water intake and see how much more you need to reach your daily hydration goal.
                                        </p>
                                        <br />
                                        <ul className="">
                                            <li><strong className="text-avocado">Water consumed:</strong> The total amount of water you’ve drunk today.</li>
                                            <li><strong className="text-avocado">Hydration goal:</strong> The target amount of water you should consume in a day based on your physical data.</li>
                                            <li><strong className="text-avocado">Remaining water:</strong> The difference between your hydration goal and what you've consumed so far.</li>
                                        </ul>
                                    </div>
                                }
                                placement="bottom"
                            >
                                <button className="material-icons text-2xl">info</button>
                            </Tippy>
                        </div>
                        <hr />
                        <Water formattedDate={formattedDate} />
                    </div>
                </div>

                {/* Macronutrients */}
                <div className='card macronutrients'>
                    <div>
                        <div className='card-title'>
                            <h3 className=''>Macronutrients</h3>

                            <Tippy
                                content={
                                    <div className="tippy-box">
                                        <h3 className="tippy-title">Macronutrients Information</h3>
                                        <hr />
                                        <p className="">
                                            Learn about the macronutrients (carbs, protein, fats) in your meals and track your daily intake.
                                        </p>
                                        <br />
                                        <ul className="">
                                            <li><strong className="text-avocado">Carbs:</strong> The total amount of carbohydrates you’ve consumed today.</li>
                                            <li><strong className="text-avocado">Protein:</strong> The total amount of protein you’ve consumed today.</li>
                                            <li><strong className="text-avocado">Fats:</strong> The total amount of fat you’ve consumed today.</li>
                                        </ul>
                                    </div>
                                }
                                placement="bottom"
                            >
                                <button className="material-icons text-2xl">info</button>
                            </Tippy>
                        </div>

                        <hr />
                        <Macronutrients todayTotals={todayTotals} />
                    </div>
                </div>

                {/* RECIPE IDEA*/}
                <div className='card recipe-idea'>
                    <div>
                        <div className='card-title'>
                            <h3 className=''>Recipe idea</h3>
                        </div>
                        <hr />
                        {/* <RecipeIdea /> */}
                    </div>
                </div>

                {/* FOLLOW-UP */}
                <div className='card follow-up'>
                    <div>
                        <div className='card-title'>
                            <h3>Follow-up</h3>
                        </div>
                        <hr />
                        <FollowUp/>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = page => <Layout children={page} />;
export default Dashboard;