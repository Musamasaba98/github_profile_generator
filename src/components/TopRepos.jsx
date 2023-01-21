import { Star } from "@mui/icons-material";
import React, { useState } from "react";
import { Typography, Select, MenuItem, Card, Grid } from "@mui/material";
import Grow from "@mui/material/Grow";
import { Box } from "@mui/system";
import { Form, useLoaderData } from "react-router-dom";

const TopRepos = () => {
  const loader = useLoaderData();
  const [value, setValue] = useState(`stargazers_count`);
  const numberOfRepos = 9;
  const sortRepo = loader
    .filter((repo) => !repo.fork)
    .sort((a, b) => b[value] - a[value])
    .slice(0, numberOfRepos);

  const handleChange = (e) => {
    setValue(e.target.value);
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
        <Form action="post">
          <Select
            id="demo-simple-select"
            name="select"
            value={value}
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="stargazers_count">stars</MenuItem>
            <MenuItem value="forks_count">forks</MenuItem>
            <MenuItem value="size">size</MenuItem>
          </Select>
        </Form>
      </Box>
      <Grid container spacing={3}>
        {sortRepo ? (
          sortRepo.map((repo) => {
            return (
              <Grid component="span" item key={repo.id} xs={12} sm={6} md={4}>
                <Grow
                  in={true}
                  style={{ transformOrigin: "0 0 0" }}
                  {...{ timeout: 2000 }}
                >
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <Card sx={{ padding: "1rem" }}>
                      <Box
                        display="flex"
                        justifyContent="left"
                        alignItems="center"
                      >
                        <svg
                          aria-hidden="true"
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                          data-view-component="true"
                        >
                          <path
                            fill="#9e9e9e"
                            d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
                          ></path>
                        </svg>
                        <Typography
                          variant="p"
                          component="span"
                          pl=".8rem"
                          fontWeight="bold"
                          fontSize="20px"
                          color="#101010bf"
                        >
                          {repo.name}
                        </Typography>
                      </Box>
                      <Box mt="14px" mb="32px" fontSize="14PX" minHeight="3rem">
                        {repo.description}
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb="-.5rem"
                      >
                        <Typography
                          variant="div"
                          component="div"
                          display="flex"
                          gap=".5rem"
                          alignItems="center"
                        >
                          <Typography component="p" fontSize=".8rem">
                            {repo.language ? repo.language : `"language?"`}
                          </Typography>
                          <Typography>
                            <Star sx={{ fontSize: "1rem" }} />
                            {repo.stargazers_count}
                          </Typography>
                          <Typography>
                            <svg
                              aria-hidden="true"
                              height="16"
                              role="img"
                              viewBox="0 0 10 16"
                              width="10"
                              style={{ fontSize: ".5rem" }}
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"
                              ></path>
                            </svg>
                            {repo.forks_count}
                          </Typography>
                        </Typography>
                        <Typography component="div">{repo.size}KB</Typography>
                      </Box>
                    </Card>
                  </a>
                </Grow>
              </Grid>
            );
          })
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Grid>
    </Box>
  );
};

export const loader = async ({ params }) => {
  const username = params.username;
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`
  );
  const profileInfo = await response.json();

  return profileInfo;
};

export default TopRepos;
