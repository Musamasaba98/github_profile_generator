import { CalendarMonth, Place } from "@mui/icons-material";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";

const ProfileInfo = () => {
  const profile = useLoaderData();
  const created_at = new Date(profile.created_at);
  const date = `${created_at.getDate()} ${
    created_at.getMonth() + 1
  },${created_at.getFullYear()}`;
  console.log(profile);
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding="1rem .5rem"
        sx={{ backgroundColor: "#1a1e22" }}
      >
        <Avatar
          alt="Remy Sharp"
          src={profile.avatar_url}
          sx={{
            width: 100,
            height: 100,
            border: "10px solid rgb(0, 112, 243)",
          }}
        />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h3" color="white">
            {profile.name}
          </Typography>
          <Typography
            variant="p"
            color="#1a1ea2"
          >{`@${profile.login}`}</Typography>
        </Box>
        <Box
          padding="1rem .1rem"
          display="flex"
          justifyContent="space-around"
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
  return profileInfo;
};

export default ProfileInfo;
