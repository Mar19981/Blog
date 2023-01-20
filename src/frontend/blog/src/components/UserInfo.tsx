import { Avatar, Button, CardActions, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import UserType from "../shared/UserType";
import {Link as RouterLink} from "react-router-dom"
import Person from "@mui/icons-material/Person";

interface UserInfoProps{
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    joinDate: Date,
    type: UserType
}


const UserInfo = ({id, username, firstName, lastName, joinDate, type}: UserInfoProps) => {
    return (
        <Box sx={{maxWidth: 750}}>
            <Paper variant="outlined" sx={{padding: 5}}>
                <Stack alignItems={"center"} spacing={3}>
                    <Avatar sx={{ width: 64, height: 64 }}>
                        <Person/>
                    </Avatar>
                    <Typography variant="h4">
                        {`${firstName} ${lastName} (${username})`}
                    </Typography>                    
                    <Typography variant="caption">
                        {type === UserType.STANDARD &&
                            `Użytkownik (od ${joinDate.toLocaleDateString()})`}                        
                        {type === UserType.EDITOR &&
                            `Redaktor (od ${joinDate.toLocaleDateString()})`
                        }                        
                        {type === UserType.ADMIN &&
                            `Administrator (od ${joinDate.toLocaleDateString()})`
                        }
                    </Typography>
                    { type !== UserType.EDITOR &&
                        <RouterLink to={`users/${id}/comments`}>
                            <Button>Komentarze</Button>
                        </RouterLink>
                    }
                    {
                        type === UserType.EDITOR &&
                    <Stack direction={"row"} spacing={2}>
                        <RouterLink to={`users/${id}/comments`}>
                            <Button variant="outlined">Komentarze</Button>
                        </RouterLink>
                    <RouterLink to={`users/${id}/news`}>
                        <Button variant="outlined">Wiadomości</Button>
                    </RouterLink>
                    </Stack>
                    }                 
                </Stack>
            </Paper>
        </Box>
    );
}
export default UserInfo;