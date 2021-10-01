import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const UserTable = ({val, ...props}) =>{
    return<>
    <TableRow key={val.userData.id}>
                <TableCell component="th" scope="row">
                  {val.userData.name}
                </TableCell>
                <TableCell align="center">{val.userData.email}</TableCell>
                <TableCell align="center">{val.userData.id}</TableCell>
                <TableCell align="center">{val.userData.isVerify? "true" : "false"}</TableCell>
                <TableCell align="center"><button onClick={props.onClick}>{props.title}</button></TableCell>
              </TableRow>
    </>
}

export default UserTable;