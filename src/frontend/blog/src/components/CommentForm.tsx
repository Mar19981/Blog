import { Button, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
    content: yup.string().required("Uzupełnij treść komentarza"),
});
const CommentForm = () => {
    const formik = useFormik({
        initialValues: {
            content: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
        }
    });
    return(
        <>
            <Stack spacing={3} style={{width: "80%"}}>
                <TextField maxRows={5} multiline label="Treść"{...formik.getFieldProps("content")} error={formik.touched.content && Boolean(formik.errors.content)} helperText={formik.touched.content && formik.errors.content}></TextField>
                <Button sx={{maxWidth:"20%", alignSelf: "flex-end"}} variant="outlined" type="submit">Dodaj</Button>
            </Stack>
            </>
    )
}
export default CommentForm;