import { useState, useEffect } from "react";
import axios from "axios";

export default function FollowUp() {
    const [phrase, setPhrase] = useState('');
    const [nutriNumber, setNutriNumber] = useState(null);

    //obtener numero random que no sea 3 
    //para que no aparezla la imagen que no me interesa.
    function generateRandomNum() {
        let number = 3;
        while (number === 3) {
            number = Math.floor(Math.random() * (10 - 1)) + 1;
        }
        return number;
    }

    useEffect(() => {
        // Set the random number once on mount
        setNutriNumber(generateRandomNum());

        // Fetch the quote
        axios.get('/today-quote')
            .then(res => {
                setPhrase(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <>
            <div className="grid grid-cols-3 gap-4 items-center">
                <div className="col-span-1 h-[270px]">
                    {nutriNumber && (
                        <img
                            src={`assets/images/nutrin/Nutri_${nutriNumber}.png`}
                            alt="nutrin"
                            className="h-full object-contain"
                        />
                    )}
                </div>
                <div className="col-span-2">
                    <h2 className="text-[2.3em] text-center">{phrase}</h2>
                </div>
            </div>
        </>
    );
}
