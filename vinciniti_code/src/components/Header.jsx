

import {
  AppBar,
  Toolbar,
  Button,
  TextField,
  Box,
} from "@mui/material";

function Header() {
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#2d2d2d" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <img
            src="src/assets/Vinciniti_2.png"
            alt="Company logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          {/* searchbar */}
          <Box>
            <TextField
              placeholder="Search all the Categories"
              variant="outlined"
              size="small"
              sx={{ bgcolor: "white", borderRadius: "5px" }}
            />
          </Box>
          {/* Buttons */}
          <Box>
            <Button color="inherit">Log in</Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#ff7e73", marginLeft: 1 }}
            >
              Sign Up
            </Button>
            <Button
              variant="outlined"
              sx={{ marginLeft: 1, borderColor: "white", color: "white" }}
            >
              Add a business
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
export default Header;
