import { FC } from "react";
import Head from "next/head"
import { Box } from "@mui/material"
import { Navbar, Sidebar } from "../ui";

interface Props {
    title?: string;
}

export const Layout:FC<Props> = ({ title = 'Da.B Open Jira App', children }) => {
  return (
      <Box sx={{ flexFlow: 1 }}>  {/* sx prop = tema */}
            <Head>
                <title>{title}</title>
            </Head>

            <Navbar />
            <Sidebar />

            {/* Sidebar */}

            <Box sx={{ padding: '10px 20px' }}>
                {children}
            </Box>

      </Box>
  )
}

export default Layout