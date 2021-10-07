import { getDatabase, ref, get, child } from "firebase/database";
import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
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
import UserTable from "../../components/UserTable";

const Accounts = () => {
  const  history = useHistory();
  const dbRef = ref(getDatabase());
  const [value, setValue] = React.useState(1);
  const { writeUserData, showData, user,token } = useContext(loginContext);

  useEffect(()=>{
    if(!user || !token || !showData[user.id]?.isVerify){
      history.replace("/");

    }
  })
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    }
  });
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleVerification = (id) => {
    get(child(dbRef, `users/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const user = snapshot.val();
        writeUserData("users", id, { ...user, isVerify: !(user.isVerify) })
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

  }
  return (
    <Box sx={{ width: '90%', typography: 'body1', margin: "30px auto" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderWidth: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Pending" value={0} />
            <Tab label="Approved" value={1} />
          </TabList>
        </Box>
        <TableContainer style={{ maxWidth: "70%", margin: "0 auto" }}>
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
              {value ? Object.values(showData)?.map((val) => {
                if (val.isVerify) {
                  return <UserTable title="Demote" val={val} onClick={() => { handleVerification(val.id) }} />
                }
              })
                :
                Object.values(showData)?.map((val) => {
                  if (!val.isVerify) {
                    return <UserTable title="Promote" val={val} onClick={() => { handleVerification(val.id) }} />
                  }

                })
              }

            </TableBody>
          </Table>
        </TableContainer>
      </TabContext>
    </Box>
  );
}
export default Accounts;

