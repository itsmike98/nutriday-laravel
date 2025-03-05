import React from "react";
import { useState } from "react";
import Layout from "../Layouts/Layout";
import MealTable from "./MealTable";
import Popup from "reactjs-popup";

function Aliment() {
    // estado para controlar los meals
    const [meal, setMeal] = useState([]);
    // estado para controlar el input del nombre del meal
    const [inputValue, setInputValue] = useState('');
    // estado para controlar la fecha
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleMeal = (close) => {
        setMeal([...meal, <MealTable mealTitle={inputValue} key={meal.length} />]);
        setInputValue(''); // Limpiar el input después de agregar la comida
        close();
    };

    // Función para cambiar la fecha
    function changeDate(days) {
        setSelectedDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + days);

            const actualDate = new Date();

            if(actualDate < newDate){
                return prevDate;
            }else{
                return newDate;
            }
        });
    };

    const meals = ['meal1', 'meal2', 'meal3', 'meal4', 'meal5', 'meal6', 'meal7', 'meal8', 'meal9', 'meal10'];
    
    //hay una libreria que te puede hacer el formateo de las fechas, se llama date-fns.
    //Ahora tengo que formatear la fecha para que sea igual a la de la api.
    //peticion para recojer los datos de la taba meals.
    React.useEffect(() => {
        axios.get("/user-meals/{selectedDate}").then((response) => {
          console.log(response.data);
        });
      }, []);

    return (
        <>
            <div className="bg-[#222] rounded-lg p-10 my-5">
                <div className="flex justify-between items-center pb-5">
                    <h3 className='font-semibold text-[1.3em]'>Food log</h3>
                    <div className="flex items-center gap-2">
                        <button onClick={() => changeDate(-1)} className="material-icons">chevron_left</button>
                        <span className="font-bold">{selectedDate.toLocaleDateString()}</span>
                        <button onClick={() => changeDate(1)} className="material-icons">chevron_right</button>
                    </div>

                </div>
                <hr className='pb-5' />

                {/* COLUMNS */}
                <div className="mb-10">
                    <table className="meal-table">
                        <thead>
                            <tr className="columns">
                                <th className="meal-title bg-transparent"></th>
                                <th data-full="Calories" data-short="Cal"></th>
                                <th data-full="Carbs" data-short="Carb"></th>
                                <th data-full="Fats" data-short="Fat"></th>
                                <th data-full="Proteins" data-short="Prot"></th>
                                <th data-full="Sodium" data-short="Sod"></th>
                                <th data-full="Sugar" data-short="Su"></th>
                            </tr>
                        </thead>
                    </table>
                    {/* MEALS */}
                    {meals.map((meal, index) => (
                        <MealTable key={index} mealTitle={meal} />
                    ))}
                </div>

                <Popup
                    trigger={<button className="font-normal text-[1.2em] text-[#C1C86D]"> Add new meal </button>}
                    modal
                    nested
                >
                    {close => (
                        <div className="modal w-[400px] h-[250px] flex flex-col justify-around">
                            <div className="header pb-4 border-b-2 border-neutral-600 text-[1.3em] font-semibold"> Add new meal </div>
                            <form>
                                <input
                                    type="text"
                                    name="meal-name"
                                    id="meal-input"
                                    placeholder="Meal name"
                                    className="mt-5"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <div className="actions flex flex-row justify-around gap-5 pt-5">
                                    <button className="nutriday-btn-light w-[50%]" onClick={close}>Cancel</button>
                                    <button className="nutriday-btn-green w-[50%]" onClick={() => handleMeal(close)}>Add new meal</button>
                                </div>
                            </form>
                        </div>
                    )}
                </Popup>
            </div>
        </>
    );
}

Aliment.layout = page => <Layout children={page} />;
export default Aliment;