import { ForkLeft, GitHub, Star } from "@mui/icons-material";
import React, { useState } from "react";
import {
  ListItem,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFetcher, useLoaderData } from "react-router-dom";

const TopRepos = () => {
  const [value, setValue] = useState("stars");
  const fetcher = useFetcher();
  const loader = useLoaderData();
  console.log(loader);

  const handleChange = (e) => {
    setValue(e.target.value);
    fetcher.submit(e.target.form);
  };
  return (
    <Box margin="1rem">
      <Box display="flex" gap="1rem" alignItems="center" marginBottom="1rem">
        <Typography
          variant="p"
          fontSize="2rem"
          borderBottom="2px dotted #1a1ea2"
        >
          Top Repos
        </Typography>
        <Typography variant="p" fontSize="1rem">
          by
        </Typography>
        <fetcher.Form fullWidth action="post">
          <Select
            id="demo-simple-select"
            name="select"
            value={value}
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="stars">stars</MenuItem>
            <MenuItem value="folks">folks</MenuItem>
            <MenuItem value="size">size</MenuItem>
          </Select>
        </fetcher.Form>
      </Box>
      <Paper>
        <ListItem leftAvatar={<GitHub />} primaryText={"Repository Name"} />
        <Grid container>
          <Grid item xs={12}>
            <ListItem primaryText={"Repository Description"} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <ListItem primaryText={"Repository Language"} />
          </Grid>
          <Grid item xs={2}>
            <ListItem rightIcon={<Star />} primaryText={"0"} />
          </Grid>
          <Grid item xs={2}>
            <ListItem rightIcon={<ForkLeft />} primaryText={"0"} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
export const loader = async ({ params }) => {
  const username = params.username;
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=8&sort=size&order=desc`
  );
  const profileInfo = await response.json();
  return profileInfo;
};

export default TopRepos;
