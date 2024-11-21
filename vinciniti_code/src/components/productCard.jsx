import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

const ProductCard = ({ products }) => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {products.map((product, index) => (
        <Box
          key={index}
          sx={{
            width: 200,
            overflow: "hidden",
            position: "relative",
            borderRadius: "16px",
            border: "1px solid transparent", // Default transparent border
            transition: "border-color 0.3s ease", // Smooth transition
            "&:hover": {
              border: "1px solid #d3d3d3", // Grey border on hover
            },
          }}
        >
          <img
            src={product.image}
            alt={product.productName}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "16px 16px 0 0", // Rounded corners for the top
            }}
          />
          <Box sx={{ padding: 2 }}>
            <Typography variant="subtitle1">{product.productName}</Typography>
            <Typography
              variant="body2"
              sx={{ mt: 1, fontWeight: "bold", fontSize: "1rem" }}
            >
              {product.price}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

// PropTypes validation
ProductCard.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      productName: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductCard;
