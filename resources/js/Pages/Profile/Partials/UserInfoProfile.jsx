import React from "react";
import { usePage } from "@inertiajs/react";
import "../../../../css/Profile/profile-info.css";
import ProfileImage from "./ProfileImage";
import UserInformation from "./UserInformation";

const UserInfoProfile = () => {
    const { auth } = usePage().props;
    const physicalData = auth.physicalData;

    return (
        <>
            <div className="flex flex-row w-full ">
                {/* Foto de perfil */}
                <div className="flex flex-col md:flex-row gap-5 w-full max-w-[2000px]">
                    <div className="bg-[#222] rounded-lg p-10">
                        <ProfileImage auth={auth} />

                    </div>
                    <div className="bg-[#222] rounded-lg p-10 w-full">
                        <UserInformation auth={auth} physicalData={physicalData} />

                    </div>
                </div>


                {/* informacion basica del usuario */}
                <div>

                </div>

            </div>
        </>
    )
};
export default UserInfoProfile;