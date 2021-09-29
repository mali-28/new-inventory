// import { getDatabase, ref, child, get, onChildChanged , onChildAdded, onChildRemoved, remove} from "firebase/database";
// import React, { createContext, useEffect, useState } from "react";
// import { getLocalStorage, } from "../utils/utils";

// const loginContext = createContext({
//     login: "",
//     user: "",
//     showData: "",
//     userLocation: "",
//     isDonor : "",
//     setLogin: () => { },
//     setUser: () => { },
//     setShowData: () => { },
//     setUserLocation: () => { },
//     removeItem : () => {},
//     setIsDonor : () =>{}
// });

// const Context = (props) => {


//     const [login, setLogin] = useState(getLocalStorage("Islogin"));
//     const [user, setUser] = useState(getLocalStorage("__USER__") || {});
//     const [userLocation, setUserLocation] = useState(getLocalStorage("location") || [])
//     const [isDonor, setIsDonor] = useState(false)
//     const [showData, setShowData] = useState({});


//     const database =  () =>{
//         const dbRef = ref(getDatabase());
//         get(child(dbRef, `users`)).then((snapshot) => {
//             if (snapshot.exists()) {
//                 setShowData(snapshot.val())
//             } else {
//                 setShowData({})
//             }
//         }).catch((error) => {
//             console.error(error);
//         })

//     }

//     useEffect(() => {

//         const token = getLocalStorage("Islogin");
//         const db = getDatabase();
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
        
//         onChildAdded(ref(db, '/users'), (snapshot) => {
//             if (snapshot.exists()) {
//                 const newData =  snapshot.val();
//                 setShowData((pre)=> {
//                     return {...pre, [newData.userData.id] : newData}
//                 })
//             } else {
//                 console.log("No data available");

//             }
//         });

        
        
        
      
       
//     }, [])


//     const removeItem = (key) =>{
//         const gdb = ref(getDatabase());
//         remove(child(gdb, `users/${key}`))

//         database();
//         setIsDonor(false);

//     }

//     useEffect(() => {
        
//         database();
//     }, [])


//     return <>
//         <loginContext.Provider value={}>
//             {props.children}
//         </loginContext.Provider></>

// }

// export default Context;
// export { loginContext };