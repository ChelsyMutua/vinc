
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Box } from "@mui/material";
import PropTypes from 'prop-types';
import { Business } from "@mui/icons-material";

//? destructuring for props
const BusinessCard = ({ name, rating, logo,businessId ,openingTime,closingTime}) => {

  const navigate = useNavigate(); // get the navigation function

  const handleCardClick = () =>{
    console.log(`this is the ${businessId}`); // check the id.
    
    navigate(`/business/${businessId}`); // navigate to the business profile.
  }

  return (
    <Card sx={{ width: 400, height:410, margin: 2,cursor: 'pointer' }} onClick = {handleCardClick}>
      
      {/* Business Logo */}
      <Box
        sx={{
          height: 250,
          bgcolor: "#2d2d2d",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={logo} alt={name} style={{ width: "100%" }} />
      </Box>

      {/* Card Information */}
      <CardContent>
        <Typography
          variant="subtitle1" // Use a valid variant
          sx={{ fontWeight: "bold" }}
          mt={9}
        >
          {name}
        </Typography>
        <Typography variant="p">Opening :{openingTime}</Typography>
        <Typography variant="p" sx={{marginLeft:1}}>Closing :{closingTime}</Typography>
        <Typography variant="body2" sx={{ color: "#ff7e73" }}>
          {/* Display Rating as Stars */}
          {"★".repeat(Math.floor(rating))}
          {"☆".repeat(5 - Math.floor(rating))}
        </Typography>
      </CardContent>
    </Card>
  );
};

// PropTypes Validation for BusinessCard
BusinessCard.propTypes = {
  name: PropTypes.string.isRequired, // name must be a string
  rating: PropTypes.number.isRequired, // rating must be a number
  logo: PropTypes.string.isRequired, // logo must be a string (URL or path)
  businessId:PropTypes.string.isRequired,
};

export default BusinessCard;
