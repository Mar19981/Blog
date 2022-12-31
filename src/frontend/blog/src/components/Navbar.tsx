import {useState} from "react";
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Person from '@mui/icons-material/Person';
import { Link as RouterLink } from 'react-router-dom';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { Box } from "@mui/system";
import { ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import userProperties from "../shared/UserProperties";
import UserType from "../shared/UserType";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface NavbarProps {
    logged?: boolean,
    type?: UserType
};

const Navbar = ({logged = true, type = UserType.STANDARD}: NavbarProps) => {
    const [sidebar, setSidebar] = useState<boolean>(false);
    const [anchor, setAnchor] = useState<null | HTMLElement>(null)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget);
    const handleClose = () => setAnchor(null);

    const closeSidebar = () =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
              event.type === 'keydown' &&
              ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
            ) {
              return;
            }
        setSidebar(false);
    };
    return (
        <>
        <AppBar position="static">
            <Toolbar>
                {logged &&
                <>
                <Avatar>
                    <IconButton onClick={() => setSidebar(!sidebar)}>
                        <Person></Person>
                    </IconButton>
                </Avatar>
                <Typography sx={{ml: 1}}>
                    User
                </Typography>
                </>
                }
                {!logged &&                    
                    <>
                    <Button color="inherit">Zaloguj się</Button>
                    <Button color="inherit">Rejestracja</Button>
                    </>
                }
                <Button color="inherit">Blog</Button>
                <Button color="inherit"         
                    id="news-button"
                    aria-controls={anchor ? 'news-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={anchor ? 'true' : undefined}
                    onClick={handleClick}>
                    Newsy
                </Button>
            </Toolbar>
            
        </AppBar>
        <Drawer anchor="left" open={sidebar} onClose={closeSidebar()}>
            <Box sx={{ width: 250, bgcolor: 'background.paper' }}>
                <List>
                    {userProperties[type].navigation?.map((link, index) => (
                    <ListItem key={link.name}>
                        <ListItemButton>
                            <ListItemText primary={link.name}/>
                        </ListItemButton>
                    </ListItem>                   
                    ))}
                </List>
            </Box>
        </Drawer>
        <Menu 
            id="news-menu" 
            anchorEl={anchor} 
            open={Boolean(anchor)} 
            onClose={handleClose} 
            MenuListProps ={{"aria-labelledby": "news-button",}}
            >
                <MenuItem onClick={handleClose}>Wydarzenia</MenuItem>
                <MenuItem onClick={handleClose}>Sport</MenuItem>
                <MenuItem onClick={handleClose}>Kultura</MenuItem>
                <MenuItem onClick={handleClose}>Nauka</MenuItem>
                <MenuItem onClick={handleClose}>Lifestyle</MenuItem>
        </Menu>
        </>
    );
}

export default Navbar;