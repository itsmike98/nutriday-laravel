import { useState, useEffect } from "react"

export default function TotalsTable({ selectedDate, formatDate, newAliment }) {
    const [totals, setTotals] = useState([]);

    // Fetch the totals data from the server
    useEffect(() => {
        axios.get(`/user-meals/totals/${formatDate(selectedDate.toLocaleDateString('en-GB'))}`)
            .then(response => {
                console.log("respuesta: ",response.data);
                setTotals(response.data); 
            })
            .catch(error => {
                console.error("Error fetching totals data:", error);
            });
    }, [selectedDate, newAliment]);
    return (
        <>
        <tr className="h-7">
            <td></td>
            <td className="empty-cells"></td>
            <td className="empty-cells"></td>
            <td className="empty-cells"></td>
            <td className="empty-cells"></td>
            <td className="empty-cells"></td>
        </tr>
            <tr className="totals-table-row ">
            <td></td>
            <td className="totals-title font-bold">Total:</td>
            
            <td className="font-semibold bg-neutral-700">{totals.calories?.toFixed(1)} <span>kcal</span></td>
            <td className="font-semibold bg-neutral-700">{totals.carbs?.toFixed(1)} <span>g</span></td>
            <td className="font-semibold bg-neutral-700">{totals.fat?.toFixed(1)} <span>g</span></td>
            <td className="font-semibold bg-neutral-700">{totals.protein?.toFixed(1)} <span>g</span></td>
        </tr>
        </>
        
    )
}