import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
import NightlightIcon from '@mui/icons-material/Nightlight';

interface HeaderProps {
    darkMode: boolean;
    handleThemeChange: () => void;
}

export default function Header({ darkMode, handleThemeChange }: HeaderProps) {
    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                <Typography variant="h6">RE-STORE</Typography>
                <Switch checked={darkMode} onChange={handleThemeChange} /> <NightlightIcon />
            </Toolbar>
        </AppBar>
    )
}