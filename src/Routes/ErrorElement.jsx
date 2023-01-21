import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { Link, useRouteError } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ErrorElement() {
  const error = useRouteError();

  return (
    <Box>
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding="5rem .5rem"
        gap=".7rem"
        sx={{
          backgroundColor: "#1a1e22",
          height: "100vh",
          color: "whitesmoke",
        }}
      >
        <Typography component="h3">Oops!</Typography>
        <Typography component="p">
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography component="p">
          <Typography component="span">
            {error.message === "Failed to fetch"
              ? "Check Your Network Connection"
              : `User ${error.statusText || error.message}`}
          </Typography>
        </Typography>
        <Link to="/" underline="none">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            underline="none"
          >
            <ArrowBack sx={{ color: "white" }} />
            <Typography color="white" underline="none">
              Back
            </Typography>
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
}
