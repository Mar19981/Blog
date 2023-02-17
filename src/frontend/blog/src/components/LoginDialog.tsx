import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material"
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import LoggedInDto from "../dtos/LoggedInDto";
import API_SERVER from "../shared/consts";

interface LoginProps {
    setUser:  React.Dispatch<React.SetStateAction<LoggedInDto | null>>
};
const validationSchema = yup.object({
    login: yup.string().required("Wpisz nazwę użytkownika"),
    password: yup.string().required("Wpisz hasło")
});

const LoginDialog = ({setUser}: LoginProps) => {
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const handleClose = () => { 
        formik.resetForm();
        setShowDialog(false);
    }
    const formik = useFormik({
        initialValues: {
            login: "",
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const res = await fetch(`http://${API_SERVER}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });
            const data = await res.json();
            console.log(data);
            setUser(data);
            handleClose();
        }
    }
    );

    return (
        <>
        <Button color="inherit" onClick={() => setShowDialog(true)}>Logowanie</Button>
        <Dialog open={showDialog} onClose={handleClose}>
            <DialogTitle>Zaloguj się</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
            <DialogContent>
                <Stack spacing={2}>
                    <TextField id="login" label="Nazwa użytkownika" variant="outlined" {...formik.getFieldProps("login")} error={formik.touched.login && Boolean(formik.errors.login)} helperText={formik.touched.login && formik.errors.login}/>
                    <TextField id="password" label="Hasło" variant="outlined" type="password" {...formik.getFieldProps("password")} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password}/>
                </Stack>
            </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          <Button type="submit">Wyślij</Button>
        </DialogActions>
        </form>
        </Dialog>
        </>
    )
}
export default LoginDialog;