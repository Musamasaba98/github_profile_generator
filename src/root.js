import React from 'react';
import Box from '@mui/material/Box';
import GitHub from '@mui/icons-material/GitHub';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { Form, redirect } from 'react-router-dom';


function Root() {
  return (
    <Box margin={0} display="flex" justifyContent="center" alignItems="center"
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#0a1929"
      }}
    >
      <Box display="flex" flexDirection="column" gap="1rem" alignItems="center" >
        <GitHub sx={{ fontSize: "5rem", color: "rgb(0, 112, 243)" }} />
        <Typography variant='h3' sx={{ fontWeight: "bold", color: "white" }}>
          Find Your GitHub Profile
        </Typography>
        <Form method="post" style={{ width: "100%" }}>
          <TextField fullWidth label="username" name='username' id="username" InputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "rgb(0, 112, 243)" } }} />
        </Form>
      </Box>
    </Box>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData()
  const username = formData.get("username")
  return redirect(`/user/${username}`)
}
export default Root;
