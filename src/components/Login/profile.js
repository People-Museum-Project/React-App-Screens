//src/components/Login/profile.js
import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // 使用 useNavigate 钩子

    const fetchUserData = () => {
        const user = auth.currentUser;
        console.log("Login user:", user);
        if (user) {
            setUserDetails({
                photo: user.photoURL,
                name: user.displayName,
                email: user.email
            });
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    async function handleLogout() {
        try {
            await auth.signOut();
            navigate("/"); // 导航到主页
            console.log("User logged out successfully!");
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    }

    return (
        <div>
            {error && <p>{error}</p>}
            {userDetails ? (
                <>
                    <div style={{ display: "flex", justifyContent: "flex-start" }}>
                        <img src={userDetails.photo} className="photo-wall"/>
                    </div>
                    <h3>Welcome {userDetails.name}</h3>
                    <div>
                        <p>Email: {userDetails.email}</p>
                        <p>Name: {userDetails.name}</p>
                    </div>
                    <button className="btn btn-primary" onClick={handleLogout}>
                        Logout
                    </button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Profile;
