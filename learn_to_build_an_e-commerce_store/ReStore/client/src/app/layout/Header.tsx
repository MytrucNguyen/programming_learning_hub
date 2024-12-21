import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import NightlightIcon from '@mui/icons-material/Nightlight';
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";

interface HeaderProps {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' },
]

const navStyle = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

export default function Header({ darkMode, handleThemeChange }: HeaderProps) {
    const { basket } = useAppSelector(state => state.basket);
    const { user } = useAppSelector(state => state.account);

    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar sx={{
                display: 'flex',
                justifyContent:
                    'space-between',
                alignItems: 'center',
            }}>

                <Box display='flex' alignItems='center' gap={1}>
                    <Typography
                        variant="h6"
                        component={NavLink}
                        to={'/'}
                        sx={{
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                    >
                        RE-STORE
                    </Typography>
                    <Box display='flex' alignItems='center'>
                        <Switch
                            checked={darkMode}
                            onChange={handleThemeChange}
                        />
                        <NightlightIcon />
                    </Box>
                </Box>

                <Box>
                    <List sx={{ display: 'flex' }}>
                        {midLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyle}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Box display='flex' alignItems='center' >
                    <IconButton
                        component={Link}
                        to={'/basket'}
                        size='large'
                        edge='start'
                        color='inherit'
                        sx={{ mr: 2 }}
                    >
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    {user ? (
                        <SignedInMenu />
                    ) : (
                        <List sx={{ display: 'flex' }}>
                            {rightLinks.map(({ title, path }) => (
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={navStyle}
                                >
                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}