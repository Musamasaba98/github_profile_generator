import { CalendarMonth, Place } from "@mui/icons-material";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProfileInfo = () => {
  const profile = useLoaderData();
  const created_at = new Date(profile.created_at);
  const date = `${created_at.getDate()} ${
    created_at.getMonth() + 1
  },${created_at.getFullYear()}`;
  return (
    <Box>
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding="5rem .5rem"
        sx={{ backgroundColor: "#1a1e22" }}
      >
        <Avatar
          alt="Remy Sharp"
          src={profile.avatar_url}
          sx={{
            width: 150,
            height: 150,
            border: "7px solid rgb(0, 112, 243)",
          }}
        />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h3" color="white" align="center">
            {profile.name}
          </Typography>
          {console.log(profile.html_url)}
          <a
            href={profile.html_url}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Typography
              variant="p"
              color="#1a1ea2"
              sx={{
                fontFamily: "Share Tech Mono",
                fontSize: "1.5rem",
                "&:hover": {
                  borderBottom: "2px solid rgb(0, 112, 243)",
                },
              }}
            >{`@${profile.login}`}</Typography>
          </a>
        </Box>
        <Box
          padding="1rem .1rem"
          display="flex"
          justifyContent="space-around"
          gap="1.5rem"
          alignItems="center"
        >
          <Typography variant="p" color="#bdbdbd">
            <Place />
            {profile.location}
          </Typography>
          <Typography variant="p" color="#bdbdbd">
            <CalendarMonth />
            {`Joined ${date}`}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" gap="1rem">
          <Card
            sx={{
              maxWidth: "100% ",
              backgroundColor: "#24292e",
              color: "white",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {profile.public_repos}
              </Typography>
              <Typography color="#bdbdbd" variant="body2">
                Repositories
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              maxWidth: "100% ",
              backgroundColor: "#24292e",
              color: "white",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {profile.followers}
              </Typography>
              <Typography variant="body2" color="#bdbdbd">
                Followers
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              maxWidth: "100% ",
              backgroundColor: "#24292e",
              color: "white",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {profile.following}
              </Typography>
              <Typography variant="body2" color="#bdbdbd">
                Following
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};
export const loader = async ({ params }) => {
  const username = params.username;
  const response = await fetch(`https://api.github.com/users/${username}`);
  const profileInfo = await response.json();
  if (!profileInfo) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return profileInfo;
};

export default ProfileInfo;
