import { useContext } from "react";
import { UIContext } from "../../context/ui";

import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';

export const Navbar = () => {

  const {openSideMenu} = useContext( UIContext ) // Traemos la function a traves del context
  return (
    <AppBar position="sticky">
        <Toolbar>
            <IconButton
                onClick={ openSideMenu }
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