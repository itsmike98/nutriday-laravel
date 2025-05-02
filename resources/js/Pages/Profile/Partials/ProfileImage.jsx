import "../../../../css/Profile/profile-info.css";

const ProfileImage = ({auth}) => {
    return (
        <>
            <div className="profile-picture-container">

                <div className="image-wrapper">
                    <img
                        src="/assets/images/willy.webp"
                        alt="borrar"
                        className="profile-image"
                    />
                    <div className="image-hover">
                        <button className="text-white">Change profile picture</button>
                    </div>
                </div>

                <div className="username-container">
                    <h2 className="username text-[2em]">{auth.user.name}</h2>
                </div>
            </div>
        </>
    )
};

export default ProfileImage;