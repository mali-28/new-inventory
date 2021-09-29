import { getDatabase, ref, child, get, onChildAdded, } from "firebase/database";
import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage } from "../utils/utils";
import { localStorageKeys } from "../utils/constant";
const loginContext = createContext({
    token: "",
    user: "",
    showData: "",
    userLocation: "",
    isDonor: "",
    pendingData : [],
    approvedData : [],
    setToken: () => {},
    setUser: () => {},
    setShowData: () => {},
    setUserLocation: () => {},
    removeItem: () => {},
    setIsDonor: () => {},
    setArrayData : () =>{},
    display : () => {}
});

const Context = (props) => {


        const [token, setToken] = useState(getLocalStorage(localStorageKeys.token));
        const [user, setUser] = useState(getLocalStorage(localStorageKeys.user) || {});
    //     const [userLocation, setUserLocation] = useState(getLocalStorage("location") || [])
    //     const [isDonor, setIsDonor] = useState(false)
        const [showData, setShowData] = useState({});
        const [pendingData, setPendingData] = useState([]);
        const [approvedData, setApprovedData] = useState([]);



        const database =  () =>{
            const dbRef = ref(getDatabase());
            get(child(dbRef, `users`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const snaps = snapshot.val();
                    setShowData(snaps)
                    console.log("snaps",Object.values(snaps))
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

    //         const token = getLocalStorage("Islogin");
            const db = getDatabase();
    //         setLogin(token);

    //         onChildChanged(ref(db, '/users'), (snapshot) => {
    //             if (snapshot.exists()) {
    //                 const updatedData =  snapshot.val();
    //                 setShowData((pre)=> {
    //                     return {...pre, [updatedData.userData.id] : updatedData}
    //                 })
    //             } else {
    //                 console.log("No data available");
    //             }
    //             // ...
    //         });

            onChildAdded(ref(db, '/users'), (snapshot) => {
                if (snapshot.exists()) {
                    const newData =  snapshot.val();
                    setShowData((pre)=> {
                        return {...pre, [newData.userData.id] : newData}
                    })
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
        <loginContext.Provider value={{database,showData,pendingData,approvedData,user, setUser, token, setToken}}>
            {props.children}
        </loginContext.Provider>
    </>

    }

    export default Context;
    export { loginContext };