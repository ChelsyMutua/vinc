// import React from 'react';
import { Box, Typography } from '@mui/material';
import BusinessCard from './BusinessCard';
import { businessData } from './businessData';

function BusinessListScreen() {
  if (!businessData || businessData.length === 0) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          No Businesses Available
        </Typography>
      </Box>
    );
  }




  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        All Businesses
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
          gap: 0.3,
        }}
      >
        {businessData.flatMap((category) =>
          category.businesses.map((business) => (
            <BusinessCard
              key={business.id}
              businessId={business.id}
              name={business.name}
              rating={business.rating || 0}
              logo={business.logo || ''}
              openingTime={business.openingTime || ''}
              closingTime={business.closingTime || ''}
              address={business.address || 'Address not available'}
              reviews={business.reviews || 0}
            />
          ))
        )}
      </Box>
    </Box>
  );
}

export default BusinessListScreen;
