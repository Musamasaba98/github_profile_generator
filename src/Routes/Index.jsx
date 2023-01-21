import { Grid } from "@mui/material";
import React from "react";
import { useLoaderData } from "react-router-dom";
import MyBarChart from "../components/Bar";
import Doghnut from "../components/Doghnut";
import MyPieChart from "../components/Pie";

function Index() {
  const loader = useLoaderData();

  return (
    <Grid container spacing={3} mt="1rem">
      <MyPieChart loader={loader} />
      <MyBarChart loader={loader} />
      <Doghnut loader={loader} />
    </Grid>
  );
}

export const loader = async ({ params }) => {
  const username = params.username;
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=200`
  );
  const profileInfo = await response.json();
  return profileInfo;
};

export default Index;
