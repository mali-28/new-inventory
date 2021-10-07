import React, { useContext, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getLocalStorage, removeLocalStorageKey, setLocalStorage } from '../utils/utils';
import { localStorageKeys } from "../utils/constant";
import { loginContext } from "../context/context";


const auth = getAuth();
const provider = new GoogleAuthProvider();
const dbRef = ref(getDatabase());

const Topbar = () => {
    const history = useHistory();
    const {writeUserData,showData,user, setUser, token, setToken } = useContext(loginContext);

    
    function login() {

        signInWithPopup(auth, provider)
            .then((result) => {

                const user = result.user;

                get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {

                    if (snapshot.exists()) {
                        const isVerification = snapshot.val().isVerify;
                        if (isVerification) {
                            setLocalStorage(localStorageKeys.token, user.accessToken)
                            setLocalStorage(localStorageKeys.user, { id: user.uid, email: user.email, name: user.name })

                            history.replace("/work");
                        } else {
                            alert("Please Wait untill admin approve your requests")
                            removeLocalStorageKey(localStorageKeys.token)
                            removeLocalStorageKey(localStorageKeys.user)
                        }
                    } else {
                        writeUserData("users",user.uid, { id: user.uid, name: user.displayName, email: user.email, photoUrl: user.photoURL, token: user.accessToken, superAdmin: false, isVerify: false, })
                        alert("Please Wait untill admin approve your requests");
                        
                    }
                    setToken(getLocalStorage(localStorageKeys.token))
                    setUser(getLocalStorage(localStorageKeys.user))
                }).catch((error) => {
                    alert(error);
                });

            }).catch((error) => {
                alert(error.code);

            });
    }

    return <>
        <div className="header">
            <div className="container">
                <div className="header-div">
                    <div className="logo-div"><img className="logo" src="./images/logo.png" alt="logo" /></div>
                    <div style={{ width: 500 }} className="nav">
                        <ul className="d-flex justify-around">
                            <li><NavLink to="/">Home</NavLink></li>
                            {(user && token)? showData[user.id]?.superAdmin ?
                            <>
                             <li><NavLink to="/work">Work</NavLink></li>
                             <li><NavLink to="/accounts">Accounts</NavLink></li>
                            </>
                             :  <li><NavLink to="/work">Work</NavLink></li>
                             : <li><button onClick={() => { login() }}>Login</button></li>
                             }

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Topbar;