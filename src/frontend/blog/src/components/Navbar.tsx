import {useState} from "react";
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
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
import RegisterDialog from "./RegisterDialog";
import LoginDialog from "./LoginDialog";

interface NavbarProps {
    logged?: boolean,
    type?: UserType
};

interface CategoryLink {
    name: string,
    destination: string;
}

const categories: Array<CategoryLink> = [ 
    {name: "Wiadomości", destination: "category/news"}, 
    {name: "Sport", destination: "category/sport"}, 
    {name: "Kultura", destination: "category/culture"}, 
    {name: "Nauka", destination: "category/science"},
    {name: "Lifestyle", destination: "category/lifestyle"}  
];

const Navbar = ({logged = false, type = UserType.STANDARD}: NavbarProps) => {
    const [sidebar, setSidebar] = useState<boolean>(false);
    const [anchor, setAnchor] = useState<null | HTMLElement>(null)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget);
    const handleClose = () => setAnchor(null);
    const handleLogout = () => {};

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
                    <LoginDialog/>
                    <RegisterDialog/>
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
                            <ListItemButton onClick={closeSidebar()}>
                            <RouterLink to={link.destination}>
                                <ListItemText primary={link.name}/>
                            </RouterLink>
                            </ListItemButton>
                    </ListItem>                   
                    ))}
                    <ListItem>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemText primary="Wyloguj się"/>
                        </ListItemButton>
                    </ListItem>     
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
                {categories.map((category, index) => {
                    return (<MenuItem onClick={handleClose} key={index}>
                        <RouterLink to={category.destination}>{category.name}</RouterLink>
                        </MenuItem>)
                    
                })}
        </Menu>
        </>
    );
}

export default Navbar;