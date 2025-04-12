import React, { useEffect, useState } from "react";
import Proteins from "./Macronutrients/Proteins";
import Carbohydrates from "./Macronutrients/Carbohydrates";
import Fats from "./Macronutrients/Fats";

export default function Macronutrients({todayTotals}) {
    const [nutritionGoals, setNutritionGoals] = useState([]);

    useEffect(() => {
        axios.get('/user-data-nutrition').then((res) => {
            setNutritionGoals(res.data);
        });
    }, []);
    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                <div className=""><Proteins nutritionGoals={nutritionGoals} todayTotals={todayTotals} /></div>
                <div className=""><Carbohydrates nutritionGoals={nutritionGoals} todayTotals={todayTotals} /></div>
                <div className=""><Fats nutritionGoals={nutritionGoals} todayTotals={todayTotals} /></div>
            </div>
        </>
    )
}
