import { Box } from "@mui/system";
import React from "react";
import { useLoaderData } from "react-router-dom";
import MyBarChart from "../components/Bar";
import Doghnut from "../components/Doghnut";
import Pie from "../components/Pie";

function Index() {
  const loader = useLoaderData();

  return (
    <Box>
      <Pie loader={loader} />
      <MyBarChart loader={loader} />
      <Doghnut loader={loader} />
    </Box>
  );
}

export const loader = async ({ params }) => {
  const username = params.username;
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`
  );
  const profileInfo = await response.json();

  return profileInfo;
};

export default Index;
