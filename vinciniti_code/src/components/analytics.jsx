import { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import GridLayout from "./grid-layout";
import LeftSection from "./left-section";
import ReviewsIcon from '@mui/icons-material/Reviews';
import StarIcon from '@mui/icons-material/Star';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import MapIcon from '@mui/icons-material/Map';

// Function to generate simulated data
const generateSimulatedData = () => {
  const totalReviews = Math.floor(Math.random() * 2000) + 1000; // 1000 - 2999
  const averageRating = (Math.random() * 2 + 3).toFixed(1); // 3.0 - 5.0
  const positive = Math.floor(Math.random() * 100);
  const neutral = Math.floor(Math.random() * (100 - positive));
  const negative = 100 - positive - neutral;
  const mapClicks = Math.floor(Math.random() * 500) + 100; // 100 - 599

  return {
    totalReviews,
    averageRating,
    sentimentAnalysis: {
      positive,
      neutral,
      negative,
    },
    mapClicks,
  };
};

const Analytics = () => {
  // Initialize state with simulated data generated once
  const [analyticsData] = useState(generateSimulatedData());

  return (
    <GridLayout
      leftContent={
        <LeftSection
          imageSrc="/assets/tatu-moto.png"
          altText="Business Logo"
        />
      }
      rightContent={
        <Box sx={{ padding: "2rem", height: "100%" }}>
          <Typography
            variant="h4"
            sx={{
              marginBottom: "2rem",
              color: "white",
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            Analytics Dashboard
          </Typography>

          {/* Grid for Cards */}
          <Grid container spacing={4}>
            {/* Card 1: Total Number of Reviews */}
            <Grid item xs={12} sm={12} md={6}>
            <Card
            sx={{
              backgroundColor: "#1e1e1e",
              borderRadius: "12px",
              color: "white",
              height: "100%",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
                <CardContent>
                  <ReviewsIcon
                    sx={{ fontSize: 50, color: "#4caf50", mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Total Reviews
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: "bold", color: "#4caf50" }}
                  >
                    {analyticsData.totalReviews}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Card 2: Average Customer Rating */}
            <Grid item xs={12} sm={12} md={6}>
            <Card
              sx={{
                backgroundColor: "#1e1e1e",
                borderRadius: "12px",
                color: "white",
                height: "100%",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
                <CardContent>
                  <StarIcon
                    sx={{ fontSize: 50, color: "#ff9800", mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Average Rating
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: "bold", color: "#ff9800" }}
                  >
                    {analyticsData.averageRating} / 5
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Card 3: Sentiment Analysis */}
            <Grid item xs={12} sm={12} md={6}>
            <Card
              sx={{
                backgroundColor: "#1e1e1e",
                borderRadius: "12px",
                color: "white",
                height: "100%",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
                <CardContent>
                  <SentimentSatisfiedIcon
                    sx={{ fontSize: 50, color: "#2196f3", mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Sentiment Analysis
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="body1">Positive</Typography>
                      <Typography
                        variant="h5"
                        sx={{ color: "#4caf50" }}
                      >
                        {analyticsData.sentimentAnalysis.positive}%
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1">Neutral</Typography>
                      <Typography
                        variant="h5"
                        sx={{ color: "#ffeb3b" }}
                      >
                        {analyticsData.sentimentAnalysis.neutral}%
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1">Negative</Typography>
                      <Typography
                        variant="h5"
                        sx={{ color: "#f44336" }}
                      >
                        {analyticsData.sentimentAnalysis.negative}%
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Card 4: Map Clicks for Directions */}
            <Grid item xs={12} sm={12} md={6}>
            <Card
              sx={{
                backgroundColor: "#1e1e1e",
                borderRadius: "12px",
                color: "white",
                height: "100%",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
                <CardContent>
                  <MapIcon
                    sx={{ fontSize: 50, color: "#2196f3", mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Map Clicks for Directions
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: "bold", color: "#2196f3" }}
                  >
                    {analyticsData.mapClicks}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      }
    />
  );
};

export default Analytics;
