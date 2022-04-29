import { useContext } from "react";
import NextLink from "next/link";

import { UIContext } from "../../context/ui";
import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material"

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

            <NextLink href="/" passHref>
              <Link underline="none" color="white">
                <Typography variant="h6">Da.B Open Jira</Typography>
              </Link>
            </NextLink>

        </Toolbar>
    </AppBar>
  )
}

export default Navbar