import { useParams } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
import { useEffect } from "react";
import { businessData } from "./businessData";

const BusinessProfile = () => {
  const { businessId } = useParams();

  useEffect(() => {
    console.log('BusinessProfile mounted with ID:', businessId);
    console.log('Available business data:', businessData);
  }, [businessId]);

  // Find the business across all categories
  let businessInfo = null;
  for (const category of businessData) {
    console.log('Searching in category:', category.category);
    const business = category.businesses.find(b => {
      console.log('Comparing:', b.id, businessId, b.id === businessId);
      return b.id === businessId;
    });
    if (business) {
      console.log('Found business:', business);
      businessInfo = {
        business,
        category: category.category
      };
      break;  // Stop the loop once the business is found
    }
  }

  // Handle case when no business is found
  if (!businessInfo) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h5">Business not found</Typography>
        <Typography variant="body1">
          Sorry, we couldn't find a business with ID: {businessId}
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>Debug info:</Typography>
        <pre>
          {JSON.stringify({
            receivedId: businessId,
            availableCategories: businessData.map(cat => ({
              category: cat.category,
              businessIds: cat.businesses.map(b => b.id)
            }))
          }, null, 2)}
        </pre>
      </Box>
    );
  }

  // Destructure business and category from businessInfo
  const { business, category } = businessInfo;

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ position: "relative", height: "600px", overflow: "hidden" }}>
        <img
          src={business.heroImage}
          alt={business.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      {/* Business Details */}
      <Box sx={{ padding: 4 }}>
        <Typography variant="h3" gutterBottom>
          {business.name}
        </Typography>
        <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
          Write a review
        </Button>
        <Button variant="outlined" color="secondary">
          Save
        </Button>

        {/* Menu section */}
        <Typography variant="h4" sx={{ marginTop: 4 }}>
          Menu
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {business.menu.map((menuItem, index) => (
            <Box key={index} sx={{ width: 200 }}>
              <img
                src={menuItem.image}
                alt={menuItem.item}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <Typography variant="subtitle1">{menuItem.item}</Typography>
              <Typography variant="body2" color="textSecondary">
                {menuItem.price}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BusinessProfile;
