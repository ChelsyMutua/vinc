import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Box } from "@mui/material";
import PropTypes from 'prop-types';
import { Star } from "@mui/icons-material";

const BusinessCard = ({ name, rating, logo, businessId, openingTime, closingTime, address, reviews }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log(`this is the ${businessId}`);
    navigate(`/business/${businessId}`);
  };

  // Validate and fallback for `rating`
  const validRating = typeof rating === 'number' && !isNaN(rating) ? rating.toFixed(1) : "N/A";

  return (
    <Card
      sx={{
        backgroundColor: '#f9f9f9',
        width: 400,
        height: 360,
        margin: 2,
        cursor: 'pointer',
        borderRadius: '14px'
      }}
      onClick={handleCardClick}
    >
      {/* Business Logo */}
      <Box
        sx={{
          height: 250,
          bgcolor: "#2d2d2d",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative"
        }}
      >
        <img
          src={logo}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            left: 8,
            width: 'auto',
            bgcolor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            display: "flex",
            alignItems: "center",
            padding: "0.5rem",
            borderRadius: "16px"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Star sx={{ color: "#FFD700", fontSize: "1rem" }} />
            <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
              {validRating} ({reviews} reviews)
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Card Information */}
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Opening: {openingTime} | Closing: {closingTime}
        </Typography>
        <Typography variant="body2" sx={{ color: "primary.main", marginTop: 1 }}>
          {address}
        </Typography>
      </CardContent>
    </Card>
  );
};

// Prop types
BusinessCard.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // Allow fallback
  logo: PropTypes.string.isRequired,
  businessId: PropTypes.string.isRequired,
  openingTime: PropTypes.string.isRequired,
  closingTime: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  reviews: PropTypes.number.isRequired,
};

// Default props
BusinessCard.defaultProps = {
  rating: 0, // Default to 0 if not provided
  reviews: 0, // Default to 0 if not provided
};

export default BusinessCard;
