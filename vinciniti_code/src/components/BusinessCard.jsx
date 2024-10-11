
import { Card, CardContent, Typography, Box } from "@mui/material";

// Use destructuring for props
const BusinessCard = ({ name, rating, logo }) => {
  return (
    <Card sx={{ width: 200, margin: 2 }}>
      {/* Business Logo */}
      <Box
        sx={{
          height: 100,
          bgcolor: "#2d2d2d",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={logo} alt={name} style={{ width: "80%" }} />
      </Box>

      {/* Card Information */}
      <CardContent>
        <Typography
          variant="subtitle1" // Use a valid variant
          sx={{ fontWeight: "bold" }}
        >
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "#ff7e73" }}>
          {/* Display Rating as Stars */}
          {"★".repeat(Math.floor(rating))}
          {"☆".repeat(5 - Math.floor(rating))}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;
