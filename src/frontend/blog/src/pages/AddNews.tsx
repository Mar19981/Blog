import { Navigate, useNavigate } from "react-router";
import LoggedInDto from "../dtos/LoggedInDto";
import UserType from "../shared/UserType";
import { Button, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import NewsType from "../shared/NewsType";
import Backdrop from "../components/Backdrop";
import * as yup from "yup";
import { useFormik } from "formik";
import AddArticleDto from "../dtos/AddArticleDto";
import API_SERVER from "../shared/consts";

interface AddNewsProps {
    user: LoggedInDto | null
}
const validationSchema = yup.object({
    title: yup.string().required("Wpisz tytuł artykułu"),
    content: yup.string().required("Uzupełnij treść artykułu"),
    newsType: yup.number().required().oneOf([1, 2, 3, 4, 5])
});

const AddNews = ({user}: AddNewsProps) => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
            newsType: NewsType.EVENT
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const payload: AddArticleDto = {
                title: values.title, 
                text: values.content, 
                type: values.newsType, 
                create_sysuser: user === null ? 1 : user.id,
            };
            const res = await fetch(`http://${API_SERVER}/article`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            console.log(data);
            navigate("/");

        }
    }
    );

    if (user === null || user.type !== UserType.EDITOR) {
        return (<Navigate to="/"></Navigate>)
    }
    return (
                <>
        <Backdrop>
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
                <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
                    <TextField label="Tytuł" sx={{flexGrow: 2}} {...formik.getFieldProps("title")} error={formik.touched.title && Boolean(formik.errors.title)} helperText={formik.touched.title && formik.errors.title}/>
                    <Select id="newsType" {...formik.getFieldProps("newsType")} label="Rodzaj">
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
            </form>
        </Backdrop>
        </>
    )
}
export default AddNews;