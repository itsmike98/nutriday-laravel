import React from "react";
import { useState } from "react";
import Layout from "../Layouts/Layout";
import MealTable from "./MealTable";
import Popup from "reactjs-popup";
import TotalsTable from "./TotalsTable";

function FoodLog() {
    // estado para controlar los meals
    //const [meal, setMeal] = useState([]);
    // estado para controlar el input del nombre del meal
    const [inputValue, setInputValue] = useState('');
    // estado para controlar la fecha
    const [selectedDate, setSelectedDate] = useState(new Date());
    // estado para controlar los meals de la db
    const [dbMeals, setDbMeals] = useState([]);
    //estado para controlar si se introdujo un nuevo meal y actualizar en funcion de ello
    const [newMeal, setNewMeal] = useState(false);
    //estado para controlar si se eliminó un meal y actualizar en funcion de ello
    const [deleteMeal, setDeleteMeal] = useState(false);
    //estado para controlar si se cambió un meal y actualizar en funcion de ello
    const [changeMeal, setChangeMeal] = useState(false);
    //actualizar alimentos de los meals al cambiar de fecha
    const [updateMeal, setUpdateMeal] = useState(false);
    //Estado para actualizar cuando se añade un nuevo alimento
    const [newAliment, setNewAliment] = useState(false);
    //estado para actualizar los totales
    const [totals, setTotals] = useState(false);

    // Funcion para limitar los dias a -5
    function changeDate(button) {

        if (!button) {
            setSelectedDate(prevDate => {
                const today = new Date();
                const minDate = new Date(today);
                minDate.setDate(today.getDate() - 5); // Limitar a 5 días atrás
                const newDate = new Date(prevDate);
                if (newDate > minDate) { // Solo restar si aún no se ha llegado al límite
                    newDate.setDate(newDate.getDate() - 1);
                }
                return newDate; // Siempre devolver la fecha
            });
        } else {
            setSelectedDate(prevDate => {
                const today = new Date();
                const currentDate = new Date(prevDate);
                const nextDate = new Date(currentDate);
                nextDate.setDate(currentDate.getDate() + 1);
                if (nextDate <= today) {
                    return nextDate;
                } else {
                    return currentDate;
                }
            });
        }
        setUpdateMeal(prev => !prev);
    }

    const handleMeal = (close) => {
        //Enviar nombre del nuevo meal para guardarlo en la database.
        axios.post('/new-meal', {
            meal_name: inputValue
        })
            .then(function (response) {
                console.log("Success response:", response);
                setNewMeal(prevState => !prevState); // Alternar el valor de newMeal
            })
            .catch(function (error) {
                console.log("Error response:", error);
            });
        //setMeal([...meal, <MealTable mealTitle={inputValue} key={meal.length} />]);
        setInputValue(''); // Limpiar el input después de agregar la comida
        close();
    };

    function formatDate(date) {
        const splitedDate = date.split("/");
        const year = splitedDate[2];
        const month = splitedDate[1];
        const day = splitedDate[0];
        return `${year}-${month}-${day}`;
    }

    function handleDeleteMeal(mealId) {
        axios.post('/delete-meal', {
            meal_id: mealId
        })
            .then(function (response) {
                console.log("Success response:", response);
                setDeleteMeal(prevState => !prevState);
            })
            .catch(function (error) {
                console.log("Error response:", error);
            });
    }

    function handleChangeName(event, mealId, newMealName, closePopup) {
        event.preventDefault();
        axios.post('/change-meal-name', {
            meal_id: mealId,
            meal_name: newMealName
        })
            .then(function (response) {
                console.log("Success response:", response);
                setChangeMeal(prevState => !prevState);
            })
            .catch(function (error) {
                console.log("Error response:", error);
            });
        closePopup();
    }

    //peticion para obtener los datos de la taba meals por dia.
    React.useEffect(() => {
        //formato valido para la fecha: 2025-03-05
        axios.get(`/user-meals/${formatDate(selectedDate.toLocaleDateString('en-GB'))}`).then((response) => {
            setDbMeals(response.data);
        });
    }, [selectedDate, newMeal, deleteMeal, changeMeal, newAliment]);

    return (
        <>
            <div className="bg-[#222] rounded-lg p-10 my-5">
                <div className="flex justify-between items-center ">
                    <h3 className='font-bold text-[1.5em]'>Food log</h3>
                    <div className="flex items-center gap-2">
                        <button onClick={() => changeDate(false)} className="material-icons border-2 rounded-full">chevron_left</button>
                        <span className="font-bold text-center min-w-[80px] max-w-[80px] mr-3">
                            {selectedDate.toLocaleDateString('en-GB')}
                        </span>
                        <button onClick={() => changeDate(true)} className="material-icons border-2 rounded-full">chevron_right</button>
                    </div>
                </div>
                <hr className="mb-10" />

                {/* COLUMNS */}
                <div className="mb-10">
                    <table className="meal-table">
                        <thead>
                            <tr className="columns">
                                <th className="meal-title bg-transparent"></th>
                                <th data-full="Quantity" data-short="Qua"></th>
                                <th data-full="Calories" data-short="Cal"></th>
                                <th data-full="Carbs" data-short="Carb"></th>
                                <th data-full="Fats" data-short="Fat"></th>
                                <th data-full="Proteins" data-short="Prot"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* MEALS */}
                            {dbMeals.map((meal, index) => (
                                <MealTable key={`${meal.user_id}-${index}`}
                                    mealTitle={meal.meal_name}
                                    mealId={meal.id}
                                    onDelete={handleDeleteMeal}
                                    onChange={handleChangeName}
                                    updateMeal={updateMeal}
                                    dbMeals={dbMeals}
                                    selectedDate={selectedDate}
                                    formatDate={formatDate}
                                    setNewAliment={setNewAliment}
                                />
                            ))}

                            {/* TOTALS ROW */}
                            <TotalsTable selectedDate={selectedDate} formatDate={formatDate}  newAliment={newAliment}/>
                        </tbody>
                    </table>
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

FoodLog.layout = page => <Layout children={page} />;
export default FoodLog;