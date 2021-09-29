import React, {useEffect, useContext} from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { loginContext } from "../../context/context";

const Accounts = () =>{
    
    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        }
      });
      
      const classes = useStyles();
    const [value, setValue] = React.useState(1);
    const {pendingData, approvedData} = useContext(loginContext);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  console.log("pe", pendingData, "a", approvedData)
    return (
      <Box sx={{ width: '90%', typography: 'body1', margin : "30px auto" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1,borderWidth : 1, borderColor: 'divider'}}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Pending" value= {0} />
              <Tab label="Approved" value={1} />
            </TabList>
          </Box>
          <TableContainer style={{ maxWidth: "70%", margin : "0 auto" }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">email</TableCell>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">IsVerified</TableCell>
              <TableCell align="center">button</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value ? (approvedData?.map((val) => (
              <TableRow key={val.name}>
                <TableCell component="th" scope="row">
                  {val.name}
                </TableCell>
                <TableCell align="center">{val.email}</TableCell>
                <TableCell align="center">{val.id}</TableCell>
                <TableCell align="center">{val.isVerify? "true" : "false"}</TableCell>
                <TableCell align="center">abc</TableCell>
              </TableRow>
            ))): (pendingData?.map((val) => (
                <TableRow key={val.name}>
                <TableCell component="th" scope="row">
                  {val.name}
                </TableCell>
                <TableCell align="center">{val.email}</TableCell>
                <TableCell align="center">{val.id}</TableCell>
                <TableCell align="center">{val.isVerify? "true" : "false"}</TableCell>
                <TableCell align="center">abc</TableCell>
              </TableRow>
              )))}
          </TableBody>
        </Table>
      </TableContainer>
        </TabContext>
      </Box>
    );
  }
export default Accounts;
