import React from "react";
import { NavLink } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";


const auth = getAuth();
var provider = new GoogleAuthProvider();
const db = getDatabase();

function writeUserData(userId,data) {
        set(ref(db, 'users/' + userId), {
            userData: data,
        });
    }
function click() {



    signInWithPopup(auth, provider)
        .then((result) => {

            const user = result.user;
            writeUserData(user.uid,{ id: user.uid, name: user.displayName, email: user.email, photoUrl : user.photoURL, token: user.accessToken, role : "viewer", isVerify : false, })
            console.log("kjds", user)
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
           
            // console.log( "credentials", credential);
            console.log("result", user.uid);
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}
const Topbar = () => {

    return <>
        <div className="header">
            <div className="container">
                <div className="header-div">
                    <div className="logo-div"><img className="logo" src="./images/logo.png" alt="logo" /></div>
                    <div style={{ width: 500 }} className="nav">
                        <ul className="d-flex justify-around">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><button onClick={() => { click() }}>Login</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Topbar;