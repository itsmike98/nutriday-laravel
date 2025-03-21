import { useState } from "react";
import AlimentItem from "./AlimentItem";
import RotateLoader from "react-spinners/RotateLoader";

export default function AddAlimentForm({ mealTitle, close }) {
    const [alimentQuery, setAlimentQuery] = useState("");
    const [alimentsList, setAlimentsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAliment, setSelectedAliment] = useState(null);


    function handleSubmit(event) {
        event.preventDefault();
        if (alimentQuery.trim() === "") return;

        setIsLoading(true);

        axios.get(`/aliment/${alimentQuery}`)
            .then((response) => {
                setAlimentsList(Array.isArray(response.data.foods.food) ? response.data.foods.food : [response.data.foods.food]);

            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function alimentClicked(aliment) {
        setSelectedAliment(aliment);
    }
    

    return (
        <>
            <div className="modal w-full max-h-[90vh] flex flex-col p-4 overflow-hidden">
                {/* Header */}
                <div className="flex justify-between border-b pb-2 border-neutral-400">
                    <h3 className="header font-bold text-[1.3em]">Add aliment or recipe</h3>
                    <button className="material-icons button font-black text-[#C1C86D]" onClick={close}>
                        close
                    </button>
                </div>

                {/* Form */}
                <form className="px-2 pt-6 w-full">
                    <div className="flex gap-3">
                        {/* Search Type - Más corto */}
                        <div className="px-2 w-1/4">
                            <h4 className="mb-2">Search type</h4>
                            <select className="w-full bg-[#222] text-white p-2 rounded-md border border-[#444]">
                                <option value="aliment">Aliment</option>
                                <option value="recipe">Recipe</option>
                            </select>
                        </div>

                        {/* Input para Aliment/Recipe - Más largo */}
                        <div className="px-2 w-1/2">
                            <h4 className="mb-2">Write the aliment or recipe</h4>
                            <input
                                className="w-full bg-[#222] text-white p-2 rounded-md border border-[#444]"
                                type="text"
                                onChange={(e) => setAlimentQuery(e.target.value)}
                                placeholder="Example: Apple"
                            />
                        </div>

                        {/* Botón - Ocupa el resto del espacio */}
                        <div className="flex items-end w-1/4">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full h-10 py-2 px-10 rounded-md bg-[#C1C86D] text-[#2F2F2F] font-bold transition-colors duration-300"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </form>


                {/* Contenedor responsive con scroll horizontal */}
                <div className="flex flex-row md:flex-row rounded-xl w-full flex-grow min-h-0 bg-[#1b1b1b] p-5 mt-5 overflow-x-auto">
                    {/* Columna izquierda con scroll */}
                    <div className="flex flex-col gap-5 max-h-[50vh] overflow-auto rounded-[15px] w-full md:w-1/2 p-5 bg-[#222]">

                        {/* Spinner centrado */}
                        {isLoading ? (
                            <div className="flex justify-center items-center h-full">
                                <RotateLoader
                                    color="#C1C86D"
                                    loading={isLoading}
                                    cssOverride={{}}
                                    margin={5}
                                />
                            </div>
                        ) : (
                            <>
                                {/* Mostrar los alimentos cuando no está cargando */}
                                {alimentsList.length > 0 && alimentsList.map((aliment, index) => (
                                    <ul key={aliment.id || index}> {/* Set key on <ul> instead of <li> */}
                                        <li className="cursor-pointer" onClick={() => alimentClicked(aliment)}>
                                            <AlimentItem
                                                name={aliment.food_name}
                                                brand={aliment.brand_name}
                                                foodDescription={aliment.food_description}
                                            />
                                        </li>
                                    </ul>
                                ))}

                            </>
                        )}
                    </div>


                    {/* Columna derecha */}
                    <div className="flex-grow rounded-[15px] p-5 flex flex-col justify-center w-full md:w-auto mx-2">
                        <div className="flex flex-row justify-between border-b-2 border-neutral-500 mb-5">
                            <h3 className="text-white text-[1.3em] font-semibold mb-4">
                                {mealTitle}
                            </h3>
                            <span className="text-white text-[1.3em] font-semibold mb-4">
                                {new Date().toLocaleDateString()}
                            </span>
                        </div>

                        {/* Formulario */}
                        <form className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                {selectedAliment ? (
                                    <>
                                    <div className="mt-5 mb-9">
                                    <AlimentItem
                                                name={selectedAliment.food_name}
                                                brand={selectedAliment.brand_name}
                                                foodDescription={selectedAliment.food_description}
                                            />
                                    </div>
                                        
                                    </>
                                ) : ("")}
                                <label className="text-white mb-1">Select meal</label>
                                <select className="bg-[#333] text-white p-2 rounded-md border border-[#444] py-2">
                                    <option>Breakfast</option>
                                </select>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-2 w-full">
                                <input
                                    type="text"
                                    placeholder="Portion"
                                    className="bg-[#333] text-white p-2 rounded-md border border-[#444] text-center w-full"
                                />
                                <span className="text-white">of</span>
                                <select className="bg-[#333] text-white p-2 rounded-md border border-[#444] w-full">
                                    <option>unit</option>
                                    <option>gramos</option>
                                    <option>mililitros</option>
                                    <option>porciones</option>
                                </select>
                            </div>

                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    className="bg-[#C1C86D] text-[#222] font-bold px-4 rounded-md w-full py-3"
                                >
                                    Add to the register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}