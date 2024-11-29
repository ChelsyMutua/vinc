import React, { useState } from "react";
import { Box, Typography, Button, TextField, Divider, IconButton, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Photos = () => {
  const [logo, setLogo] = useState(null); // State for logo
  const [coverImage, setCoverImage] = useState(null); // State for cover image
  const [products, setProducts] = useState([]); // State for product details

  // Handle image upload
  const handleImageUpload = (event, type, productIndex = null) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a URL for the uploaded image
      if (type === "logo") {
        setLogo(imageUrl);
      } else if (type === "cover") {
        setCoverImage(imageUrl);
      } else if (type === "product") {
        const updatedProducts = [...products];
        updatedProducts[productIndex].image = imageUrl;
        setProducts(updatedProducts);
      }
    }
  };

  // Add a new product section
  const addProduct = () => {
    setProducts([...products, { name: "", price: "", image: null }]);
  };

  // Handle product details input
  const handleProductInput = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  // Handle form submission
  const handleSubmit = () => {
    // Mock data submission
    const formData = {
      logo,
      coverImage,
      products,
    };

    // Replace this with an API call to your backend
    console.log("Submitted Data:", formData);

    alert("Photos and products submitted successfully!");
  };

  const removeProduct = (index) => {
    setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
  };
  

  return (
    <Box
      sx={{
        padding: "2rem",
        paddingTop: "64px", // Adjust for AppBar height
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "2rem" }}>
        Photos
      </Typography>

      <Grid container spacing={2}>
        {/* Left Column - Logo */}
        <Grid item xs={12} md={4}>
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
              src="/assets/tatu-moto.png"
              alt="Business Logo"
              style={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: "8px",
              }}
            />
          </Box>
        </Grid>

        {/* Right Column - Other Sections */}
        <Grid item xs={12} md={8}>
          {/* Logo Section */}
          <Box sx={{ marginBottom: "2rem" }}>
            <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
              Logo
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed #d32323",
                borderRadius: "8px",
                padding: "1rem",
                height: "150px",
                width: "150px",
                cursor: "pointer",
                textAlign: "center",
                position: "relative",
              }}
              onClick={() => document.getElementById("logo-upload").click()}
            >
              {logo ? (
                <img
                  src={logo}
                  alt="Logo Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <>
                  <IconButton sx={{ color: "#d32323" }}>
                    <AddIcon />
                  </IconButton>
                  <Typography variant="body2">Upload Logo</Typography>
                </>
              )}
            </Box>
          </Box>

          <Divider sx={{ marginBottom: "2rem" }} />

          {/* Cover Image Section */}
          <Box sx={{ marginBottom: "2rem" }}>
            <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
              Cover Image
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed #d32323",
                borderRadius: "8px",
                padding: "1rem",
                height: "200px",
                width: "100%",
                maxWidth: "500px",
                cursor: "pointer",
                textAlign: "center",
                position: "relative",
              }}
              onClick={() => document.getElementById("cover-upload").click()}
            >
              {coverImage ? (
                <img
                  src={coverImage}
                  alt="Cover Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <>
                  <IconButton sx={{ color: "#d32323" }}>
                    <AddIcon />
                  </IconButton>
                  <Typography variant="body2">Upload Cover Image</Typography>
                </>
              )}
            </Box>
            <input
              type="file"
              id="cover-upload"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "cover")}
            />
          </Box>

          <Divider sx={{ marginBottom: "2rem" }} />

          {/* Product Upload Section */}
          <Box>
            <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
              Product Details
            </Typography>
            {products.map((product, index) => (
  <Box
    key={index}
    sx={{
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "1rem",
      border: "1px solid #ddd",
      padding: "1rem",
      borderRadius: "8px",
      position: "relative", // To position the "X" button
      "&:hover .remove-btn": { display: "block" }, // Show the "X" on hover
    }}
  >
    {/* Remove Product Button */}
    <IconButton
      className="remove-btn"
      onClick={() => removeProduct(index)}
      sx={{
        position: "absolute",
        top: "8px",
        right: "8px",
        color: "grey",
        display: "none", // Hidden by default, shown on hover
      }}
    >
      ✕
    </IconButton>

    {/* Image Upload */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px dashed #d32323",
        borderRadius: "8px",
        width: "100px",
        height: "100px",
        cursor: "pointer",
      }}
      onClick={() =>
        document.getElementById(`product-upload-${index}`).click()
      }
    >
      {product.image ? (
        <img
          src={product.image}
          alt={`Product ${index + 1}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      ) : (
        <IconButton sx={{ color: "#d32323" }}>
          <AddIcon />
        </IconButton>
      )}
    </Box>
    <input
      type="file"
      id={`product-upload-${index}`}
      style={{ display: "none" }}
      accept="image/*"
      onChange={(e) => handleImageUpload(e, "product", index)}
    />

    {/* Product Details */}
    <Box sx={{ flex: 1 }}>
      <TextField
        fullWidth
        label="Product Name"
        value={product.name}
        onChange={(e) =>
          handleProductInput(index, "name", e.target.value)
        }
        sx={{ marginBottom: "0.5rem" }}
      />
      <TextField
        fullWidth
        label="Product Price"
        value={product.price}
        onChange={(e) =>
          handleProductInput(index, "price", e.target.value)
        }
      />
    </Box>
  </Box>
))}

            <Button
              variant="outlined"
              sx={{
                color: "#d32323",
                borderColor: "#d32323",
                textTransform: "none",
                marginBottom: "2rem",
              }}
              onClick={addProduct}
            >
              Add Product
            </Button>
          </Box>

          {/* Submit Button */}
          <Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#d32323",
                color: "#fff",
                textTransform: "none",
                width: "100%",
                padding: "10px",
                fontSize: "16px",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Photos;
