import { Button, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import NewsType from "../shared/NewsType";
import Backdrop from "./Backdrop";

const NewsForm = () => {
    return(
        <Backdrop>
            <Stack spacing={3}>
                <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
                    <TextField label="Tytuł" sx={{flexGrow: 2}}></TextField>
                    <Select value={NewsType.EVENT} label="Rodzaj">
                        <MenuItem value={NewsType.EVENT}>Wydarzenia</MenuItem>
                        <MenuItem value={NewsType.SPORT}>Sport</MenuItem>
                        <MenuItem value={NewsType.CULTURE}>Kultura</MenuItem>
                        <MenuItem value={NewsType.SCIENCE}>Nauka</MenuItem>
                        <MenuItem value={NewsType.LIFESTYLE}>Lifestyle</MenuItem>
                    </Select>
                </Stack>
                <TextField minRows={30} maxRows={30} multiline label="Treść"></TextField>
                <Button sx={{maxWidth:"20%", alignSelf: "flex-end"}} variant="outlined" type="submit">Dodaj</Button>
            </Stack>
        </Backdrop>
    )
}
export default NewsForm;