import { Button, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { useFormik } from "formik";
import CommentDto from "../dtos/CommentDto";
import UpdateCommentDto from "../dtos/UpdateCommentDto";
import API_SERVER from "../shared/consts";

interface CommentEditFormProps {
    comment: CommentDto,
    setComment: React.Dispatch<React.SetStateAction<CommentDto[]>>,
    setEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const validationSchema = yup.object({
    content: yup.string().required("Uzupełnij treść komentarza"),
});
const CommentEditForm = ({comment, setComment, setEditing}:CommentEditFormProps) => {
    const formik = useFormik({
        initialValues: {
            content: comment.text,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const payload: UpdateCommentDto = {
                text: values.content
            }
            const res = await fetch(`http://${API_SERVER}/comment/${comment.syscomment}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            console.log(data);
            comment.text = values.content;
            setComment((prev) => prev.map((x) => x.syscomment === comment.syscomment ? comment : x))
            setEditing(false);
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
export default CommentEditForm;