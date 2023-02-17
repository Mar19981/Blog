import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, Select, Stack, TextField } from "@mui/material"
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import RegisterDto from "../dtos/RegisterDto";
import UserDto from "../dtos/UserDto";
import API_SERVER from "../shared/consts";
import UserType from "../shared/UserType";

const validationSchema = yup.object({
    username: yup.string().required("Wpisz nazwę użytkownika"),
    password: yup.string().required("Wpisz hasło").min(8, "Hasło musi mieć minimum 8 znaków")
    .matches(/[0-9]/, 'Hasło musi mieć cyfrę')
    .matches(/[a-z]/, 'Hasło musi mieć małą literę')
    .matches(/[A-Z]/, 'Hasło musi mieć wielką literę')
    .matches(/[^\w]/, 'Hasło musi mieć znak specjalny'),
    email: yup.string().required().email("Wpisz prawidłowy adres email"),
    firstName: yup.string().required("Wpisz swoje imię"),
    lastName: yup.string().required("Wpisz swoje nazwisko"),
    userType: yup.number().required().oneOf([1, 2, 3])
});

interface UpdateUserProps {
    adminView?: boolean;
    setUser: React.Dispatch<React.SetStateAction<UserDto[]>>,
    user: UserDto
}

const UpdateUserDialog = ({adminView=true, setUser, user}: UpdateUserProps) => {
    const [showDialog, setShowDialog] = useState<boolean>(false);

    const handleClose = () => { 
        formik.resetForm();
        setShowDialog(false);
    }
    const formik = useFormik({
        initialValues: {
            username: user.username,
            email: user.email,
            password: user.password,
            firstName: user.name,
            lastName: user.surname,
            userType: user.type
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const payload: RegisterDto = {
                surname: values.lastName, 
                name: values.firstName, 
                type: values.userType, 
                username: values.username,
                email: values.email,
                password: values.password
            };
            const res = await fetch(`http://${API_SERVER}/user/${user.sysuser}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            console.log(data);
            user.email = values.email;
            user.type = values.userType;
            user.name = values.firstName;
            user.surname = values.lastName;
            user.password = values.password;
            user.username = values.username;
            setUser((prev) => prev.map((x) => x.sysuser === user.sysuser ? user : x));
            handleClose();
        }
    }
    );
    return (
        <>
            <Button color="inherit" onClick={() => setShowDialog(true)}>Edytuj</Button>
            <Dialog open={showDialog} onClose={handleClose}>
                <DialogTitle>Edytuj użytkownika</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                <DialogContent sx={{flex: 1}}>
                    <FormControl>
                        <Stack spacing={2}>
                            <TextField id="username" label="Nazwa użytkownika" variant="outlined" {...formik.getFieldProps("username")} error={formik.touched.username && Boolean(formik.errors.username)} helperText={formik.touched.username && formik.errors.username}/>
                            <Stack direction={"row"} spacing={2}>
                                <TextField id="firstName"  label="Imię" variant="outlined" {...formik.getFieldProps("firstName")} error={formik.touched.firstName && Boolean(formik.errors.firstName)} helperText={formik.touched.firstName && formik.errors.firstName}/>
                                <TextField id="lastName" label="Nazwisko" variant="outlined" {...formik.getFieldProps("lastName")} error={formik.touched.lastName && Boolean(formik.errors.lastName)} helperText={formik.touched.lastName && formik.errors.lastName}/>
                            </Stack>
                            <TextField id="email" label="Email" variant="outlined" type="email" {...formik.getFieldProps("email")} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} disabled/>
                            <TextField id="password" label="Hasło" variant="outlined" type="password" {...formik.getFieldProps("password")} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password}/>
                                <Select id="userType" {...formik.getFieldProps("userType")} sx={{display: adminView ? "inherit" : "none"}}>
                                    <MenuItem value={UserType.STANDARD}>Użytkownik</MenuItem>
                                    <MenuItem value={UserType.EDITOR}>Redaktor</MenuItem>
                                    <MenuItem value={UserType.ADMIN}>Administrator</MenuItem>
                                </Select>
                        </Stack>
                    </FormControl>
                </DialogContent>
                </form>
            <DialogActions>
            <Button onClick={handleClose}>Anuluj</Button>
            <Button type="submit">Wyślij</Button>
            </DialogActions>
            </Dialog>
        </>
    )
}
export default UpdateUserDialog;