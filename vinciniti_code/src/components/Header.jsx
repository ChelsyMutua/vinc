import {
  AppBar,
  Toolbar,
  Button,
  TextField,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    console.log("Drawer is toggling to:", open);
    
    setIsDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#FFF", boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <img
            src="/assets/Vinciniti_2.png"
            alt="Company logo"
            style={{
              height: "auto",
              width: "110px",
              maxWidth: "100%",
              marginRight: "10px",
            }}
          />
          {/* searchbar */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              placeholder="Search all the Categories"
              variant="outlined"
              size="medium"
              sx={{
                bgcolor: "#F7F6F4",
                borderRadius: "15px",
                width: { xs: "100%", sm: "100%", md: "100%", lg: "41.25rem" },
              }}
            />
          </Box>
          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* Buttons for larger screens */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" }, // Hide on mobile (xs), show on medium and up (md)
                gap: 1,
              }}
            >
              <Button
                variant="outlined"
                sx={{ bgcolor: "white", color: "black", borderColor: "black" }}
              >
                Log in
              </Button>
              <Button variant="contained" sx={{ backgroundColor: "#ff7e73" }}>
                Sign Up
              </Button>
              <Button
                variant="outlined"
                sx={{ borderColor: "black", color: "black" }}
              >
                Add a business
              </Button>
            </Box>

            {/* Hamburger Icon Button for smaller screens */}
            <IconButton
              edge="end"
              color="black"
              aria-label="menu"
              sx={{ display: { xs: "flex", md: "none" } }} // Show on mobile (xs), hide on medium and up (md)
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            {/* Drawer (Hamburger Menu) */}
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={toggleDrawer(false)}
            >
              <List sx={{ width: 250 }}>
                <ListItem button onClick={toggleDrawer(false)}>
                  <ListItemText primary="Log in" />
                </ListItem>
                <ListItem button onClick={toggleDrawer(false)}>
                  <ListItemText primary="Sign Up" />
                </ListItem>
                <ListItem button onClick={toggleDrawer(false)}>
                  <ListItemText primary="Add a business" />
                </ListItem>
              </List>
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
export default Header;
