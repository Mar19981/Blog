import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material"
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

const validationSchema = yup.object({
    username: yup.string().required("Wpisz nazwę użytkownika"),
    password: yup.string().required("Wpisz hasło")
});

const LoginDialog = () => {
    const [showDialog, setShowDialog] = useState<boolean>(false);

    const handleClose = () => { 
        formik.resetForm();
        setShowDialog(false);
    }
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleClose();
        }
    }
    );

    return (
        <>
        <Button color="inherit" onClick={() => setShowDialog(true)}>Logowanie</Button>
        <Dialog open={showDialog} onClose={handleClose}>
            <DialogTitle>Zaloguj się</DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    <TextField id="username" label="Nazwa użytkownika" variant="outlined" {...formik.getFieldProps("username")} error={formik.touched.username && Boolean(formik.errors.username)} helperText={formik.touched.username && formik.errors.username}/>
                    <TextField id="password" label="Hasło" variant="outlined" type="password" {...formik.getFieldProps("password")} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password}/>
                </Stack>
            </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          <Button type="submit">Wyślij</Button>
        </DialogActions>
        </Dialog>
        </>
    )
}
export default LoginDialog;