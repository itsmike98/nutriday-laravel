import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Layout from './Layouts/Layout';
import { Head, usePage } from '@inertiajs/react';
import Navigation from './Generic_components/Navigation';
import Calories from './Dashboard_components/Calories';
import { useState, useEffect } from "react";
import { formatDate } from "../hooks/formatDate.jsx";
import axios from 'axios';
import Macronutrients from './Dashboard_components/Macronutrients';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import RecipeIdea from './Dashboard_components/RecipeIdea';

function Dashboard() {
    const { auth } = usePage().props;
    const [todayTotals, setTodayTotals] = useState([]);
    const [userPhysicalData, setUserPhysicalData] = useState([]);
    const name = auth.user.name.split(" ")[0];

    useEffect(() => {
        const date = new Date();
        const formattedDate = formatDate(date.toLocaleDateString('en-US'));

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
            <div className='w-full flex flex-col items-center'>
                <div className="pb-12 max-w-7xl w-full flex flex-col">

                    {/* Calories & Water */}
                    <div className='flex flex-row gap-5 pt-5'>
                        <div className='bg-[#222] w-[65%] rounded-lg px-10 py-5 h-[400px] box-border '>
                            <div className='flex flex-row justify-between items-center pb-5'>
                                <h3 className='font-semibold text-[1.3em] text-white'>Calories</h3>

                                <Tippy
                                    content={
                                        <div className="p-4 w-70">
                                            <h3 className="text-lg font-semibold text-white mb-2">Calorie Information</h3>
                                            <p className="text-sm text-white mb-4">
                                                This section helps you track your daily calorie intake compared to your personal goal.
                                            </p>
                                            <ul className="list-none pl-4 space-y-2 text-sm text-white">
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

                            <hr className='pb-5 border-gray-600' />
                            <Calories todayTotals={todayTotals} userPhysicalData={userPhysicalData} />
                        </div>

                        <div className='bg-[#222] w-[35%] rounded-lg px-10 py-5 h-[400px] box-border'>
                            <div className='flex flex-row justify-between items-center pb-5'>
                                <h3 className='font-semibold text-[1.3em] text-white'>Water</h3>

                                <Tippy
                                    content={
                                        <div className="p-4 w-70">
                                            <h3 className="text-lg font-semibold text-white mb-2">Water Information</h3>
                                            <p className="text-sm text-white mb-4">
                                                Track your water intake and see how much more you need to reach your daily hydration goal.
                                            </p>
                                            <ul className="list-none pl-4 space-y-2 text-sm text-white">
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

                            <hr className='pb-5 border-gray-600' />
                            {/* Water content here */}
                        </div>
                    </div>

                    {/* Macronutrients */}
                    <div className='bg-[#222] w-full rounded-lg px-10 py-5 h-[400px] my-5 box-border'>
                        <div className='flex flex-row justify-between items-center pb-5'>
                            <h3 className='font-semibold text-[1.3em] text-white'>Macronutrients</h3>

                            <Tippy
                                content={
                                    <div className="p-4 w-70">
                                        <h3 className="text-lg font-semibold text-white mb-2">Macronutrients Information</h3>
                                        <p className="text-sm text-white mb-4">
                                            Learn about the macronutrients (carbs, protein, fats) in your meals and track your daily intake.
                                        </p>
                                        <ul className="list-none pl-4 space-y-2 text-sm text-white">
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

                        <hr className='pb-5 border-gray-600' />
                        <Macronutrients todayTotals={todayTotals} />
                    </div>

                    {/* Food Log & Follow-up */}
                    <div className='flex flex-row gap-5 pb-5'>
                        <div className='bg-[#222] w-[35%] rounded-lg px-10 py-5 h-96 box-border'>
                            <h3 className='font-semibold text-[1.3em] pb-5 text-white'>Recipe idea</h3>

                            <hr className='pb-5 border-gray-600' />
                            <RecipeIdea />
                        </div>
                        <div className='bg-[#222] w-[65%] rounded-lg px-10 py-5 h-96 box-border'>
                            <h3 className='font-semibold text-[1.3em] pb-5 text-white'>Follow-up</h3>
                            <hr className='pb-5 border-gray-600' />
                            {/* Follow-up content */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = page => <Layout children={page} />;
export default Dashboard;