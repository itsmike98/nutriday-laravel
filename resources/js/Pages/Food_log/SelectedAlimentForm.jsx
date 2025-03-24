import { useState, useEffect } from "react";
import { SyncLoader } from "react-spinners";

export default function SelectedAlimentForm({ selectedAliment, selectedAlimentIsLoading, mealId }) {
    const [foodServing, setFoodServing] = useState(null);
    // Estado para controlar el despliegue
    const [isExpanded, setIsExpanded] = useState(false);
    // Estado para manejar los meals del dia en el form
    const [dailyMeals, setDailyMeals] = useState([]);

    useEffect(() => {

        const date = new Date().toISOString().split('T')[0];

        axios.get(`/user-meals/${date}`)
            .then(function (response) {
                setDailyMeals(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        if (!selectedAliment || !selectedAliment.servings || !selectedAliment.servings.serving) {
            return;
        }

        let servingsArrays = selectedAliment.servings.serving;
        let foundServing = servingsArrays.find(serving => serving.serving_description === "100 g") || servingsArrays[0];

        setFoodServing(foundServing);
    }, [selectedAliment]);

    const toggleExpanded = () => setIsExpanded(!isExpanded);


    function handleSelectedAlimentForm(event) {
        event.preventDefault();

        if (!selectedAliment) {
            return;
        }
        const portion = event.target.portion.value;
        const mealIdSelected = event.target.mealselected.value;
        const unitSelected = event.target.unitselected.value;
        console.log(selectedAliment, mealIdSelected, portion, unitSelected);
    }
    return (
        <div className="flex-grow rounded-[15px] flex flex-col w-full md:w-auto mx-2">
            {/* Formulario */}
            <form onSubmit={handleSelectedAlimentForm} className="flex flex-col gap-4">
                <div className="flex flex-col">
                    {selectedAliment && foodServing ? (
                        <div className="mb-4">
                            {/* Título con botón de despliegue */}
                            <div
                                className="flex flex-row bg-[#222] p-4 rounded-lg shadow-md cursor-pointer hover:bg-[#333] transition"
                                onClick={toggleExpanded}
                            >
                                <div className="flex flex-col w-full">
                                    <h5 className="text-lg font-semibold mb-2 text-avocado text-center">
                                        {selectedAliment.food_name}
                                    </h5>
                                    <p className="text-gray-400 text-sm text-center">
                                        {isExpanded ? "Hide details" : "Show nutritional info"}
                                    </p>
                                </div>
                                <span className="material-icons text-avocado !text-4xl">
                                    {isExpanded ? "remove" : "add"}
                                </span>
                            </div>
                            {/* Información detallada (oculta por defecto) */}
                            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? "max-h-[500px]" : "max-h-0"}`}>
                                <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-md mt-4 flex flex-col items-center">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-5">
                                        <div className="text-sm flex flex-col items-center text-center gap-1">
                                            <span className="material-icons text-yellow-400 text-2xl">local_fire_department</span>
                                            <strong className="hidden md:inline">Calories:</strong>
                                            <strong className="md:hidden">Kcal:</strong>
                                            {foodServing.calories} kcal
                                        </div>
                                        <div className="text-sm flex flex-col items-center text-center gap-1">
                                            <span className="material-icons text-red-400 text-2xl">fitness_center</span>
                                            <strong className="hidden md:inline">Protein:</strong>
                                            <strong className="md:hidden">Prot:</strong>
                                            {foodServing.protein} g
                                        </div>
                                        <div className="text-sm flex flex-col items-center text-center gap-1">
                                            <span className="material-icons text-green-400 text-2xl">spa</span>
                                            <strong className="hidden md:inline">Fat:</strong>
                                            <strong className="md:hidden">Fat:</strong>
                                            {foodServing.fat} g
                                        </div>
                                        <div className="text-sm flex flex-col items-center text-center gap-1">
                                            <span className="material-icons text-orange-400 text-2xl">bakery_dining</span>
                                            <strong className="hidden md:inline">Carbs:</strong>
                                            <strong className="md:hidden">Carb:</strong>
                                            {foodServing.carbohydrate} g
                                        </div>
                                        <div className="text-sm flex flex-col items-center text-center gap-1">
                                            <span className="material-icons text-blue-400 text-2xl">science</span>
                                            <strong className="hidden md:inline">Sodium:</strong>
                                            <strong className="md:hidden">Na:</strong>
                                            {foodServing.sodium} mg
                                        </div>
                                        <div className="text-sm flex flex-col items-center text-center gap-1">
                                            <span className="material-icons text-green-500 text-2xl">grass</span>
                                            <strong className="hidden md:inline">Fiber:</strong>
                                            <strong className="md:hidden">Fib:</strong>
                                            {foodServing.fiber} g
                                        </div>
                                        <div className="text-sm flex flex-col items-center text-center gap-1">
                                            <span className="material-icons text-pink-400 text-2xl">icecream</span>
                                            <strong className="hidden md:inline">Sugar:</strong>
                                            <strong className="md:hidden">Sug:</strong>
                                            {foodServing.sugar} g
                                        </div>
                                        <div className="text-sm flex flex-col items-center text-center gap-1">
                                            <span className="material-icons text-gray-400 text-2xl">scale</span>
                                            <strong className="hidden md:inline">Serving Size:</strong>
                                            <strong className="md:hidden">Size:</strong>
                                            {foodServing.serving_description}
                                        </div>
                                    </div>
                                    <span className="font-bold text-avocado text-opacity-60 text-xs">Nutritional info per {foodServing.serving_description.replace(" ", "")}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        selectedAlimentIsLoading ? (
                            <div className="bg-[#222] p-2 rounded-lg mb-5 flex py-7 justify-center">
                                <SyncLoader
                                    color="#C1C86D"
                                    cssOverride={{}}
                                    margin={5}
                                />
                            </div>
                        ) : (
                            <div className="bg-[#222] p-2 rounded-lg mb-5 py-7">
                                <p className="text-avocado text-center font-semibold">Select an aliment</p>
                            </div>
                        )
                    )}
                    {/* Select meal */}
                    <label className="text-white mb-1">Select meal</label>
                    <select 
                        name="mealselected" 
                        className="bg-[#333] text-white p-2 rounded-md border border-[#444] py-2 text-center"
                        required
                        >
                        {dailyMeals
                            //ordenamos los meals para que aparezca primero al que hemos clicado
                            .sort((a, b) => {
                                if (a.id === mealId) return -1;
                                if (b.id === mealId) return 1;
                                return 0;
                            }
                            )
                            .map(meal => (
                                <option key={meal.id} value={meal.id}>{meal.meal_name}</option>
                            ))}
                    </select>
                </div >

                {/* Inputs */}
                < div className="flex flex-col md:flex-row items-center gap-2 w-full" >
                    <input
                        name="portion"
                        type="text"
                        placeholder="Portion"
                        className="bg-[#333] text-white p-2 rounded-md border border-[#444] text-center w-full"
                        required
                    />
                    <span className="text-white">of</span>
                    <select
                        name="unitselected"
                        className="bg-[#333] text-white p-2 rounded-md border border-[#444] w-full text-center"
                        required
                    >
                        <option value="" disabled selected>unit</option> {/* Esta es la opción placeholder */}
                        <option value="gramos">gramos</option>
                        <option value="mililitros">mililitros</option>
                        <option value="porciones">porciones</option>
                    </select>

                </div >

                {/* Botón */}
                < div className="flex justify-between mt-4" >
                    <button
                        type="submit"
                        className="bg-[#C1C86D] text-[#222] font-bold px-4 rounded-md w-full py-3"
                    >
                        Add to the register
                    </button>
                </div >
            </form >
        </div >
    );
}
