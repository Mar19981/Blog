import { TableContainer, TableRow, TableCell, Table, TableBody, TableFooter, TablePagination, Typography } from "@mui/material"
import Backdrop from '../components/Backdrop'
import RegisterDialog from "../components/RegisterDialog";
import {useEffect, useState} from "react";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import DeleteDialog from "../components/DeleteDialog";
import CommentDto from "../dtos/CommentDto";
import API_SERVER from "../shared/consts";
import LoggedInDto from "../dtos/LoggedInDto";
import { Navigate } from "react-router";
import UserType from "../shared/UserType";

interface MyCommentsProps {
    user: LoggedInDto | null
}

const MyComments = ({user}: MyCommentsProps) => {
    const [comments, setComments] = useState<Array<CommentDto>>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    useEffect(() => {
        const getComments = async () => {
          const commentsFromServer = await fetchUsers()
          setComments(Array.isArray(commentsFromServer) ? commentsFromServer : [])
        }
    
        getComments()
      }, [])
    
      // Fetch Tasks
      const fetchUsers = async () => {
        const res = await fetch(`http://${API_SERVER}/user/${user?.id}/comments`)
        console.log(res);
        const data = await res.json()
    
        return data
      }
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - comments.length) : 0;
  
    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    if( user === null || user.type === UserType.ADMIN) {
        return (<Navigate to="/"></Navigate>)
    }
    return (
        <>
            <Backdrop>
                <Typography variant="h2" align="center" marginBottom={5}>Użytkownicy</Typography>
                <TableContainer style={{border: "1px solid #515151"}}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{width: "5vw"}}>
                                    Id
                                </TableCell>                        
                                <TableCell style={{width: "5vw"}}>
                                    Data
                                </TableCell>                                              
                                <TableCell style={{width: "5vw"}}>
                                    Treść
                                </TableCell>                        
                            </TableRow>                    
                            {(rowsPerPage > 0 
                                ? comments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : comments
                            ).map((comment) => (
                                <TableRow key={comment.syscomment}>
                                <TableCell component="th" scope="row" style={{width: "5vw"}}>
                                    {comment.syscomment}
                                </TableCell>
                                <TableCell style={{width: "5vw"}}>
                                    {new Date(comment.create_date).toLocaleDateString()}
                                </TableCell>                                
                                <TableCell style={{width: "5vw"}}>
                                    {comment.text}
                                </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                count={comments.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                    'aria-label': 'Rzędy na stronę',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Backdrop>
        </>
    );
}
export default MyComments;