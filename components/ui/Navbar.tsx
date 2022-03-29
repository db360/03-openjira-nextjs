import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';

export const Navbar = () => {
  return (
    <AppBar position="sticky">
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
            >
                <MenuIcon />
            </IconButton>

            <Typography variant="h6">Da.B Open Jira</Typography>

        </Toolbar>
    </AppBar>
  )
}

export default Navbar