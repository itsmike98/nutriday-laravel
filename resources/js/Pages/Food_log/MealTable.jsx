import React, { useState } from "react";
import Popup from "reactjs-popup";
import "../../../../resources/css/Aliment/MealTable.css";
import 'reactjs-popup/dist/index.css';
import AddAlimentForm from "./AddAlimentForm";
import AlimentMealTable from "./AlimentMealTable";


export default function MealTable({ mealTitle, mealId, onDelete, onChange }) {

  const [editMode, setEditMode] = useState(false);
  const [newMealName, setNewMealName] = useState("");
  //Estado para los alimentos
  const [aliments, setAliments] = useState([]);

  function handleChange(event) {
    setNewMealName(event.target.value);
  }

  function handleEditBtn() {
    setEditMode(editMode ? false : true);
  }

  //Peticion para obtener los alimentos de el meal actual
  React.useEffect(() => {
    //formato valido para la fecha: 2025-03-05
    axios.get(`/meals/${mealId}/aliments`).then((response) => {
      setAliments(response.data);
    });
  }, []);

  function handleDeleteAliment(alimentId) {
    setAliments(prevAliments => prevAliments.filter(aliment => aliment.aliment_id !== alimentId));
  }

  return (

    <div className="App">
      <table className="meal-table">
        <tbody>
          <tr>
            <td className="meal-title">
              <h3 className="font-semibold text-[1.3em]">{mealTitle} <button className="material-icons" onClick={handleEditBtn}>edit</button></h3>

              {/* Popup para añadir alimento */}
              <Popup
                trigger={
                  <button
                    className={`font-normal text-[#fff] bg-transparent border-2 border-[#C1C86D] rounded-lg p-1 px-3 ${editMode ? "hidden" : ""}`}
                  >
                    Add new aliment
                  </button>
                }
                modal
                nested
              >
                {(close) => (
                  <AddAlimentForm mealTitle={mealTitle} close={close}/>
                )}
              </Popup>



              <Popup
                trigger={<button className={`text-[#C1C86D] ${editMode ? '' : 'hidden'}`}> Change meal name </button>}
                modal
                nested
              >
                {close => (
                  <div className="modal w-[400px] h-[250px] flex flex-col justify-around">
                    <div className="header pb-4 border-b-2 border-neutral-600 text-[1.3em] font-semibold"> Change {mealTitle} name </div>
                    <form>
                      <input
                        type="text"
                        name="meal-name"
                        id={mealId}
                        placeholder="New meal name"
                        className="mt-5"
                        onChange={(event) => handleChange(event)}
                      />
                      <div className="actions flex flex-row justify-around gap-5 pt-5">
                        <button className="nutriday-btn-light w-[50%]" onClick={close} >Cancel</button>
                        <button className="nutriday-btn-green w-[50%]" onClick={(event) => {
                          handleEditBtn();
                          onChange(event, mealId, newMealName, close);
                        }}>Change</button>

                      </div>
                    </form>
                  </div>
                )}
              </Popup>

              <br className={`${editMode ? '' : 'hidden'}`} />
              <button onClick={() => onDelete(mealId)} className={`font-normal text-[#e67777] ${editMode ? '' : 'hidden'}`}>Delete meal </button>
            </td>
            <td className="empty-cells"></td>
            <td className="empty-cells"></td>
            <td className="empty-cells"></td>
            <td className="empty-cells"></td>
            <td className="empty-cells"></td>
          </tr>

          {aliments.map((aliment, index) => (
            <AlimentMealTable key={`${aliment.id}-${index}`} aliment={aliment} mealId={mealId} onDelete={handleDeleteAliment}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}