import { Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import NewsType from "../shared/NewsType";

interface NewsElementProps {
    id: number,
    title: string,
    category: NewsType,
    date: Date,

}

const NewsElement = ({id, title, category, date}: NewsElementProps) => {
    return (
        <Paper elevation={3} sx={{maxWidth: 500, minHeight: 200, padding: 2, display: "flex", flexDirection: "column", marginTop: 5}}>
            <Stack direction={"row"} justifyContent="space-between">
                <Typography> {new Date(date).toLocaleDateString()}</Typography>
                <Typography> 
                    {category === NewsType.CULTURE && "Kultura"}
                    {category === NewsType.SPORT && "Sport"}
                    {category === NewsType.EVENT && "Wydarzenia"}
                    {category === NewsType.LIFESTYLE && "Lifestyle"}
                    {category === NewsType.SCIENCE && "Nauka"}
                    </Typography>
            </Stack>
            <Typography variant="h5">{title.toLocaleUpperCase()}</Typography>
            <Typography alignSelf={"flex-end"} variant="button"><Link to={`/news/${id}`} style={{color:"#D6D6D6", textDecoration: "none"}}>Czytaj dalej...</Link></Typography>
        </Paper>
    )
}
export default NewsElement;