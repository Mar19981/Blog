import Backdrop from '../components/Backdrop';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
const ArticlePage = () => {
    return (
        <>
        <Backdrop>
            <Stack spacing={5}>
                <Stack direction={"row"} spacing={2} justifyContent="space-between">
                    <Typography variant="body2">11.05.1998</Typography>
                    <Typography variant="body2">Janusz korwin-mikke</Typography>
                </Stack>
                <Typography variant="h2">Uratowano wolność na TianAnmen!</Typography>            
                <Typography variant="body1">ahfisahfsahbfisahfisfiuowshfoshfosfoshffhsigohsgihsgishf</Typography>            
            <Backdrop>
                <Stack spacing={5} alignItems="center">
                <Typography variant="h5" alignSelf="flex-start">Komentarze</Typography>
                <CommentForm></CommentForm>
                <Stack width="100%" alignItems="center"  justifyContent={"center"}>
                    <Comment></Comment>
                </Stack>
                </Stack>
                </Backdrop>
            </Stack>
        </Backdrop>
        </>
    );
}
export default ArticlePage;