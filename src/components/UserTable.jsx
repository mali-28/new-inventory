import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const UserTable = ({val, ...props}) =>{
    return<>
    <TableRow key={val.id}>
                <TableCell component="th" scope="row">
                  {val.name}
                </TableCell>
                <TableCell align="center">{val.email}</TableCell>
                <TableCell align="center">{val.id}</TableCell>
                <TableCell align="center">{val.isVerify? "true" : "false"}</TableCell>
                <TableCell align="center"><button onClick={props.onClick}>{props.title}</button></TableCell>
              </TableRow>
    </>
}
export default UserTable;