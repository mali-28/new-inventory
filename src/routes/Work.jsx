import React, { useContext ,useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { loginContext } from "../context/context";
import { AdminContext } from '../context/WorkContext';
import { makeStyles } from "@material-ui/core/styles";
import Purchase from '../components/Purchase';
import Stores from "../components/Stores";
import Stock from "../components/Stock";
import SubStock from "../components/SubStock";
import Sell from "../components/Sell";
import Graph from "../components/Graph";
import { getLocalStorage, removeLocalStorageKey, setLocalStorage } from '../utils/utils';
import { localStorageKeys } from "../utils/constant";

const Work = () => {
    const { user, token } = useContext(loginContext);
    const { writeData, storeInfo, setPurchaseInfo } = useContext(AdminContext);
    const [value, setValue] = React.useState("purchaseDetail");
    const history = useHistory();
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        }
    });
    const classes = useStyles();

    useEffect(()=>{
        if(!getLocalStorage(localStorageKeys.user) || !getLocalStorage(localStorageKeys.token)){
            history.replace("/")
        }
    },[])


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '90%', typography: 'body1', margin: "40px auto" }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', width: "100%", }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Purchase Details" value="purchaseDetail" />
                        <Tab label="Stores" value="store" />
                        <Tab label="Stock" value="stock" />
                        <Tab label="Sub-Stocks" value="subStocks" />
                        <Tab label="Sell-Details" value="sellDetails" />
                        <Tab label="Graph" value="graph" />
                    </TabList>

                </Box>

                <TabPanel value="purchaseDetail" style={{ margin: "0 auto", textAlign: "center" }}>

                    <Purchase user={user} classes={classes} />

                </TabPanel>
                <TabPanel value="store"  style={{margin: "0 auto", textAlign: "center" }}>
                   <Stores user={user} classes={classes}/>
                    
                </TabPanel>
                <TabPanel value="stock"  style={{margin: "0 auto", textAlign: "center" }}>

                    <Stock user={user} classes={classes}/>

                </TabPanel>

                <TabPanel value="subStocks"  style={{margin: "0 auto", textAlign: "center" }}>
                <SubStock  user={user} classes={classes}/>
                </TabPanel>

                <TabPanel value="sellDetails"  style={{margin: "0 auto", textAlign: "center" }}>
                    <Sell user={user} classes={classes}/>
                </TabPanel>

                <TabPanel value="graph"  style={{margin: "0 auto", textAlign: "center" }}>
                    <Graph/>
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default Work;