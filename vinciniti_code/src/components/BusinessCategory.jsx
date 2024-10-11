
import { Typography, Box, Button } from '@mui/material';
import BusinessCard from './BusinessCard';

const BusinessCategory = ({ category, businesses }) => {
  return (
    <Box sx={{ padding: 2 }}>
      {/* Category Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ marginY: 2 }}>
          {category}
        </Typography>
        <Button size="small" variant="text" sx={{ textTransform: 'none' }}>
          view all ➜
        </Button>
      </Box>

      {/* Business Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {businesses.map((business, index) => (
          <BusinessCard
            key={index}
            name={business.name}
            rating={business.rating}
            logo={business.logo}
          />
        ))}
      </Box>
    </Box>
  );
};

export default BusinessCategory;
