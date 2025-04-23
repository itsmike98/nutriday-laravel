const UserInformation = ({auth, physicalData}) => {
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    const handleAproach = () => {
        if (physicalData.approach !== "") {
            return <>
                <div>
                    <p className="font-semibold">Approach:</p>
                    <p className="info">{physicalData.approach}</p>
                </div>

            </>
        }
    }
    return(
        <>
        <h3 className="text-[2em] font-semibold">Profile Information</h3>
        <hr className="mb-5" />
        <div className="grid grid-cols-2 gap-5 w-full">

            <div>
                <p className="font-semibold">Email:</p>
                <p className="info">{auth.user.email}</p>
            </div>

            <div>
                <p className="font-semibold">Birth date:</p>
                <p className="info">{auth.user.birth_year}</p>
            </div>

            <div>
                <p className="font-semibold">Gender:</p>
                <p className="info">{capitalizeFirstLetter(auth.user.gender)}</p>
            </div>

            <div>
                <p className="font-semibold">Height:</p>
                <p className="info">{physicalData.height}</p>
            </div>

            <div>
                <p className="font-semibold">Weight:</p>
                <p className="info">{physicalData.weight}</p>
            </div>

            <div>
                <p className="font-semibold">Activity level;</p>
                <p className="info">{capitalizeFirstLetter(physicalData.activity_level)}</p>
            </div>

            <div>
                <p className="font-semibold">Main goal:</p>
                <p className="info">{capitalizeFirstLetter(physicalData.main_goal)}</p>
            </div>

            {handleAproach()}

        </div>
    </>
    )
   
}

export default UserInformation;