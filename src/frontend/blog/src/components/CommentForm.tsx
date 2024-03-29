import { Button, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { useFormik } from "formik";
import CreateCommentDto from "../dtos/CreateCommentDto";
import CommentDto from "../dtos/CommentDto";
import API_SERVER from "../shared/consts";

interface CommentFormProps {
    userId: number,
    articleId: number,
    setComment: React.Dispatch<React.SetStateAction<CommentDto[]>>,
}

const validationSchema = yup.object({
    content: yup.string().required("Uzupełnij treść komentarza"),
});
const CommentForm = ({userId, articleId, setComment}: CommentFormProps) => {
    const formik = useFormik({
        initialValues: {
            content: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const payload: CreateCommentDto = {
                sysnews: articleId, 
                sysuser: userId, 
                text: values.content, 
            };
            const res = await fetch(`http://${API_SERVER}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            const obj: CommentDto = {text: values.content, sysnews: articleId, sysuser: userId, create_date: new Date(), is_active:true, update_date:null, syscomment:-1}
            setComment((prev) => [...prev, obj]);
            formik.resetForm();
        }
    });
    return(
        <>
            <Stack spacing={3} style={{width: "80%"}}>
                <form onSubmit={formik.handleSubmit}>
                <TextField maxRows={5} multiline label="Treść"{...formik.getFieldProps("content")} error={formik.touched.content && Boolean(formik.errors.content)} helperText={formik.touched.content && formik.errors.content}></TextField>
                <Button sx={{maxWidth:"20%", alignSelf: "flex-end"}} variant="outlined" type="submit">Dodaj</Button>
                </form>
            </Stack>
            </>
    )
}
export default CommentForm;