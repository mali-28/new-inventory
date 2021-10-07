import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const  StoreTable = ({val, ...props}) =>{
    return<>
    <TableRow key={val.id}>
                <TableCell component="th" scope="row">
                  {val.id}
                </TableCell>
                <TableCell style={{textTransform : "capitalize"}} align="center">{val.store}</TableCell>
                
              </TableRow>
    </>
}

export default StoreTable;