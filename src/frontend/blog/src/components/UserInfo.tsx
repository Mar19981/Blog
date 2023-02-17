import { Avatar, Button, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import UserType from "../shared/UserType";
import {Link as RouterLink} from "react-router-dom"
import Person from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
import UserDto from "../dtos/UserDto";
import API_SERVER from "../shared/consts";

interface UserInfoProps{
    id: number,
}


const UserInfo = ({id}: UserInfoProps) => {
    const [user, setUsers] = useState<UserDto | any>({});
    useEffect(() => {
        const getUsers = async () => {
          const usersFromServer = await fetchUsers()
          setUsers(usersFromServer)
        }
    
        getUsers()
      }, [])
    
      // Fetch Tasks
      const fetchUsers = async () => {
        const res = await fetch(`http://${API_SERVER}/user/${id}`)
        console.log(res);
        const data = await res.json()
    
        return data
      }
    return (
        <Box sx={{maxWidth: 750}}>
            <Paper variant="outlined" sx={{padding: 5}}>
                <Stack alignItems={"center"} spacing={3}>
                    <Avatar sx={{ width: 64, height: 64 }}>
                        <Person/>
                    </Avatar>
                    <Typography variant="h4">
                        {`${user.name} ${user.surname} (${user.username})`}
                    </Typography>                    
                    <Typography variant="caption">
                        {user.type === UserType.STANDARD &&
                            `Użytkownik (od ${new Date(user.create_date).toLocaleDateString()})`}                        
                        {user.type === UserType.EDITOR &&
                            `Redaktor (od ${new Date(user.create_date).toLocaleDateString()})`
                        }                        
                        {user.type === UserType.ADMIN &&
                            `Administrator (od ${new Date(user.create_date).toLocaleDateString()})`
                        }
                    </Typography>
                    { user.type !== UserType.EDITOR &&
                        <RouterLink to={`/users/${id}/comments`} style={{color:"#D6D6D6", textDecoration: "none"}}>
                            <Button>Komentarze</Button>
                        </RouterLink>
                    }
                    {
                        user.type === UserType.EDITOR &&
                    <Stack direction={"row"} spacing={2}>
                        <RouterLink to={`/users/${id}/comments`} style={{color:"#D6D6D6", textDecoration: "none"}}>
                            <Button variant="outlined">Komentarze</Button>
                        </RouterLink>
                    <RouterLink to={`/users/${id}/news`} style={{color:"#D6D6D6", textDecoration: "none"}}>
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