import TextField from '@mui/material/TextField';
import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Button from '@mui/material/Button';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PurchaseTable from "./PurchaseTable";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { AdminContext } from '../context/WorkContext';

const Purchase = ({ user, ...props }) => {
    const { writeData, purchaseInfo, setPurchaseInfo,stock, setStock } = useContext(AdminContext)

    const [purchaseData, setPurchaseData] = React.useState({
        name: "",
        quantity: 0,
        date: new Date().toLocaleDateString(),
        totalPrice: 0,
        price: 0,
        id: "",

    });
     
    const purchase = () => {
        const uid = `${user.id}_${new Date().getTime()}`;
        writeData(uid, "purchaseDetail", { ...purchaseData, id: uid })
        setPurchaseData({
            name: "",
            quantity: 0,
            date: new Date().toLocaleDateString(),
            totalPrice: 0,
            price: 0,
            id: "",
    
        })
    }
    const purchaseEvent = (event) => {
        const { name, value } = event.target;
        setPurchaseData((preVal) => {
            return { ...preVal, [name]: value }
        })

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
            <TextField name="name" value={purchaseData.name} onChange={purchaseEvent} id="standard-basic" label="Name of Product" variant="standard" />
            <TextField name="price" value={purchaseData.price} onChange={purchaseEvent} id="standard-basic" type="number" label="Price" variant="standard" />
            <TextField name="quantity" value={purchaseData.quantity} onChange={purchaseEvent} id="standard-basic" type="number" label="Quantity of Product" variant="standard" />
            <TextField name="totalPrice" value={purchaseData.totalPrice} onChange={purchaseEvent} id="standard-basic" type="number" label="Total Price" variant="standard" />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Date"
                    name="date"
                    value={purchaseData.date}
                    onChange={(value) => {
                        setPurchaseData((preVal) => {
                            return { ...preVal, date: value.toLocaleDateString() }
                        })
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Button onClick={() => { purchase() }} style={{ padding: 15 }} variant="outlined">Add Detail...</Button>
        </Box>
        <TableContainer style={{ maxWidth: "70%", margin: "0 auto" }}>
            {purchaseInfo ?
                <Table className={props.classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Total Price</TableCell>
                            <TableCell align="center">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(purchaseInfo)?.map((val) => {
                            return <PurchaseTable key={val.id} title="Demote" val={val} />

                        })
                        }

                    </TableBody>
                </Table> : <h1 className="mt-3 red">No Product is avalable for Sell</h1>}
        </TableContainer>
    </>
}

export default Purchase;