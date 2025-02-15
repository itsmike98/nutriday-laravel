import React from "react";
import { usePage } from "@inertiajs/react";

const UserInfoProfile = () => {
    const { auth } = usePage().props;
    const physicalData = auth.physicalData;

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const handleAproach = () => {
        if(physicalData.approach !== ""){
            return <>
            <p className="font-semibold">Approach:</p>
            <p>{physicalData.approach}</p>
            </>
        }
    }
    return(
        <>
            <div className="flex flex-row w-full gap-20">
                {/* Foto de perfil */}
                <div className="">
                    
                <img 
                        src="/assets/images/willy.jpg" 
                        alt="borrar" 
                        className="max-w-80 h-80 object-cover rounded-full" 
                    />
                    <h2>{auth.user.name}</h2>
                </div>
                {/* informacion basica del usuario */}
                <div className="flex flex-col w-full">
                    <h3 className="text-[2em] font-semibold">Profile Information</h3>
                    <br />
                    <p className="font-semibold">Email:</p>
                    <p>{auth.user.email}</p>
                    <br />
                    <p className="font-semibold">Birth date:</p>
                    <p>{auth.user.birth_year}</p>
                    <br />
                    <p className="font-semibold">Gender:</p>
                    <p>{capitalizeFirstLetter(auth.user.gender)}</p>
                    <br />
                    <p className="font-semibold">Height:</p>
                    <p>{physicalData.height}</p>
                    <br />
                    <p className="font-semibold">Weight:</p>
                    <p>{physicalData.weight}</p>
                    <br />
                    <p className="font-semibold">Activity level;</p>
                    <p>{capitalizeFirstLetter(physicalData.activity_level)}</p>
                    <br />
                    <p className="font-semibold">Main goal:</p>
                    <p>{capitalizeFirstLetter(physicalData.main_goal)}</p>
                    <br />
                    {handleAproach()}
                    
                </div>
            </div>
        </>
    )};
export default UserInfoProfile;