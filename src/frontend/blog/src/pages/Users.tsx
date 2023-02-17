import { TableContainer, TableRow, TableCell, Table, TableBody, TableFooter, TablePagination, Typography } from "@mui/material"
import Backdrop from '../components/Backdrop'
import RegisterDialog from "../components/RegisterDialog";
import {useEffect, useState} from "react";
import UserDto from "../dtos/UserDto";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import UserType from "../shared/UserType";
import DeleteDialog from "../components/DeleteDialog";
import API_SERVER from "../shared/consts";
import LoggedInDto from "../dtos/LoggedInDto";
import { Navigate } from "react-router";
import UpdateUserDialog from "../components/UpdateUserDialog";

interface UsersProps {
    user: LoggedInDto | null
}

const Users = ({user}: UsersProps) => {
    const [users, setUsers] = useState<Array<UserDto>>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    useEffect(() => {
        const getUsers = async () => {
          const usersFromServer = await fetchUsers()
          setUsers(usersFromServer)
        }
    
        getUsers()
      }, [])
    
      // Fetch Tasks
      const fetchUsers = async () => {
        const res = await fetch(`http://${API_SERVER}/users`)
        console.log(res);
        const data = await res.json()
    
        return data
      }
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;
  
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
    if( user === null || user.type !== UserType.ADMIN) {
        return (<Navigate to="/"></Navigate>)
    }
    return (
        <>
            <Backdrop>
                <Typography variant="h2" align="center" marginBottom={5}>Użytkownicy</Typography>
                <RegisterDialog adminView={true}></RegisterDialog>
                <TableContainer style={{border: "1px solid #515151"}}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{width: "5vw"}}>
                                    Id
                                </TableCell>                        
                                <TableCell style={{width: "5vw"}}>
                                    Imię
                                </TableCell>                        
                                <TableCell style={{width: "5vw"}}>
                                    Nazwisko
                                </TableCell>                        
                                <TableCell style={{width: "5vw"}}>
                                    Typ
                                </TableCell>                        
                                <TableCell style={{width: "5vw"}}>
                                    Dostępność
                                </TableCell>                                 
                                <TableCell style={{width: "5vw"}}>
                                </TableCell>                                
                                <TableCell style={{width: "5vw"}}>
                                </TableCell>
                            </TableRow>                    
                            {(rowsPerPage > 0
                                ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : users
                            ).map((user) => (
                                <TableRow key={user.sysuser}>
                                <TableCell component="th" scope="row" style={{width: "5vw"}}>
                                    {user.sysuser}
                                </TableCell>
                                <TableCell style={{width: "5vw"}}>
                                    {user.name}
                                </TableCell>                                
                                <TableCell style={{width: "5vw"}}>
                                    {user.surname}
                                </TableCell>
                                <TableCell style={{width: "5vw"}}>
                                    {user.type === UserType.ADMIN && "Administrator"}
                                    {user.type === UserType.EDITOR && "Redaktor"}
                                    {user.type === UserType.STANDARD && "Użytkownik"}
                                </TableCell>                                
                                <TableCell style={{width: "5vw"}}>
                                    {user.is_active && "Aktywny"}
                                    {!user.is_active && "Nieaktywny"}
                                </TableCell>                                 
                                 <TableCell style={{width: "5vw"}}>
                                    <UpdateUserDialog user={user} setUser={setUsers}/>
                                </TableCell>                                
                                <TableCell style={{width: "5vw"}}>
                                    <DeleteDialog message="Czy chcesz usunąć użytkownika?" entityName={user.username} id={user.sysuser} url="user"/>
                                </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                count={users.length}
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
export default Users;