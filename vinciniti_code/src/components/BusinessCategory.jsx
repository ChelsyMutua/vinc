import { Typography, Box, Button, Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import BusinessCard from "./BusinessCard";
import { useState } from "react";
import { styled } from "@mui/material/styles";

// Styled component for the scrollable container
const ScrollableBox = styled(Box)({
  display: "flex",
  overflowX: "auto",
  scrollBehavior: "smooth",
  "&::-webkit-scrollbar": {
    display: "none", // Hide scrollbar for Chrome, Safari, and newer Edge
  },
  "-ms-overflow-style": "none", // Hide scrollbar for IE and older Edge
  "scrollbar-width": "none", // Hide scrollbar for Firefox
});

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

      {viewAll ? (
        // Grid view when "View all" is clicked
        <Grid Container spacing={1}>
          {businesses.map((business) => (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={2} key={business.id}>
              <BusinessCard
                key={business.id}
                name={business.name}
                rating={business.rating}
                logo={business.logo}
                businessId={business.id}
                openingTime={business.openingTime}
                closingTime={business.closingTime}
                businessData={business}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        // Scrollable row view
        <ScrollableBox
          sx={{
            gap: 17,
            pb: 1, // Add padding bottom for scrollbar
            "& > div": {
              flex: "0 0 auto",
              width: {
                xs: "280px", // Width on extra-small screens
                sm: "300px", // Width on small screens and up
              },
            },
          }}
        >
          {/* when viw all is false */}
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
              />
            </Box>
          ))}
        </ScrollableBox>
      )}
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
    })
  ).isRequired,
};

export default BusinessCategory;
