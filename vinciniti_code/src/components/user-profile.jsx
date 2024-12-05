import { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  Grid,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';

// Initial mock user data
const initialUserData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+254 712 345 678',
  location: 'Downtown Road',
  country: 'Kenya',
  city: 'Nairobi',
  apartment: 'Sunset Apartments',
  houseNo: 'A4',
};

export default function UserProfile() {
  // State for user data
  const [userData, setUserData] = useState(initialUserData);

  // State to control modal visibility
  const [open, setOpen] = useState(false);

  // State to manage edited data
  const [editedData, setEditedData] = useState(userData);

  // Function to get initials for avatar
  const getInitials = (firstName, lastName) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  // Handler to open modal
  const handleOpen = () => {
    setEditedData(userData); // Reset edited data to current user data
    setOpen(true);
  };

  // Handler to close modal
  const handleClose = () => {
    setOpen(false);
  };

  // Handler to save changes
  const handleSave = () => {
    setUserData(editedData);
    setOpen(false);
  };

  // Handler for input changes in the modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          My Profile
        </Typography>
      </Box>

      {/* Profile Card */}
      <Card elevation={0} sx={{ mb: 4, border: '1px solid lightgrey', borderRadius: '2rem' }}>
        <CardContent>
          <Grid container alignItems="center" spacing={2}>
            {/* Avatar and User Info */}
            <Grid item>
              <Avatar sx={{ bgcolor: deepPurple[500], width: 80, height: 80, fontSize: '2rem' }}>
                {getInitials(userData.firstName, userData.lastName)}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h5">
                {userData.firstName} {userData.lastName}
              </Typography>
              <Typography color="textSecondary">{userData.location}</Typography>
            </Grid>
            {/* Edit Button */}
            <Grid item>
              <Button variant="outlined" color="primary" onClick={handleOpen}>
                Edit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Personal Information Card */}
      <Card
        elevation={0}
        sx={{ mb: 3, border: '1px solid lightgrey', borderRadius: '2rem', padding: '1rem' }}
      >
        <CardHeader
          title="Personal Information"
          // Removed the 'action' prop to eliminate the Edit button
          // action={
          //   <Button variant="outlined" color="primary" onClick={handleOpen}>
          //     Edit
          //   </Button>
          // }
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={userData.firstName}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={userData.lastName}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email Address"
                type="email"
                name="email"
                value={userData.email}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                type="tel"
                name="phone"
                value={userData.phone}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </Grid>
            {/* Edit Button removed from here */}
          </Grid>
        </CardContent>
      </Card>


      {/* Log Out Button */}
      <Box display="flex" justifyContent="flex-end">
        <Button variant="outlined" color="error">
          Log Out
        </Button>
      </Box>

      {/* Edit Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Personal Information</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={editedData.firstName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={editedData.lastName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email Address"
                  type="email"
                  name="email"
                  value={editedData.email}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  type="tel"
                  name="phone"
                  value={editedData.phone}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ borderRadius: '2rem',
              padding: '0.8rem'
             }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            backgroundColor="#ef6b61"
            sx={{ borderRadius: '2rem',
              padding: '1rem'
             }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
