import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const  PurchaseTable = ({val, ...props}) =>{
    return<>
    <TableRow key={val.id}>
                <TableCell component="th" scope="row">
                  {val.name}
                </TableCell>
                <TableCell align="center">{val.price}</TableCell>
                <TableCell align="center">{val.quantity}</TableCell>
                <TableCell align="center">{val.totalPrice}</TableCell>
                <TableCell align="center">{val.date}</TableCell>
                
              </TableRow>
    </>
}

export default PurchaseTable;