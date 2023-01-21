import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { ArrowBack } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";

function Navbar() {
  const { username } = useParams();
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="primary" sx={{ top: 0, bottom: "auto" }}>
        <Toolbar>
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <ArrowBack sx={{ color: "white" }} />
            </IconButton>
          </Link>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            GitHub Profile
          </Typography>
          {username && (
            <Link
              to={`/user/${username}/repos`}
              component="button"
              style={{
                textDecoration: "none",
              }}
            >
              <Typography variant="h6" underline="none" color="white">
                Repositories
              </Typography>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Navbar;
