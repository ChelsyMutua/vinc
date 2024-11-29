import { useState } from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  IconButton, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Divider, 
  Grid 
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import MapLocation from "./map_location";

const BusinessDashboard = () => {
  const [isEditing, setIsEditing] = useState({
    basicInfo: false,
    hours: false,
    location: false, // Track whether the map is in "edit mode"
  });

  const [businessData, setBusinessData] = useState({
    name: "Cathy's Crawfish",
    address: "155 N Seward St, Juneau, AK 99801",
    phone: "(410) 555-1234",
    categories: "Seafood, Seafood Markets, Caterers",
    hours: {
      open: "7:00 am",
      close: "4:00 pm",
    },
    location: { lat: 37.7749, lng: -122.4194 }, // Default coordinates (San Francisco)
  });

  const handleEditToggle = (section) => {
    setIsEditing((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleLocationChange = (newLocation) => {
    setBusinessData((prev) => ({ ...prev, location: newLocation }));
  };

  const handleSaveLocation = () => {
    handleEditToggle("location");
    alert("Location saved!");
  };

  return (
    <Box
      sx={{
        paddingTop: "64px", // Adjust for the AppBar height
        height: "100vh",
        overflowY: "auto", // Enables scrolling if content overflows
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2}>
        {/* Left Section - Logo */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              src="/assets/tatu-moto.png"
              alt="Business Logo"
              style={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: "8px",
              }}
            />
          </Box>
        </Grid>

        {/* Right Section - Business Information */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Business Information
            </Typography>

            {/* Basic Information Section */}
            <Box sx={{ position: "relative", marginBottom: "2rem" }}>
              <Typography variant="h5" gutterBottom>
                Basic Information
              </Typography>
              {isEditing.basicInfo ? (
                <Box sx={{paddingTop: '4rem'}}>
                  <TextField
                    fullWidth
                    label="Business Name"
                    defaultValue={businessData.name}
                    sx={{ marginBottom: "1rem" }}
                    onChange={(e) =>
                      setBusinessData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    defaultValue={businessData.address}
                    sx={{ marginBottom: "1rem" }}
                    onChange={(e) =>
                      setBusinessData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    defaultValue={businessData.phone}
                    sx={{ marginBottom: "1rem" }}
                    onChange={(e) =>
                      setBusinessData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                  <TextField
                    fullWidth
                    label="Categories"
                    defaultValue={businessData.categories}
                    sx={{ marginBottom: "1rem" }}
                    onChange={(e) =>
                      setBusinessData((prev) => ({
                        ...prev,
                        categories: e.target.value,
                      }))
                    }
                  />
                  <Button
                    variant="contained"
                    onClick={() => handleEditToggle("basicInfo")}
                    sx={{
                      textTransform:'none',
                      backgroundColor: '#d32323'

                    }}
                  >
                    Save 
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Typography variant="body1">
                    <strong>Business Name:</strong> {businessData.name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Address:</strong> {businessData.address}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Phone Number:</strong> {businessData.phone}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Categories:</strong> {businessData.categories}
                  </Typography>
                  <IconButton
                    sx={{ position: "absolute", top: 0, right: 0 }}
                    onClick={() => handleEditToggle("basicInfo")}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
            <Divider sx={{ bgcolor: "white", marginBottom: "1rem" }} />

            {/* Hours Section */}
            <Box sx={{ position: "relative", marginBottom: "2rem" }}>
              <Typography variant="h5" gutterBottom>
                Hours
              </Typography>
              {isEditing.hours ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <FormControl sx={{ minWidth: "120px" }}>
                    <InputLabel>Open</InputLabel>
                    <Select
                      value={businessData.hours.open || ""}
                      onChange={(e) =>
                        setBusinessData((prev) => ({
                          ...prev,
                          hours: { ...prev.hours, open: e.target.value },
                        }))
                      }
                    >
                      <MenuItem value="Closed">Closed</MenuItem>
                      <MenuItem value="7:00 am">7:00 am</MenuItem>
                      <MenuItem value="8:00 am">8:00 am</MenuItem>
                      <MenuItem value="9:00 am">9:00 am</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ minWidth: "120px" }}>
                    <InputLabel>Close</InputLabel>
                    <Select
                      value={businessData.hours.close || ""}
                      onChange={(e) =>
                        setBusinessData((prev) => ({
                          ...prev,
                          hours: { ...prev.hours, close: e.target.value },
                        }))
                      }
                    >
                      <MenuItem value="Closed">Closed</MenuItem>
                      <MenuItem value="4:00 pm">4:00 pm</MenuItem>
                      <MenuItem value="5:00 pm">5:00 pm</MenuItem>
                      <MenuItem value="6:00 pm">6:00 pm</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform:'none',
                      backgroundColor: '#d32323'

                    }}
                    onClick={() => handleEditToggle("hours")}
                  >
                    Save
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Typography variant="body1">
                    <strong>Hours:</strong> {businessData.hours.open || "N/A"} -{" "}
                    {businessData.hours.close || "N/A"}
                  </Typography>
                  <IconButton
                    sx={{ position: "absolute", top: 0, right: 0 }}
                    onClick={() => handleEditToggle("hours")}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
            <Divider sx={{ bgcolor: "white", marginBottom: "1rem" }} />
            {/* Map Location Section */}
            <Box sx={{ position: "relative", marginBottom: "2rem" }}>
              <Box>
                {isEditing.location ? (
                  <Box>
                    <MapLocation
                      defaultLocation={businessData.location}
                      onLocationChange={handleLocationChange}
                    />
                    <Button
                      variant="contained"
                      sx={{ marginTop: "1rem",
                           textTransform:'none',
                        backgroundColor: '#d32323'
                       }}
                      onClick={handleSaveLocation}
                    >
                      Save
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <MapLocation defaultLocation={businessData.location} />
                    <IconButton
                      sx={{ position: "absolute", top: 0, right: 0 }}
                      onClick={() => handleEditToggle("location")}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessDashboard;
