import { getDatabase, ref, set, child, remove } from "firebase/database";
import React, { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { loginContext } from "../context/context";
import { AdminContext } from '../context/WorkContext';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import StockTable from "./StockTable";

const Sell = (props) => {
    const db = getDatabase();
    const dbRef = ref(getDatabase());
    const { user } = useContext(loginContext);
    const { writeData, storeInfo, stockInfo, sellStoreName, setSellStoreName, subStocks, setSubStocks, subSells, setSubSells, storestock, setDidAddKey } = useContext(AdminContext);
    const [storeStock, setStoretock] = useState([]);
    const [preQuantity, setPreQuantity] = useState(0);
    const [cond, setCond] = useState(true);
    const [subSellData, setSubSellData] = React.useState({
        store: "",
        name: "",
        quantity: 0,
        date: new Date().toLocaleDateString(),
        id: "",

    });

    // console.log("sellstore", sellStoreName)
    // console.log("subSellData",subSellData)
    // console.log("sellinputstore", storeInfo[subSellData.store]?.store)

    useEffect(() => {
        let changeStock = [];
        Object.values(subStocks)?.forEach((val) => {
            if (val.storeName === sellStoreName) {
                changeStock.push(val)
            }
        })

        setStoretock(changeStock)

        setSubSellData((pre) => {
            return { ...pre, name: changeStock[0]?.id }
        })


    }, [subStocks, sellStoreName])


    useEffect(() => {
        setSubSellData((pre) => {
            return { ...pre, store: Object.values(storeInfo)?.[0]?.id }
        })
        setSellStoreName(Object.values(storeInfo)?.[0]?.store)
    }, [storeInfo])

    const subSellEvent = (event) => {
        const { name, value } = event.target;
        setSubSellData((preVal) => {
            return { ...preVal, [name]: value }
        })

    }

    const sellStoreChange = (event, index, newValue) => {
        setSellStoreName(storeInfo[newValue].store)

        setSubSellData((preVal) => {

            return { ...preVal, store: newValue }
        })
    };
    const sellProductChange = (event, index, newValue) => {
        setSubSellData((preVal) => {
            return { ...preVal, name: newValue }
        })
    };

    const subSell = (storeId, productId) => {
        const productDetail = storeStock?.find((val) => {
            return val.id === productId
        })
        const storeDetail = storeInfo[storeId];
            const remiainingQunatity = Number(productDetail.quantity) - Number(subSellData.quantity);
            const uid = `${user.id}_${new Date().getTime()}`;

        if (remiainingQunatity < 0) {
            alert(`Available quantity of ${productDetail.productName} are ${Number(productDetail.quantity)}`)

        }else{
            if(cond){ 
                setDidAddKey(true)

                set(ref(db, `stocks/${sellStoreName}/${productId}`), {
                    ...productDetail, quantity: remiainingQunatity
                });

                writeData(uid, `sells/${sellStoreName}`, { ...subSellData, price: productDetail.price * subSellData.quantity, id: uid, storeName: storeDetail.store, productName: productDetail.productName })

            }
         else {

            setDidAddKey(true)
            set(ref(db, `stocks/${sellStoreName}/${productId}`), {
                ...productDetail, quantity: remiainingQunatity
            });

            set(ref(db, `sells/${sellStoreName}/${subSellData.id}`), {
                ...subSellData, price: productDetail.price * (Number(subSellData.quantity) + Number(preQuantity)), quantity: (Number(subSellData.quantity) + Number(preQuantity))
            });
            setDidAddKey(true)
            setCond(true);
            setSubSellData((pre) => {
                return { ...pre, quantity: 0, }
            })
            
            
        }
    }
        


    }
    const updateSell = (key) => {
        setCond(false);
        const value = subSells[key];
        console.log("value", value)
        console.log("input", subSellData)
        setPreQuantity(value.quantity)
        setSubSellData((pre) => {
            console.log({...pre, ...value })
            return {...pre, ...value }
        });
        setSellStoreName(value.storeName)


    }

    const removeSell = (key) =>{
        remove(child(dbRef, `stocks/${sellStoreName}/${key}`));
        setSubSells((pre) => {
            const preVal = { ...pre }
            delete preVal[key]
            return preVal;
        })


    }



    return (<>


        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch', },
            }}
            NoValidate
            autoComplete="off"
        >

            < MuiThemeProvider>
                <DropDownMenu
                    value={subSellData.store}
                    onChange={sellStoreChange}
                    name="store"
                    disabled={!cond}
                >
                    {Object.values(storeInfo)?.map((elem) => {
                        return <MenuItem key={elem.id} value={elem.id} primaryText={elem.store} />
                    })
                    }
                </DropDownMenu>
            </MuiThemeProvider>
            <MuiThemeProvider>
                <DropDownMenu
                    value={subSellData.name}
                    onChange={sellProductChange}
                    disabled={!cond}
                >
                    {Object.values(storeStock)?.map((elem) => {
                        return <MenuItem key={elem.id} value={elem.id} primaryText={elem.productName} />
                    })
                    }
                </DropDownMenu>
            </MuiThemeProvider>
            <TextField name="quantity" value={subSellData.quantity} onChange={subSellEvent} id="standard-basic" type="number" label="Quantity of Product" variant="standard" />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Date"
                    name="date"
                    value={subSellData.date}
                    onChange={(value) => {
                        setSubSellData((preVal) => {
                            return { ...preVal, date: value.toLocaleDateString() }
                        })
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Button
                onClick={() => { subSell(subSellData.store, subSellData.name) }}
                style={{ padding: 15 }} variant="outlined">Add Detail...</Button>
        </Box>


        <TableContainer style={{ maxWidth: "70%", margin: "0 auto" }}>
            {subSells ?
                <Table className={props.classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(subSells)?.map((val) => {
                            if (val.storeName === sellStoreName) {
                                return <StockTable name={val.productName} key={val.id}
                                    update={() => { updateSell(val.id) }}
                                    remove = {()=>{removeSell(val.id)}} 
                                    val={val}
                                />
                                
                            }
                        })
                        }

                    </TableBody>
                </Table> : <h1 className="mt-3 red">No Stock is avalable for Sell</h1>}
        </TableContainer>




    </>


    );
}

export default Sell;