import { useParams } from "react-router-dom";
import { Typography, Box, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { RateReview } from "@mui/icons-material";
import { useEffect } from "react";
import { businessData } from "./businessData";
import ProductCard from "./productCard"; // Import the ProductCard component
import { useNavigate } from "react-router-dom";

const BusinessProfile = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("BusinessProfile mounted with ID:", businessId);
    console.log("Available business data:", businessData);
  }, [businessId]);

  // Find the business across all categories
  let businessInfo = null;
  for (const category of businessData) {
    const business = category.businesses.find((b) => b.id === businessId);
    if (business) {
      businessInfo = {
        business,
        category: category.category,
      };
      break; // Stop the loop once the business is found
    }
  }

  // Handle case when no business is found
  if (!businessInfo) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h5">Business not found</Typography>
        <Typography variant="body1">
          Sorry, we couldnt find a business with ID: {businessId}
        </Typography>
      </Box>
    );
  }

  // Destructure business and category from businessInfo
  const { business } = businessInfo;

  return (
    <Box sx={{ position: "relative", overflow: "visible" }}>
      {/* Hero Section */}
      <Box sx={{ position: "relative", height: "600px", marginTop: "70px" }}>
        <img
          src={business.heroImage}
          alt={business.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50px",
          }}
        />

        {/* Top-right Icons */}
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "lightgrey",
            top: "-65px", // Adjust to align with the hero section
            right: "15px", // Position on the right
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
            borderRadius: "24px",
          }}
        >
          <IconButton onClick={() => navigate("/review")}>
            <RateReview />
          </IconButton>
          <IconButton onClick={() => navigate("/user-profile")}>
      <AccountCircleIcon />
    </IconButton>
        </Box>

        {/* Logo Section */}
        <Box
      sx={{
        position: 'absolute',
        top: '-50px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#fff',
        borderRadius: '50%',
        // width: '100px',
        // height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Ensures the image is clipped to the box's shape
        // Responsive sizing example
        width: { xs: '80px', sm: '100px', md: '120px' },
        height: { xs: '80px', sm: '100px', md: '120px' },
      }}
    >
      <img
        src={business.logo || '/assets/Vinciniti_2.png'}
        alt={`${business.name} official logo`}
        style={{
          width: '80%', // Reduced size to create space around the image
          height: '80%',
          objectFit: 'contain', // Ensures the entire logo is visible without distortion
          borderRadius: '50%', // Keeps the image circular
        }}
      />
    </Box>
      </Box>

      {/* Business Details */}
      <Box sx={{ padding: 4 }}>
        {/* <Typography variant="h3" gutterBottom>
          {business.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Category: {category}
        </Typography> */}

        {/* Products Section */}
        <Typography variant="h6" sx={{ marginTop: 4 }}>
          Available at Tatu Moto
        </Typography>
        {/* Use ProductCard to render the products */}
        <ProductCard products={business.products} />
      </Box>
    </Box>
  );
};

export default BusinessProfile;
