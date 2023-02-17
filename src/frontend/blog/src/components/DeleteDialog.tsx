import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";
import API_SERVER from "../shared/consts";

interface DeleteProps {
    message: string,
    entityName: string,
    url: string,
    id: number
}
const DeleteDialog = ({message, entityName, url, id}: DeleteProps) => {
    const [showDialog, setShowDialog] = useState<boolean>(false);

    const handleClose = () => { 
        setShowDialog(false);
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch(`http://${API_SERVER}/${url}/${id}`, {
                method: "DELETE"
            });
            const data = await res.json();
            console.log(data);
            handleClose();
    }
    return (
        <>
        <Button color="inherit" onClick={() => setShowDialog(true)}>Usuń</Button>
        <Dialog open={showDialog} onClose={handleClose}>
            <DialogTitle>Usuń {entityName}</DialogTitle>
            <form onSubmit={(e) => handleSubmit(e)}>
            <DialogContent>
                <Typography>
                    {message}
                </Typography>
            </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Nie</Button>
          <Button type="submit">Tak</Button>
        </DialogActions>
        </form>
        </Dialog>
        </>
    )
    };

export default DeleteDialog;