import Backdrop from '../components/Backdrop';
import Stack from '@mui/material/Stack';
import NewsElement from '../components/NewsElement';
import NewsType from '../shared/NewsType';
const MainPage = () => {
    return (
        <>
        <Backdrop>
            <Stack spacing={5}>
                <Stack direction={"row"} spacing={2} justifyContent="space-between">
                    <NewsElement id={1} author="Janusz Korwin-Mikke" date={new Date()} title={"Uratowano wolność na Tiananmen!"} category={NewsType.EVENT} />
                    <NewsElement id={1} author="Janusz Korwin-Mikke" date={new Date()} title={"Uratowano wolność na Tiananmen!"} category={NewsType.EVENT} />
                    <NewsElement id={1} author="Janusz Korwin-Mikke" date={new Date()} title={"Uratowano wolność na Tiananmen!"} category={NewsType.EVENT} />
                </Stack>            
                <Stack direction={"row"} spacing={2} justifyContent="space-between">
                    <NewsElement id={1} author="Janusz Korwin-Mikke" date={new Date()} title={"Uratowano wolność na Tiananmen!"} category={NewsType.EVENT} />
                    <NewsElement id={1} author="Janusz Korwin-Mikke" date={new Date()} title={"Uratowano wolność na Tiananmen!"} category={NewsType.EVENT} />
                    <NewsElement id={1} author="Janusz Korwin-Mikke" date={new Date()} title={"Uratowano wolność na Tiananmen!"} category={NewsType.EVENT} />
                </Stack>                
                <Stack direction={"row"} spacing={2} justifyContent="space-between">
                    <NewsElement id={1} author="Janusz Korwin-Mikke" date={new Date()} title={"Uratowano wolność na Tiananmen!"} category={NewsType.EVENT} />
                    <NewsElement id={1} author="Janusz Korwin-Mikke" date={new Date()} title={"Uratowano wolność na Tiananmen!"} category={NewsType.EVENT} />
                    <NewsElement id={1} author="Janusz Korwin-Mikke" date={new Date()} title={"Uratowano wolność na Tiananmen!"} category={NewsType.EVENT} />
                </Stack>                
                <Stack direction={"row"} spacing={2} justifyContent="space-between">
                    <NewsElement id={1} author="Janusz Korwin-Mikke" date={new Date()} title={"Uratowano wolność na Tiananmen!"} category={NewsType.EVENT} />
                    <NewsElement id={1} author="Janusz Korwin-Mikke" date={new Date()} title={"Uratowano wolność na Tiananmen!"} category={NewsType.EVENT} />
                    <NewsElement id={1} author="Janusz Korwin-Mikke" date={new Date()} title={"Uratowano wolność na Tiananmen!"} category={NewsType.EVENT} />
                </Stack>
            </Stack>
        </Backdrop>
        </>
    );
}
export default MainPage;