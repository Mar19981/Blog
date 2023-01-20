import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";

interface DeleteProps<EntityType> {
    message: string,
    entityName: string,
    deletedEntity: EntityType | null
}
const DeleteDialog = <EntityType extends unknown>({message, entityName, deletedEntity}: DeleteProps<EntityType>) => {
    const [showDialog, setShowDialog] = useState<boolean>(false);

    const handleClose = () => { 
        setShowDialog(false);
    };
    const handleSubmit = () => {}
    return (
        <>
        <Button color="inherit" onClick={() => setShowDialog(true)}>Usuń</Button>
        <Dialog open={showDialog} onClose={handleClose}>
            <DialogTitle>Usuń {entityName}</DialogTitle>
            <DialogContent>
                <Typography>
                    {message}
                </Typography>
            </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Nie</Button>
          <Button type="submit" onSubmit={handleSubmit}>Tak</Button>
        </DialogActions>
        </Dialog>
        </>
    )
    };

export default DeleteDialog;