import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import { getDatabase, ref, set, child ,remove} from "firebase/database";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { AdminContext } from '../context/WorkContext';
import StockTable from "./StockTable";



const Stock = ({user, ...props}) =>{
    const db = getDatabase();

    const dbRef = ref(getDatabase());
    const { writeData, stockData, stockInfo,setStockInfo,setStoreInfo} = useContext(AdminContext);
    const [cond, setCond] = useState(true);

    const [stockState, setStockState] = React.useState({
        name: "",
        quantity: 0,
        price : 0,
        id: "",

    });

    const stockEvent = (event) => {
        const { name, value } = event.target;
        setStockState((preVal) => {
            return { ...preVal, [name]: value }
        })

    }

    const stock = () => {
        if(cond){
            const uid = `${user.id}_${new Date().getTime()}`;
            writeData(uid, "stock", { ...stockState, id: uid, name : (stockState.name).toLowerCase() })
            
        }else{
            set(ref(db, `stock/`+ stockState.id), {
                ...stockState
            });
            setCond(true);

        }

        setStockState({
            name: "",
            quantity: 0,
            price : 0,
            id: "",
    
        })
    }
    const updateStock = (key) =>{
        setCond(false);
          const value = stockInfo[key];
          setStockState({
                    name:value.name,
                    quantity: value.quantity,
                    price : value.price,
                    id: value.id,
            
                });
    }
    const removeStock = (key) =>{
                remove(child(dbRef, `stock/${key}`));

            }
    return <>
    <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch', },
            }}
            NoValidate
            autoComplete="off"
        >
            <TextField name="name" disabled={!cond} value={stockState.name} onChange={stockEvent} id="standard-basic" label="Name of Product" variant="standard" />
            <TextField name="price" value={stockState.price} onChange={stockEvent} id="standard-basic" type="number" label="Price" variant="standard" />

            <TextField name="quantity" value={stockState.quantity} onChange={stockEvent} id="standard-basic" type="number" label="Quantity of Product" variant="standard" />
            
            <Button onClick={() => { stock() }} style={{ padding: 15 }} variant="outlined">{cond? "Add Stock...": "Update Stock"}</Button>
        </Box>

        <TableContainer style={{ maxWidth: "70%", margin: "0 auto" }}>
            {stockInfo ?
                <Table className={props.classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(stockInfo)?.map((val) => {
                            console.log("name",val.name )
                            return <StockTable name={val.name} key={val.id} remove = {()=>{removeStock(val.id)}} update={()=>{updateStock(val.id)}} title="Demote" val={val} />
                        })
                        }

                    </TableBody>
                </Table> : <h1 className="mt-3 red">No Stock is avalable for Sell</h1>}
        </TableContainer>
    </>
}
export default Stock;