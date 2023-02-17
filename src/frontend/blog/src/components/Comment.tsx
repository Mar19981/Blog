import { Button, Paper, Stack, Typography, Container } from "@mui/material";
import DeleteDialog from "./DeleteDialog";
import {useState} from "react";
import CommentEditForm from "./CommentEditForm";
import CommentDto from "../dtos/CommentDto";
import { Link } from "react-router-dom";

interface CommentProps {
    text: string,
    id: number,
    author: string,
    date: Date,
    active: boolean,
    editable: boolean,
    comment: CommentDto,
    setComment: React.Dispatch<React.SetStateAction<CommentDto[]>>
}

const Comment = ({text, id, author, date, active, editable, comment, setComment}: CommentProps) => {
    const [editing, setEditing] = useState<boolean>(false);
    const buttonText: string = !editing ? "Edytuj" : "Anuluj";
    const editableComment: boolean = active && editable;
    const commentText: string = active ? text : "Komentarz usunięty";
    const handleClick = () => {
        setEditing((prevState) => !prevState);
    }
    return(
        <>
        <Paper style={{width: "80%", minHeight: 100, padding: 5}}>
            <Stack>
            <Stack direction="row" justifyContent="space-between">
                <Typography><Link to={`/user/${comment.sysuser}`} style={{color:"#D6D6D6", textDecoration: "none"}}>{`${author} (${new Date(date).toLocaleDateString()})`}</Link></Typography>
                { editableComment &&
                <Stack direction="row" justifyContent="space-between">
                    <Button onClick={handleClick}>{buttonText}</Button>
                    { !editing &&
                        
                        <DeleteDialog message="Czy chcesz usunąć komentarz?" entityName="komentarz" id={id} url="comment"></DeleteDialog>
                    }
                </Stack>
                }
            </Stack>
            {!editing &&
                <Typography>{commentText}</Typography>
            }
            {editing &&
                (
                <Container style={{alignSelf: "center", width:"100%", display: "flex", justifyContent: "center"}}>
                    <CommentEditForm comment={comment} setComment={setComment} setEditing={setEditing}/>
                </Container>
                )
            }
            </Stack>
            </Paper>
        </>
    )
}
export default Comment;