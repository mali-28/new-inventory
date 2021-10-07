import React, {useState,useContext} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import StoreTable from "./StoreTable";
import { AdminContext } from '../context/WorkContext';


const Stores = ({user, ...props}) => {
    const [store, setStore] = useState("")
    const { writeData, storeInfo,setStoreInfo } = useContext(AdminContext);

    const storeData = () =>{
        const uid = `${user.id}_${new Date().getTime()}`;
        writeData(uid, "stores", { store : store.toLowerCase(), id: uid })
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

            <TextField onChange={(e) => { setStore(e.target.value)}} name="store" id="standard-basic" label="Add New Store" variant="standard" />
            <Button onClick={()=>{storeData()}} style={{ padding: 15 }} variant="outlined">Add Store...</Button>
        </Box>

        <TableContainer style={{ maxWidth: "70%", margin: "0 auto" }}>
            {storeInfo ?
                <Table className={props.classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>AdminCreater</TableCell>
                            <TableCell align="center">Stores</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(storeInfo)?.map((val) => {
                            return <StoreTable key={val.id} title="Demote" val={val} />
                        })
                        }

                    </TableBody>
                </Table> : <h1 className="mt-3 red">No Store is avalable for Sell</h1>}
        </TableContainer>

    </>
}

export default Stores;