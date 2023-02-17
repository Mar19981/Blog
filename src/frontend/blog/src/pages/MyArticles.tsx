import { TableContainer, TableRow, TableCell, Table, TableBody, TableFooter, TablePagination, Typography } from "@mui/material"
import Backdrop from '../components/Backdrop'
import {useEffect, useState} from "react";
import ArticleDto from "../dtos/ArticleDto";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import NewsType from "../shared/NewsType";
import DeleteDialog from "../components/DeleteDialog";
import API_SERVER from "../shared/consts";
import LoggedInDto from "../dtos/LoggedInDto";
import UserType from "../shared/UserType";
import { Navigate } from "react-router";

interface MyArticlesProps {
    user: LoggedInDto | null
}

const MyArticles = ({user}: MyArticlesProps) => {
    const [articles, setArticles] = useState<Array<ArticleDto>>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    useEffect(() => {
        const getArticles = async () => {
          const articlesFromServer = await fetchArticles()
          setArticles(Array.isArray(articlesFromServer) ? articlesFromServer : [])
        }
    
        getArticles()
      }, [])
    
      // Fetch Tasks
      const fetchArticles = async () => {
        const res = await fetch(`http://${API_SERVER}/user/${user?.id}/articles`)
        console.log(res);
        const data = await res.json()
    
        return data
      }
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - articles.length) : 0;
  
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
    if( user === null || user.type !== UserType.EDITOR) {
        return (<Navigate to="/"></Navigate>)
    }
    return (
        <>
            <Backdrop>
                <Typography variant="h2" align="center" marginBottom={5}>Artykuły</Typography>
                <TableContainer style={{border: "1px solid #515151"}}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{width: "5vw"}}>
                                    Id
                                </TableCell>                        
                                <TableCell style={{width: "5vw"}}>
                                    Tytuł
                                </TableCell>                        
                                <TableCell style={{width: "5vw"}}>
                                    Data
                                </TableCell>                        
                                <TableCell style={{width: "5vw"}}>
                                    Kategoria
                                </TableCell>                                
                                <TableCell style={{width: "5vw"}}>
                                    Dostępność
                                </TableCell>                                                       
                            </TableRow>                    
                            {(rowsPerPage > 0
                                ? articles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : articles
                            ).map((article) => (
                                <TableRow key={article.sysnews}>
                                <TableCell component="th" scope="row" style={{width: "5vw"}}>
                                    {article.sysnews}
                                </TableCell>
                                <TableCell style={{width: "5vw"}}>
                                    {article.title}
                                </TableCell>                                
                                <TableCell style={{width: "5vw"}}>
                                    {new Date (article.create_date).toLocaleDateString()}
                                </TableCell>
                                <TableCell style={{width: "5vw"}}>
                                    {article.type === NewsType.EVENT && "Wydarzenia"}
                                    {article.type === NewsType.LIFESTYLE && "Lifestyle"}
                                    {article.type === NewsType.SCIENCE && "Nauka"}
                                    {article.type === NewsType.CULTURE && "Kultura"}
                                    {article.type === NewsType.SPORT && "Sport"}
                                </TableCell>                                
                                <TableCell style={{width: "5vw"}}>
                                    {article.is_active && "Aktywny"}
                                    {!article.is_active && "Nieaktywny"}
                                </TableCell>                                
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                count={articles.length}
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
export default MyArticles;