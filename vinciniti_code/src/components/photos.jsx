import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import GridLayout from "./grid-layout";
import LeftSection from "./left-section";

const Photos = () => {
  const [logo, setLogo] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [products, setProducts] = useState([]);

  const handleImageUpload = (event, type, productIndex = null) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (type === "logo") setLogo(imageUrl);
      else if (type === "cover") setCoverImage(imageUrl);
      else if (type === "product") {
        const updatedProducts = [...products];
        updatedProducts[productIndex].image = imageUrl;
        setProducts(updatedProducts);
      }
    }
  };

  const removeImage = (type, index = null) => {
    if (type === "logo") setLogo(null);
    else if (type === "cover") setCoverImage(null);
    else if (type === "product") {
      setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
    }
  };

  const addProduct = () => {
    setProducts([...products, { name: "", price: "", image: null }]);
  };

  const handleProductInput = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleSubmit = () => {
    const formData = { logo, coverImage, products };
    console.log("Submitted Data:", formData);
    alert("Photos and products submitted successfully!");
  };

  return (
    <GridLayout
      marginTop="64px"
      leftContent={
        <LeftSection
          imageSrc="/assets/tatu-moto.png"
          altText="Business Logo"
        />
      }
      rightContent={
        <Box sx={{ marginTop: "16px", padding: "1rem" }}>
          <Typography variant="h4" sx={{ marginBottom: "2rem" }}>
            Photos
          </Typography>

          {/* Logo Section */}
          <Box sx={{ marginBottom: "2rem" }}>
            <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
              Logo
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed #d32323",
                borderRadius: "8px",
                padding: "1rem",
                height: "150px",
                width: "150px",
                cursor: "pointer",
                position: "relative",
              }}
              onClick={() => document.getElementById("logo-upload").click()}
            >
              {logo ? (
                <>
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
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents the file upload dialog from opening
                      removeImage("logo");
                    }}
                    sx={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      color: "grey",
                      backgroundColor: "#fff",
                      border: "1px solid #ddd",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton sx={{ color: "#d32323" }}>
                    <AddIcon />
                  </IconButton>
                  <Typography variant="body2">Upload Logo</Typography>
                </>
              )}
            </Box>
            <input
              type="file"
              id="logo-upload"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "logo")}
            />
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
                position: "relative",
              }}
              onClick={() => document.getElementById("cover-upload").click()}
            >
              {coverImage ? (
                <>
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
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents the file upload dialog from opening
                      removeImage("cover");
                    }}
                    sx={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      color: "grey",
                      backgroundColor: "#fff",
                      border: "1px solid #ddd",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </>
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
                  position: "relative",
                }}
              >
                <IconButton
                  onClick={() => removeImage("product", index)}
                  sx={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    color: "grey",
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>

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
              onClick={addProduct}
              sx={{
                color: "#d32323",
                borderColor: "#d32323",
                textTransform: "none",
                marginBottom: "2rem",
              }}
            >
              Add Product
            </Button>
          </Box>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#d32323",
              color: "#fff",
              textTransform: "none",
              width: "100%",
              padding: "10px",
              fontSize: "16px",
            }}
          >
            Upload
          </Button>
        </Box>
      }
    />
  );
};

export default Photos;
