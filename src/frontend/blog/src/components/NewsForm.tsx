import { Button, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import NewsType from "../shared/NewsType";
import Backdrop from "./Backdrop";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
    title: yup.string().required("Wpisz tytuł artykułu"),
    content: yup.string().required("Uzupełnij treść artykułu"),
    newsType: yup.number().required().oneOf([1, 2, 3, 4, 5])
});

const NewsForm = () => {
    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
            newsType: NewsType.EVENT
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
        }
    }
    );
    return(
        <>
        <Backdrop>
            <Stack spacing={3}>
                <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
                    <TextField label="Tytuł" sx={{flexGrow: 2}} {...formik.getFieldProps("title")} error={formik.touched.title && Boolean(formik.errors.title)} helperText={formik.touched.title && formik.errors.title}/>
                    <Select value={NewsType.EVENT} label="Rodzaj">
                        <MenuItem value={NewsType.EVENT}>Wydarzenia</MenuItem>
                        <MenuItem value={NewsType.SPORT}>Sport</MenuItem>
                        <MenuItem value={NewsType.CULTURE}>Kultura</MenuItem>
                        <MenuItem value={NewsType.SCIENCE}>Nauka</MenuItem>
                        <MenuItem value={NewsType.LIFESTYLE}>Lifestyle</MenuItem>
                    </Select>
                </Stack>
                <TextField minRows={30} maxRows={30} multiline label="Treść"{...formik.getFieldProps("content")} error={formik.touched.content && Boolean(formik.errors.content)} helperText={formik.touched.content && formik.errors.content} />
                <Button sx={{maxWidth:"20%", alignSelf: "flex-end"}} variant="outlined" type="submit">Dodaj</Button>
            </Stack>
        </Backdrop>
        </>
    )
}
export default NewsForm;