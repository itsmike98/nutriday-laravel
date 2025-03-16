import React, { useState } from "react";
import Popup from "reactjs-popup";
import "../../../../resources/css/Aliment/MealTable.css";
import 'reactjs-popup/dist/index.css';


export default function MealTable({ mealTitle, mealId, onDelete, onChange }) {

  const [editMode, setEditMode] = useState(false);
  const [newMealName, setNewMealName] = useState("");

  function handleChange(event){
    setNewMealName(event.target.value);
  }

  function handleEditBtn() {
    setEditMode(editMode ? false : true);
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
                trigger={<button className={`font-normal text-[#fff] bg-transparent border-2 border-[#C1C86D] rounded-lg p-1 px-3 ${editMode ? 'hidden' : ''}`}> Add new aliment </button>}
                modal
                nested
              >
                {close => (
                  <div className="modal">
                    <div className="header"> Add aliment form </div>

                    <div className="actions">
                      <button className="button" onClick={close}>Close modal</button>
                    </div>
                  </div>
                )}
              </Popup>

              {/* popup para cambiar el nombre del meal */}
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
            <td className="empty-cells"></td>
          </tr>
          <tr className="alimento">
            <td className="aliment-name">Alimento comeme el pimiento</td>
            <td>19 <span>g</span></td>
            <td>3 <span>g</span></td>
            <td>55 <span>g</span></td>
            <td>19</td>
            <td>2</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}