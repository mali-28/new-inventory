import { writeData, getDatabase, ref, child, set, get, onChildAdded, onChildChanged, onChildRemoved } from "firebase/database";
import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage } from "../utils/utils";
import { localStorageKeys } from "../utils/constant";

const AdminContext = createContext({
    purchaseInfo: {},
    storeInfo: {},
    stockInfo: {},
    stockData: () => { },
    setStoreInfo: () => { },
    setPurchaseInfo: () => { },
    writeData: () => { },
    setStockInfo: () => { },

});
const WorkContext = (props) => {
    const db = getDatabase();
    const [purchaseInfo, setPurchaseInfo] = React.useState({});
    const [storeInfo, setStoreInfo] = React.useState({});
    const [stockInfo, setStockInfo] = React.useState({});
    const [stockStoreName, setStockStoreName] = useState("");
    const [sellStoreName, setSellStoreName] = useState("");
    const [didAddKey, setDidAddKey] = useState(false);
    const [subStocks, setSubStocks] = useState({});
    const [subSells, setSubSells] = useState({});
    const writeData = (id, title, data) => {
        set(ref(db, `${title}/` + id), {
            ...data
        });
    }

    useEffect(() => {

        onChildAdded(ref(db, '/purchaseDetail'), (snapshot) => {
            if (snapshot.exists()) {
                const newData = snapshot.val();
                setPurchaseInfo((pre) => {
                    return { ...pre, [newData.id]: newData }
                })
            } else {
                console.log("No data available");

            }
        });

        onChildAdded(ref(db, '/stores'), (snapshot) => {
            if (snapshot.exists()) {
                const newData = snapshot.val();
                setStoreInfo((pre) => {
                    return { ...pre, [newData.id]: newData }
                })
            } else {
                console.log("No data available");
            }
        });

        onChildAdded(ref(db, '/stock'), (snapshot) => {
            if (snapshot.exists()) {
                const newData = snapshot.val();
                setStockInfo((pre) => {
                    return { ...pre, [newData.id]: newData }
                })
            } else {
                console.log("No data available");
            }
        });


        onChildChanged(ref(db, '/stock'), (snapshot) => {
            if (snapshot.exists()) {
                const updatedData = snapshot.val();
                setStockInfo((pre) => {
                    return { ...pre, [updatedData.id]: updatedData }
                })

            } else {
                console.log("No data available");
            }
        });

        onChildRemoved(ref(db, '/stock'), (snapshot) => {
            if (snapshot.exists()) {
                const newData = snapshot.val();
                setStockInfo((pre) => {
                     const preVal = {...pre}
                     delete preVal[newData.id]
                     return preVal;
                })
            } else {
                console.log("No data available");
            }
        });


    }, [])

    const subStocksManage = () => {
        if(didAddKey){
            onChildAdded(ref(db, `/stocks/${stockStoreName}`), (snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.exists())
                    const newData = snapshot.val();
                    setSubStocks((pre) => {
                        let object = {...pre};
                        object[newData.id] = newData;
                        return  object
                    })
    
                } else {
                    console.log("No data available");
    
                }
            });



        onChildChanged(ref(db, `/stocks/${stockStoreName}`), (snapshot) => {
            if (snapshot.exists()) {
                const updatedData = snapshot.val();
                setSubStocks((pre) => {
                    let object = {...pre};
                    object[updatedData.id] = updatedData;
                    return  object
                })

            } else {
                console.log("No data available");
            }
        });

        setDidAddKey(false);
    }
    }


    const subSellsManage = () => {
        if(didAddKey){
           
            onChildAdded(ref(db, `/sells/${sellStoreName}`), (snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.exists())
                    const newData = snapshot.val();
                    
                    setSubSells((pre) => {
                        let object = {...pre};
                        object[newData.id] = newData;
                        console.log("sellObj", object)
                        return  object
                    })
    
                } else {
                    console.log("No data available");
    
                }
            });


        onChildChanged(ref(db, `/sells/${sellStoreName}`), (snapshot) => {
            if (snapshot.exists()) {
                const updatedData = snapshot.val();
                setSubSells((pre) => {
                    let object = {...pre};
                    object[updatedData.id] = updatedData;
                    return  object
                })

            } else {
                console.log("No data available");
            }
        });

        setDidAddKey(false);
    }
    }

// console.log("setSubSells", subSells)
useEffect(() => {
    subStocksManage();
    

}, [stockStoreName, didAddKey])

useEffect(() => {
    subSellsManage();
    

}, [sellStoreName, didAddKey])

    const purchaseData = () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `purchaseDetail`)).then((snapshot) => {
            if (snapshot.exists()) {
                const snaps = snapshot.val();
                setPurchaseInfo(snaps);
            }
        }).catch((error) => {
            console.error(error);
        })
    }

    const storeData = () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `stores`)).then((snapshot) => {
            if (snapshot.exists()) {
                const snaps = snapshot.val();
                setStoreInfo(snaps);
            }
        }).catch((error) => {
            console.error(error);
        })
    }

    const stockData = () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `stock`)).then((snapshot) => {
            if (snapshot.exists()) {
                const snaps = snapshot.val();
                setStockInfo(snaps);
            }
        }).catch((error) => {
            console.error(error);
        })
    }

    const Allstocks = () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, "stocks/")).then((snapshot) => {
            let object = {};
            if (snapshot.exists()) {
                const snaps = snapshot.val();
                const arr = Object.values(snaps);

                arr.forEach((k) => { object = { ...object, ...k } })
                setSubStocks(object)
            }
        }).catch((error) => {
            console.error(error);
        })
    }

    const AllSells = () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, "sells/")).then((snapshot) => {
            let object = {};
            if (snapshot.exists()) {
                const snaps = snapshot.val();
                const arr = Object.values(snaps);

                arr.forEach((k) => { object = { ...object, ...k } })
                setSubSells(object)
            }
        }).catch((error) => {
            console.error(error);
        })
    }

    

    useEffect(() => {
        purchaseData();
        storeData();
        stockData();
        Allstocks();
        AllSells();
    }, [])

    useEffect(() => {
        setStockStoreName(() => { return Object.values(storeInfo)?.[0]?.store })
        setSellStoreName(() => { return Object.values(storeInfo)?.[0]?.store })
    }, [storeInfo])

    return <>
        <AdminContext.Provider value={{ writeData, purchaseInfo, setPurchaseInfo, storeInfo, setStoreInfo, stockInfo, setStockInfo, stockData,stockStoreName, setStockStoreName,sellStoreName, setSellStoreName, subStocks, setSubStocks, subSells, setSubSells,setDidAddKey }}>
            {props.children}
        </AdminContext.Provider>
    </>

}

export default WorkContext;
export { AdminContext };