import { Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import NewsType from "../shared/NewsType";

interface NewsElementProps {
    id: number,
    title: string,
    category: NewsType,
    date: Date,
    author: string

}

const NewsElement = ({id, title, category, date, author}: NewsElementProps) => {
    return (
        <Paper elevation={3} sx={{maxWidth: 500, minHeight: 200, padding: 2, display: "flex", flexDirection: "column"}}>
            <Stack direction={"row"} justifyContent="space-between">
                <Typography> {date.toLocaleDateString()}</Typography>
                <Typography> {category.toLocaleUpperCase()}</Typography>
            </Stack>
            <Typography variant="overline">{author}</Typography>
            <Typography variant="h4">{title.toLocaleUpperCase()}</Typography>
            <Typography alignSelf={"flex-end"} variant="button"><Link to={`/news/${id}`}>Czytaj dalej...</Link></Typography>
        </Paper>
    )
}
export default NewsElement;