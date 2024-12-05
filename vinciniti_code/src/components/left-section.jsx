import { Box } from "@mui/material";
import PropTypes from "prop-types";

const LeftSection = ({ imageSrc, altText }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <img
        src={imageSrc}
        alt={altText}
        style={{
          width: "100%",
          maxWidth: "300px",
          borderRadius: "8px",
        }}
      />
    </Box>
  );
};


LeftSection.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
};

export default LeftSection;
