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

const SubStock = (props) => {
    const db = getDatabase();
    const dbRef = ref(getDatabase());
    const { user } = useContext(loginContext);
    const { writeData, storeInfo, stockInfo, stockStoreName, setStockStoreName, subStocks, setSubStocks, setDidAddKey } = useContext(AdminContext);
    const [cond, setCond] = useState(true);
    const [preQuantity, setPreQuantity] = useState(0);
    const [subStoreData, setSubStoreData] = React.useState({
        store: "",
        name: "",
        quantity: 0,
        date: new Date().toLocaleDateString(),
        id: "",

    });
// console.log("store", stockStoreName)
//     console.log("subStoreData",subStoreData)
//     console.log("inputstore", storeInfo[subStoreData.store]?.store)
    useEffect(() => {
        setSubStoreData((pre) => {
            return { ...pre, name: Object.values(stockInfo)?.[0]?.id }
        })

    }, [stockInfo])
    useEffect(() => {
        setSubStoreData((pre) => {
            return { ...pre, store: Object.values(storeInfo)?.[0]?.id }
        })

        setStockStoreName(Object.values(storeInfo)?.[0]?.store)

    }, [storeInfo])

    const subStockEvent = (event) => {
        const { name, value } = event.target;
        setSubStoreData((preVal) => {
            return { ...preVal, [name]: value }
        })

    }

    const storeChange = (event, index, newValue) => {
        setStockStoreName(storeInfo[newValue].store)

        setSubStoreData((preVal) => {

            return { ...preVal, store: newValue }
        })
    };
    const productChange = (event, index, newValue) => {
        setSubStoreData((preVal) => {

            return { ...preVal, name: newValue }
        })
    };

    const subStock = (storeId, productId) => {
        const productDetail = stockInfo[productId];
        const storeDetail = storeInfo[storeId];
        const remiainingQunatity = Number(productDetail.quantity) - Number(subStoreData.quantity);
        const uid = `${user.id}_${new Date().getTime()}`;

        if (remiainingQunatity < 0) {
            alert(`Available quantity of ${productDetail.name} are ${productDetail.quantity}`)


        } else {
            if (cond) {
                setDidAddKey(true)

                set(ref(db, `stock/` + productId), {
                    ...productDetail, quantity: remiainingQunatity
                });

                writeData(uid, `stocks/${stockStoreName}`, { ...subStoreData, price: Number(productDetail.price), id: uid, storeName: storeDetail.store, productName: productDetail.name })


            }
            else {
                setDidAddKey(true)

                set(ref(db, `stock/` + productId), {
                    ...productDetail, quantity: remiainingQunatity
                });

                set(ref(db, `stocks/${stockStoreName}/${[subStoreData.id]}`), {
                    ...subStoreData, quantity: (Number(subStoreData.quantity) + Number(preQuantity))
                });
                setCond(true);
                setSubStoreData((pre) => {
                    return { ...pre, quantity: 0, }
                })

            }


        }


    }
    const updateStock = (key) => {
        setCond(false);
        const value = subStocks[key];
        setPreQuantity(value.quantity)
        setSubStoreData((pre) => {
            return { ...pre, ...value }
        });
        setStockStoreName(value.storeName)


    }
    const removeStock = (key) => {
        remove(child(dbRef, `stocks/${stockStoreName}/${key}`));
        setSubStocks((pre) => {
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
                    value={subStoreData.store}
                    onChange={storeChange}
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
                    value={subStoreData.name}
                    onChange={productChange}
                    disabled={!cond}
                >
                    {Object.values(stockInfo)?.map((elem) => {
                        return <MenuItem key={elem.id} value={elem.id} primaryText={elem.name} />
                    })
                    }
                </DropDownMenu>
            </MuiThemeProvider>
            <TextField name="quantity" value={subStoreData.quantity} onChange={subStockEvent} id="standard-basic" type="number" label="Quantity of Product" variant="standard" />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Date"
                    name="date"
                    value={subStoreData.date}
                    onChange={(value) => {
                        setSubStoreData((preVal) => {
                            return { ...preVal, date: value.toLocaleDateString() }
                        })
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Button onClick={() => { subStock(subStoreData.store, subStoreData.name) }} style={{ padding: 15 }} variant="outlined">{cond ? "Add Detail..." : "Update..."}</Button>
        </Box>


        <TableContainer style={{ maxWidth: "70%", margin: "0 auto" }}>
            {subStocks ?
                <Table className={props.classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(subStocks)?.map((val) => {
                            if (val.storeName === stockStoreName) {
                                return <StockTable name={val.productName} key={val.id}
                                    update={() => { updateStock(val.id) }}
                                    remove={() => { removeStock(val.id) }}
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

export default SubStock;