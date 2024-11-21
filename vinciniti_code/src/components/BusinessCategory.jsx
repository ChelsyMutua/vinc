import { Typography, Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import BusinessCard from "./BusinessCard";
import { useState } from "react";

// Styled component for the scrollable container

const BusinessCategory = ({ category, businesses }) => {
  const [viewAll, setViewAll] = useState(false);

  const toggleViewAll = () => {
    setViewAll((prevViewAll) => !prevViewAll);
  };

  return (
    <Box sx={{ py: 2 }}>
      {/* Category Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" component="h2">
          {category}
        </Typography>
        <Button
          onClick={toggleViewAll}
          endIcon={viewAll ? "←" : "→"}
          sx={{
            textTransform: "none",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          {viewAll ? "Show less" : "View all"}
        </Button>
      </Box>

      {/* Dynamic Layout based on viewAll */}
      <Box
        sx={{
          display: "flex",
          flexWrap: viewAll ? "wrap" : "nowrap", // Wrap when "View All" is clicked
          gap: 12,
          overflowX: viewAll ? "visible" : "auto", // Only enable scrolling when viewAll is false
          // pb: 1,
          "& > div": {
            flex: "0 0 auto",
            width: {
              xs: "280px", // Width on extra-small screens
              sm: "300px", // Width on small screens and up
              md: "340px", // Width on medium screens and up
            },
          },
        }}
      >
        {businesses.map((business) => (
          <Box key={business.id}>
            <BusinessCard
              businessId={business.id}
              name={business.name}
              rating={business.rating}
              logo={business.logo}
              openingTime={business.openingTime}
              closingTime={business.closingTime}
              businessData={business}
              address={business.address}
              reviews={business.reviews}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

BusinessCategory.propTypes = {
  category: PropTypes.string.isRequired,
  businesses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      logo: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      reviews: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BusinessCategory;
