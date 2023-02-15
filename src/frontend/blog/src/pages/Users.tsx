import { TableContainer, TableRow, TableCell, Table, TableBody, TableFooter, TablePagination, Typography } from "@mui/material"
import Backdrop from '../components/Backdrop'
import RegisterDialog from "../components/RegisterDialog";
import {useState} from "react";
import UserDto from "../dtos/UserDto";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import UserType from "../shared/UserType";
import DeleteDialog from "../components/DeleteDialog";

const Users = () => {
    const [users, setUsers] = useState<Array<UserDto>>([
       {id: 1, password: "123", userName: "Hiszpan13", firstName: "Hieronim", lastName: "Cipior", email: "hiszpan13@tlen.pl", userType: UserType.ADMIN, isActive: true, joinDate: new Date()},
       {id: 1, password: "123", userName: "Hiszpan13", firstName: "Hieronim", lastName: "Cipior", email: "hiszpan13@tlen.pl", userType: UserType.ADMIN, isActive: true, joinDate: new Date()},
       {id: 1, password: "123", userName: "Hiszpan13", firstName: "Hieronim", lastName: "Cipior", email: "hiszpan13@tlen.pl", userType: UserType.ADMIN, isActive: true, joinDate: new Date()},
       {id: 1, password: "123", userName: "Hiszpan13", firstName: "Hieronim", lastName: "Cipior", email: "hiszpan13@tlen.pl", userType: UserType.ADMIN, isActive: true, joinDate: new Date()},
       {id: 1, password: "123", userName: "Hiszpan13", firstName: "Hieronim", lastName: "Cipior", email: "hiszpan13@tlen.pl", userType: UserType.ADMIN, isActive: true, joinDate: new Date()},
       {id: 1, password: "123", userName: "Hiszpan13", firstName: "Hieronim", lastName: "Cipior", email: "hiszpan13@tlen.pl", userType: UserType.ADMIN, isActive: true, joinDate: new Date()},
    ]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
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
                                    Imię
                                </TableCell>                        
                                <TableCell style={{width: "5vw"}}>
                                    Nazwisko
                                </TableCell>                        
                                <TableCell style={{width: "5vw"}}>
                                    Typ
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
                                <TableRow key={user.id}>
                                <TableCell component="th" scope="row" style={{width: "5vw"}}>
                                    {user.id}
                                </TableCell>
                                <TableCell style={{width: "5vw"}}>
                                    {user.firstName}
                                </TableCell>                                
                                <TableCell style={{width: "5vw"}}>
                                    {user.lastName}
                                </TableCell>
                                <TableCell style={{width: "5vw"}}>
                                    {user.userType}
                                </TableCell>                                
                                <TableCell style={{width: "5vw"}}>
                                    <RegisterDialog/>
                                </TableCell>                                
                                <TableCell style={{width: "5vw"}}>
                                    <DeleteDialog message="Czy chcesz usunąć użytkownika?" entityName={user.userName} deletedEntity={user}/>
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