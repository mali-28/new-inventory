import {writeUserData, getDatabase, ref, child,set, get, onChildAdded, onChildChanged} from "firebase/database";
import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage } from "../utils/utils";
import { localStorageKeys } from "../utils/constant";
const loginContext = createContext({
    token: "",
    user: "",
    showData: "",
    pendingData : [],
    approvedData : [],
    setToken: () => {},
    setUser: () => {},
    setShowData: () => {},
    setPendingData: () => {},
    setApprovedData: () => {},
    database : () =>{},
    writeUserData : ()=>{}
});

const Context = (props) => {

        const [token, setToken] = useState(getLocalStorage(localStorageKeys.token));
        const [user, setUser] = useState(getLocalStorage(localStorageKeys.user) || {});
        const [showData, setShowData] = useState({});
        const [pendingData, setPendingData] = useState([]);
        const [approvedData, setApprovedData] = useState([]);
        const db = getDatabase();

        const  writeUserData = (userId, data) =>{
    
            set(ref(db, 'users/' + userId), {
              userData: data,
            });
          }

        const database =  () =>{
            const dbRef = ref(getDatabase());
            get(child(dbRef, `users`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const snaps = snapshot.val();
                    setShowData(snaps)
                    Object.values(snaps)?.forEach((val)=>{
                        if(val.userData.isVerify){
                              setApprovedData(Object.values(val));
                        }else{
                            setPendingData(Object.values(val));
                        }
                    })
                } else {
                    setShowData({})
                }
            }).catch((error) => {
                console.error(error);
            })

        }

        useEffect(() => {

            const token = getLocalStorage(localStorageKeys.token);
            setToken(token);

            onChildChanged(ref(db, '/users'), (snapshot) => {
                if (snapshot.exists()) {
                    const updatedData =  snapshot.val();
                    setShowData((pre)=> {
                        return {...pre, [updatedData.userData.id] : updatedData}
                    })

                    
                } else {
                    console.log("No data available");
                }
            });

            onChildAdded(ref(db, '/users'), (snapshot) => {
                if (snapshot.exists()) {
                    const newData =  snapshot.val();
                    setShowData((pre)=> {
                        return {...pre, [newData.userData.id] : newData}
                    })
                    pendingData.unshift(newData);

                } else {
                    console.log("No data available");

                }
            });


        }, [])


    //     const removeItem = (key) =>{
    //         const gdb = ref(getDatabase());
    //         remove(child(gdb, `users/${key}`))

            // database();
    //         setIsDonor(false);
    //     }

        useEffect(() => {

            database();
        }, [])


    return <>
        <loginContext.Provider value={{writeUserData,database,showData,setShowData,pendingData,approvedData,user, setUser, token, setToken}}>
            {props.children}
        </loginContext.Provider>
    </>

    }

    export default Context;
    export { loginContext };