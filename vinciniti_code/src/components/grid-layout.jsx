import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";

const GridLayout = ({ leftContent, rightContent, marginTop }) => {
  return (
    <Box
      sx={{
        paddingTop: marginTop || "64px", // Defaults to 64px for AppBar height
        height: "100vh",
        overflowY: "auto", // Enable vertical scrolling if needed
        display: "flex",
        justifyContent: "center", // Horizontal alignment
      }}
    >
      <Grid container spacing={2}>
        {/* Left Section */}
        <Grid item xs={12} md={4}>
          {leftContent}
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={6}>
          {rightContent}
        </Grid>
      </Grid>
    </Box>
  );
};

GridLayout.propTypes = {
  leftContent: PropTypes.node.isRequired,
  rightContent: PropTypes.node.isRequired,
  marginTop: PropTypes.string,
};

export default GridLayout;
