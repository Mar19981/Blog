import { Button, Paper, Stack, Typography, Container } from "@mui/material";
import DeleteDialog from "./DeleteDialog";
import CommentDto from "../dtos/CommentDto";
import {useState} from "react";
import CommentForm from "./CommentForm";

const dto: CommentDto | null = null;
const Comment = () => {
    const [editing, setEditing] = useState<boolean>(false);
    const buttonText: string = !editing ? "Edytuj" : "Anuluj";
    const handleClick = () => {
        setEditing((prevState) => !prevState);
    }
    return(
        <>
        <Paper style={{width: "80%", minHeight: 100, padding: 5}}>
            <Stack>
            <Stack direction="row" justifyContent="space-between">
                <Typography>Czang kaj czek (3y42424255)</Typography>
                <Stack direction="row" justifyContent="space-between">
                    <Button onClick={handleClick}>{buttonText}</Button>
                    { !editing &&
                        
                        <DeleteDialog message="Czy chcesz usunąć komentarz?" entityName="komentarz" deletedEntity={dto}></DeleteDialog>
                    }
                </Stack>
            </Stack>
            {!editing &&
                <Typography>sudfahfousahfoishvshviusdhfojhsodghoshfgosjfdpo</Typography>
            }
            {editing &&
                (
                <Container style={{alignSelf: "center", width:"100%", display: "flex", justifyContent: "center"}}>
                    <CommentForm/>
                </Container>
                )
            }
            </Stack>
            </Paper>
        </>
    )
}
export default Comment;