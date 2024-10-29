import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, TextField } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import CustomerAuthModal from './customer-authmodal'; // Import the combined modal

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [modalType, setModalType] = useState('signIn'); // State to control which modal (signIn or signUp) is shown

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const showModal = (type) => {
    setModalType(type); // Set modal type (signIn or signUp)
    setIsModalVisible(true); // Open the modal
    setIsDrawerOpen(false); // Close the drawer if open
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
          {/* Search bar */}
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
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
              }}
            >
              <Button
                variant="outlined"
                sx={{ bgcolor: "white", color: "black", borderColor: "black" }}
                onClick={() => showModal('signIn')} // Open Sign In modal
              >
                Log in
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#ff7e73" }}
                onClick={() => showModal('signUp')} // Open Sign Up modal
              >
                Sign Up
              </Button>
              <Button variant="outlined" sx={{ borderColor: "black", color: "black" }}>
                Add a business
              </Button>
            </Box>

            {/* Hamburger Icon Button for smaller screens */}
            <IconButton
              edge="end"
              color="black"
              aria-label="menu"
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            {/* Drawer (Hamburger Menu) */}
            <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
              <List sx={{ width: 250 }}>
                <ListItem button onClick={() => showModal('signIn')}> {/* Close drawer and trigger modal */}
                  <ListItemText primary="Log in" />
                </ListItem>
                <ListItem button onClick={() => showModal('signUp')}>
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

      {/* Pass modal visibility state and modal type to CustomerAuthModal */}
      <CustomerAuthModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} modalType={modalType} />
    </>
  );
}

export default Header;
