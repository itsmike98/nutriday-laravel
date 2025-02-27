import React from "react";
import Popup from "reactjs-popup";
import "../../../../resources/css/Aliment/MealTable.css";
import 'reactjs-popup/dist/index.css';


export default function MealTable({mealTitle}) {
  return (
    <div className="App">
      <table className="meal-table">
        <tbody>
          <tr>
            <td className="meal-title">
              <h3 className="font-semibold text-[1.3em]">{mealTitle}</h3>
              {/* Popup para añadir alimento */}
              <Popup
                trigger={<button className="font-normal text-[#C1C86D]"> Add new aliment </button>}
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