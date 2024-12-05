import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Autocomplete,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import CustomerAuthModal from './customer-authmodal';
import { useNavigate } from 'react-router-dom';
import { businessData } from './businessData';
import PropTypes from "prop-types";

function Header({ hideElements }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('signIn');

  const navigate = useNavigate();
  // const location = useLocation();

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    const filteredBusinesses = businessData
      .flatMap(category => category.businesses)
      .filter(business =>
        business.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    navigate('/businesses', { state: { businesses: filteredBusinesses, searchQuery } });
  };

  const categories = businessData.map(category => category.category);

  const showModal = (type) => {
    setModalType(type);
    setIsModalVisible(true);
    setIsDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed" // Fixed position to overlay content
        sx={{
          bgcolor: "#FFF",
          boxShadow: "none",
          zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure AppBar is above Drawer
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo */}
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

          {/* Navigation or Search/Auth */}
          {hideElements ? (
            // Navigation Links
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                onClick={() => navigate('/business-dashboard')}
                sx={{
                  color: "black", // Set text color to black
                  textTransform: "none", // Disable uppercase
                  fontWeight: "medium",
                  fontSize: "0.875rem", // Small text size
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                Business Info
              </Button>
              <Button
                onClick={() => navigate('/review_reply')}
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontWeight: "medium",
                  fontSize: "0.875rem",
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                Reviews
              </Button>
              <Button
                onClick={() => navigate('/photos')}
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontWeight: "medium",
                  fontSize: "0.875rem",
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                Photos
              </Button>
              <Button
                onClick={() => navigate('/analytics')}
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontWeight: "medium",
                  fontSize: "0.875rem",
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                Analytics
              </Button>
              <Button
                onClick={() => navigate('/settings')}
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontWeight: "medium",
                  fontSize: "0.875rem",
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                Settings
              </Button>
              {/* Add more links as needed */}
            </Box>
          ) : (
            // Search Bar and Auth Buttons
            <>
              {/* Search Bar */}
              <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, mx: 2 }}>
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
                          <IconButton onClick={handleSearchClick}>
                            <SearchIcon />
                          </IconButton>
                        ),
                      }}
                      sx={{
                        bgcolor: "#F7F6F4",
                        borderRadius: "8px",
                        width: { xs: "100%", md: "50rem" },
                      }}
                    />
                  )}
                />
              </Box>

              {/* Auth Buttons */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    borderColor: "black",
                    textTransform: "none",
                    fontWeight: 'medium',
                    fontSize: '0.875rem', // Small text
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                  onClick={() => showModal('signIn')}
                >
                  Log In
                </Button>
                
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FE6F61", // Updated background color
                    color: "black", // Text color
                    textTransform: "none", // No uppercase
                    fontSize: "0.875rem", // Small text
                    padding: '8px 16px', // Adjusted padding
                    fontWeight: 'medium',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: "#E65C54", // Darker shade on hover
                    },
                  }}
                  onClick={() => showModal('signUp')}
                >
                  Sign Up
                </Button>
                
                <Button 
                  variant="outlined" 
                  sx={{ 
                    borderColor: "black", 
                    color: "black",
                    textTransform: "none",
                    fontFamily: 'sans-serif',
                    fontSize: '0.875rem', // Small text
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                  onClick={() => navigate('/signup-business')}
                >
                  Sign Up a business
                </Button>
              </Box>

              {/* Hamburger Menu for Mobile */}
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                sx={{ display: { xs: "flex", md: "none" } }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Menu */}
      {!hideElements && (
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              backgroundColor: '#FE6F61', // Desired Drawer background color
              color: '#000', // Text color inside Drawer
            },
          }}
        >
          <List sx={{ width: 250 }}>
            <ListItem button onClick={() => { showModal('signIn'); toggleDrawer(false)(); }}>
              <ListItemText 
                primary="Log in" 
                sx={{ 
                  color: '#000', // Ensure text is black
                  fontSize: '0.875rem', 
                  textTransform: 'none', 
                }} 
              />
            </ListItem>
            <ListItem button onClick={() => { showModal('signUp'); toggleDrawer(false)(); }}>
              <ListItemText 
                primary="Sign Up" 
                sx={{ 
                  color: '#000', 
                  fontSize: '0.875rem', 
                  textTransform: 'none', 
                }} 
              />
            </ListItem>
            <ListItem button onClick={() => { navigate('/signup-business'); toggleDrawer(false)(); }}>
              <ListItemText 
                primary="Sign Up a business" 
                sx={{ 
                  color: '#000', 
                  fontSize: '0.875rem', 
                  textTransform: 'none', 
                }} 
              />
            </ListItem>
          </List>
        </Drawer>
      )}

      {/* Modal */}
      <CustomerAuthModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        modalType={modalType}
      />
    </>
  );
}

Header.propTypes = {
  hideElements: PropTypes.bool, // `hideElements` is expected to be a boolean
};


export default Header;

// import {
//   AppBar,
//   Toolbar,
//   Button,
//   Box,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
//   Autocomplete,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// import { useState } from "react";
// import CustomerAuthModal from "./customer-authmodal";
// import { useNavigate } from "react-router-dom";
// import { businessData } from "./businessData";
// import PropTypes from "prop-types";

// function Header({ hideElements, isSetupComplete }) {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [modalType, setModalType] = useState("signIn");

//   const navigate = useNavigate();

//   const toggleDrawer = (open) => () => {
//     setIsDrawerOpen(open);
//   };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSearchClick = () => {
//     const filteredBusinesses = businessData
//       .flatMap((category) => category.businesses)
//       .filter((business) =>
//         business.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//     navigate("/businesses", {
//       state: { businesses: filteredBusinesses, searchQuery },
//     });
//   };

//   const categories = businessData.map((category) => category.category);

//   const showModal = (type) => {
//     setModalType(type);
//     setIsModalVisible(true);
//     setIsDrawerOpen(false);
//   };

//   return (
//     <>
//       <AppBar
//         position="fixed"
//         sx={{
//           bgcolor: "#FFF",
//           boxShadow: "none",
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//         }}
//       >
//         <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
//           {/* Logo */}
//           <img
//             src="/assets/Vinciniti_2.png"
//             alt="Company logo"
//             style={{
//               height: "auto",
//               width: "110px",
//               maxWidth: "100%",
//               marginRight: "10px",
//             }}
//           />

//           {/* Navigation Links */}
//           {hideElements ? (
//             <Box sx={{ display: "flex", gap: 2 }}>
//               <Button
//                 onClick={() => navigate("/business-dashboard")}
//                 sx={{
//                   color: "black",
//                   textTransform: "none",
//                   fontWeight: "medium",
//                   fontSize: "0.875rem",
//                   borderRadius: "4px",
//                   "&:hover": {
//                     backgroundColor: "#f0f0f0",
//                   },
//                 }}
//               >
//                 Business Info
//               </Button>
//               <Button
//                 onClick={() => navigate("/photos")}
//                 sx={{
//                   color: "black",
//                   textTransform: "none",
//                   fontWeight: "medium",
//                   fontSize: "0.875rem",
//                   borderRadius: "4px",
//                   "&:hover": {
//                     backgroundColor: "#f0f0f0",
//                   },
//                 }}
//               >
//                 Photos
//               </Button>
//               {isSetupComplete && (
//                 <>
//                   <Button
//                     onClick={() => navigate("/review_reply")}
//                     sx={{
//                       color: "black",
//                       textTransform: "none",
//                       fontWeight: "medium",
//                       fontSize: "0.875rem",
//                       borderRadius: "4px",
//                       "&:hover": {
//                         backgroundColor: "#f0f0f0",
//                       },
//                     }}
//                   >
//                     Reviews
//                   </Button>
//                   <Button
//                     onClick={() => navigate("/analytics")}
//                     sx={{
//                       color: "black",
//                       textTransform: "none",
//                       fontWeight: "medium",
//                       fontSize: "0.875rem",
//                       borderRadius: "4px",
//                       "&:hover": {
//                         backgroundColor: "#f0f0f0",
//                       },
//                     }}
//                   >
//                     Analytics
//                   </Button>
//                   <Button
//                     onClick={() => navigate("/settings")}
//                     sx={{
//                       color: "black",
//                       textTransform: "none",
//                       fontWeight: "medium",
//                       fontSize: "0.875rem",
//                       borderRadius: "4px",
//                       "&:hover": {
//                         backgroundColor: "#f0f0f0",
//                       },
//                     }}
//                   >
//                     Settings
//                   </Button>
//                 </>
//               )}
//             </Box>
//           ) : (
//             // Search Bar and Auth Buttons
//             <>
//               <Box
//                 sx={{ display: "flex", alignItems: "center", flexGrow: 1, mx: 2 }}
//               >
//                 <Autocomplete
//                   freeSolo
//                   options={categories}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       variant="outlined"
//                       placeholder="Search all the Categories"
//                       value={searchQuery}
//                       onChange={handleSearchChange}
//                       InputProps={{
//                         ...params.InputProps,
//                         endAdornment: (
//                           <IconButton onClick={handleSearchClick}>
//                             <SearchIcon />
//                           </IconButton>
//                         ),
//                       }}
//                       sx={{
//                         bgcolor: "#F7F6F4",
//                         borderRadius: "8px",
//                         width: { xs: "100%", md: "50rem" },
//                       }}
//                     />
//                   )}
//                 />
//               </Box>

//               <Box sx={{ display: "flex", gap: 2 }}>
//                 <Button
//                   variant="outlined"
//                   sx={{
//                     bgcolor: "white",
//                     color: "black",
//                     borderColor: "black",
//                     textTransform: "none",
//                     fontWeight: "medium",
//                     fontSize: "0.875rem",
//                     borderRadius: "8px",
//                     "&:hover": {
//                       backgroundColor: "#f0f0f0",
//                     },
//                   }}
//                   onClick={() => showModal("signIn")}
//                 >
//                   Log In
//                 </Button>

//                 <Button
//                   variant="contained"
//                   sx={{
//                     backgroundColor: "#FE6F61",
//                     color: "black",
//                     textTransform: "none",
//                     fontSize: "0.875rem",
//                     padding: "8px 16px",
//                     fontWeight: "medium",
//                     borderRadius: "8px",
//                     "&:hover": {
//                       backgroundColor: "#E65C54",
//                     },
//                   }}
//                   onClick={() => showModal("signUp")}
//                 >
//                   Sign Up
//                 </Button>

//                 <Button
//                   variant="outlined"
//                   sx={{
//                     borderColor: "black",
//                     color: "black",
//                     textTransform: "none",
//                     fontSize: "0.875rem",
//                     borderRadius: "8px",
//                     "&:hover": {
//                       backgroundColor: "#f0f0f0",
//                     },
//                   }}
//                   onClick={() => navigate("/signup-business")}
//                 >
//                   Sign Up a business
//                 </Button>
//               </Box>

//               <IconButton
//                 edge="end"
//                 color="inherit"
//                 aria-label="menu"
//                 sx={{ display: { xs: "flex", md: "none" } }}
//                 onClick={toggleDrawer(true)}
//               >
//                 <MenuIcon />
//               </IconButton>
//             </>
//           )}
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         anchor="right"
//         open={isDrawerOpen}
//         onClose={toggleDrawer(false)}
//         PaperProps={{
//           sx: {
//             backgroundColor: "#FE6F61",
//             color: "#000",
//           },
//         }}
//       >
//         <List sx={{ width: 250 }}>
//           <ListItem
//             button
//             onClick={() => {
//               showModal("signIn");
//               toggleDrawer(false)();
//             }}
//           >
//             <ListItemText
//               primary="Log in"
//               sx={{
//                 color: "#000",
//                 fontSize: "0.875rem",
//                 textTransform: "none",
//               }}
//             />
//           </ListItem>
//           <ListItem
//             button
//             onClick={() => {
//               showModal("signUp");
//               toggleDrawer(false)();
//             }}
//           >
//             <ListItemText
//               primary="Sign Up"
//               sx={{
//                 color: "#000",
//                 fontSize: "0.875rem",
//                 textTransform: "none",
//               }}
//             />
//           </ListItem>
//           <ListItem
//             button
//             onClick={() => {
//               navigate("/signup-business");
//               toggleDrawer(false)();
//             }}
//           >
//             <ListItemText
//               primary="Sign Up a business"
//               sx={{
//                 color: "#000",
//                 fontSize: "0.875rem",
//                 textTransform: "none",
//               }}
//             />
//           </ListItem>
//         </List>
//       </Drawer>

//       <CustomerAuthModal
//         isModalVisible={isModalVisible}
//         setIsModalVisible={setIsModalVisible}
//         modalType={modalType}
//       />
//     </>
//   );
// }

// Header.propTypes = {
//   hideElements: PropTypes.bool,
//   isSetupComplete: PropTypes.bool, // New prop to indicate if setup is complete
// };

// export default Header;
