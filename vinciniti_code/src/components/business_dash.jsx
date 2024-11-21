import { useState } from "react";
import { Box, Typography, TextField, Button, IconButton, Select, MenuItem, FormControl, InputLabel, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const BusinessDashboard = () => {
  const [isEditing, setIsEditing] = useState({
    basicInfo: false,
    hours: false,
    specialties: false,
  });

  // Placeholder data (should come from sign-up or database)
  const [businessData, setBusinessData] = useState({
    name: "Cathy's Crawfish",
    address: "155 N Seward St, Juneau, AK 99801",
    phone: "(410) 555-1234",
    categories: "Seafood, Seafood Markets, Caterers",
    hours: {
      Monday: { open: "7:00 am", close: "4:00 pm" },
      Tuesday: { open: "7:00 am", close: "4:00 pm" },
      Wednesday: { open: "7:00 am", close: "4:00 pm" },
      Thursday: { open: "7:00 am", close: "4:00 pm" },
      Friday: { open: "7:00 am", close: "4:00 pm" },
      Saturday: { open: "Closed", close: "Closed" },
      Sunday: { open: "Closed", close: "Closed" },
    },
    specialties: "",
  });

  const handleEditToggle = (section) => {
    setIsEditing((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSave = (section, updatedData) => {
    setBusinessData((prev) => ({ ...prev, ...updatedData }));
    handleEditToggle(section);
  };

  return (
    <Box sx={{ display: 'flex', height: '60vh' }}>
      {/* Sidebar */}
      {/* <Box sx={{ width: '200px', bgcolor: '#f9f9f6', color: 'black', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
      
     
        <Typography variant="body1" sx={{ cursor: 'pointer', marginBottom: '1rem' }}>
          Business Info
        </Typography>
        <Typography variant="body1" sx={{ cursor: 'pointer', marginBottom: '1rem' }}>
          Reviews
        </Typography>
        <Typography variant="body1" sx={{ cursor: 'pointer', marginBottom: '1rem' }}>
          Photos
        </Typography>
      </Box> */}

      {/* Main Content */}
      <Box sx={{ flex: 1, padding: "2rem", margin: "auto", overflowY: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Business Information
        </Typography>

        {/* Basic Information Section */}
        <Box sx={{ position: "relative", marginBottom: "2rem" }}>
          <Typography variant="h5" gutterBottom>
            Basic Information
          </Typography>
          {isEditing.basicInfo ? (
            <Box>
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
                startIcon={<SaveIcon />}
                onClick={() => handleSave("basicInfo")}
              >
                Save Changes
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
        <Divider sx={{ bgcolor: 'white', marginBottom: '1rem' }} />

        {/* Hours Section */}
        <Box sx={{ position: "relative", marginBottom: "2rem" }}>
          <Typography variant="h5" gutterBottom>
            Hours
          </Typography>
          {isEditing.hours ? (
            <Box>
              {Object.entries(businessData.hours).map(([day, { open, close }]) => (
                <Box key={day} sx={{ marginBottom: "1rem", display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ width: '100px' }}>{day}</Typography>
                  <FormControl sx={{ marginRight: "1rem" }}>
                    <InputLabel>Open</InputLabel>
                    <Select
                      value={open}
                      onChange={(e) =>
                        setBusinessData((prev) => ({
                          ...prev,
                          hours: { ...prev.hours, [day]: { ...prev.hours[day], open: e.target.value } },
                        }))
                      }
                    >
                      <MenuItem value="Closed">Closed</MenuItem>
                      <MenuItem value="7:00 am">7:00 am</MenuItem>
                      <MenuItem value="8:00 am">8:00 am</MenuItem>
                      <MenuItem value="9:00 am">9:00 am</MenuItem>
                      {/* Add more time options as needed */}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <InputLabel>Close</InputLabel>
                    <Select
                      value={close}
                      onChange={(e) =>
                        setBusinessData((prev) => ({
                          ...prev,
                          hours: { ...prev.hours, [day]: { ...prev.hours[day], close: e.target.value } },
                        }))
                      }
                    >
                      <MenuItem value="Closed">Closed</MenuItem>
                      <MenuItem value="4:00 pm">4:00 pm</MenuItem>
                      <MenuItem value="5:00 pm">5:00 pm</MenuItem>
                      <MenuItem value="6:00 pm">6:00 pm</MenuItem>
                      {/* Add more time options as needed */}
                    </Select>
                  </FormControl>
                </Box>
              ))}
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={() => handleSave("hours")}
              >
                Save Changes
              </Button>
            </Box>
          ) : (
            <Box>
              {Object.entries(businessData.hours).map(([day, { open, close }]) => (
                <Typography key={day} variant="body1">
                  <strong>{day}:</strong> {open} - {close}
                </Typography>
              ))}
              <IconButton
                sx={{ position: "absolute", top: 0, right: 0 }}
                onClick={() => handleEditToggle("hours")}
              >
                <EditIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BusinessDashboard;
