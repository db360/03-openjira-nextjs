import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { Layout } from "../components/layouts";

const HomePage: NextPage = () => {
  return (
    <Layout title='Da.B Open Jira App'>
      <Typography variant="h1" color="primary">
        Hola Peñita
      </Typography>
    </Layout>
  );
};

export default HomePage;
