import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from '@mui/material/Button';

const  StockTable = ({name,val, ...props}) =>{

  
    return<>
    <TableRow key={val.id}>
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell align="center">{val.quantity}</TableCell>
                
                  <TableCell align="center"> 
                  <Button onClick={props.update} style={{ padding: 3 , marginRight : 5}} variant="outlined">Update</Button>
                  <Button onClick={props.remove} style={{ padding: 3 }}  variant="outlined">Remove</Button>
</TableCell>
                
              </TableRow>
    </>
}

export default StockTable;