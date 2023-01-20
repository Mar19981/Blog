import Paper from '@mui/material/Paper';
import NewsElement from '../components/NewsElement';
import NewsType from '../shared/NewsType';
const MainPage = () => {
    return (
        <>
        <Paper sx={{width: "95vw", height: 900, padding: 2, overflowY: "scroll"}} elevation={2}  variant="outlined">
            <NewsElement id={1} author="Janusz Korwin-Mikke" date={new Date()} title={"Uratowano wolność na Tiananmen!"} category={NewsType.EVENT} />
        </Paper>
        </>
    );
}
export default MainPage;