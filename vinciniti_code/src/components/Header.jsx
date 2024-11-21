import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, TextField, Autocomplete } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import CustomerAuthModal from './customer-authmodal'; // Import the combined modal
import { useNavigate } from 'react-router-dom';
import { businessData } from './businessData';

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [modalType, setModalType] = useState('signIn'); // State to control which modal (signIn or signUp) is shown
  
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    // Navigate to BusinessListScreen with filtered businesses
    const filteredBusinesses = businessData
      .flatMap(category => category.businesses)
      .filter(business =>
        business.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    navigate('/businesses', { state: { businesses: filteredBusinesses, searchQuery } });
  };

  // Extract categories from businessData to be used as suggestions
  const categories = businessData.map(category => category.category);

  const showModal = (type) => {
    setModalType(type); // Set modal type (signIn or signUp)
    setIsModalVisible(true); // Open the modal
    setIsDrawerOpen(false); // Close the drawer if open
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#FFF", boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.1)" }}>
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
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, justifyContent: "center" }}>
            {/* Search Bar */}
            <Autocomplete
              freeSolo
              options={categories}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Search all the Categories"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <IconButton
                        color="black"
                        onClick={handleSearchClick}
                        edge="end"
                        sx={{ p: 1.25}}
                      >
                        <SearchIcon />
                      </IconButton>
                    ),
                    sx: {
                      bgcolor: "#F7F6F4",
                      borderRadius: "8px",
                      width: {
                        xs: "100%", // Full width on extra-small screens
                        sm: "100%", // Full width on small screens
                        md: "50rem", // Medium width on larger screens
                        lg: "41.25rem", // Fixed width on large screens
                      },
                      maxWidth: "100%", // Prevent the field from exceeding the container width
                    }          
                  }}
                />
              )}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            
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
                gap: 2.5,
              }}
            >
              <Button
                variant="outlined"
                sx={{ bgcolor: "white", color: "black", borderColor: "black" , 
                  textTransform: "none",  
                  fontWeight: 'semi-bold',
                  fontSize: '1rem'}}
                onClick={() => showModal('signIn')} // Open Sign In modal
              >
                Log In
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#ef6b61",
                  padding: '15px',
                  marginRight: '10rem',
                  textTransform: "none",
                  fontWeight: 'semi-bold',
                  fontSize: '1rem'
                }}
                onClick={() => showModal('signUp')} // Open Sign Up modal
              >
                Sign Up
              </Button>
              <Button variant="outlined" 
              sx={{ borderColor: "black", 
              color: "black",
              textTransform: "none",
              fontFamily: 'sans-serif'
             
              }}
              onClick={() => navigate('/signup-business')}>
                Sign Up a business
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
