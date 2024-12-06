// src/Photos.jsx
import { useState, useEffect } from "react";
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
import imageCompression from 'browser-image-compression';

const Photos = () => {
  const [logo, setLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  const [coverImage, setCoverImage] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);

  const [products, setProducts] = useState([]);

  // Cleanup Blob URLs only when the component unmounts
  useEffect(() => {
    return () => {
      if (logo) URL.revokeObjectURL(logo);
      if (coverImage) URL.revokeObjectURL(coverImage);
      products.forEach((prod) => {
        if (prod.image) URL.revokeObjectURL(prod.image);
      });
    };
  }, [logo, coverImage, products]);

  /**
   * Handles image uploads with optional compression.
   * @param {Event} event - The file input change event.
   * @param {string} type - The type of image ('logo', 'cover', 'product').
   * @param {number|null} productIndex - The index of the product (if type is 'product').
   */
  const handleImageUpload = async (event, type, productIndex = null) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        alert('Unsupported file type. Please upload a JPEG, PNG, or GIF image.');
        return;
      }

      // Optional: Compress the image
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      let compressedFile = file;

      try {
        compressedFile = await imageCompression(file, options);
        console.log('Original File Size:', (file.size / 1024 / 1024).toFixed(2), 'MB');
        console.log('Compressed File Size:', (compressedFile.size / 1024 / 1024).toFixed(2), 'MB');
      } catch (error) {
        console.error('Compression error:', error);
        alert('Image compression failed. Please try a different image.');
        return;
      }

      // Revoke previous Blob URL if exists to free memory
      if (type === "logo" && logo) {
        URL.revokeObjectURL(logo);
      }
      if (type === "cover" && coverImage) {
        URL.revokeObjectURL(coverImage);
      }
      if (type === "product" && products[productIndex]?.image) {
        URL.revokeObjectURL(products[productIndex].image);
      }

      // Create a new Blob URL for image preview
      const imageUrl = URL.createObjectURL(compressedFile);

      // Update state based on the image type
      if (type === "logo") {
        setLogo(imageUrl);
        setLogoFile(compressedFile);
      } else if (type === "cover") {
        setCoverImage(imageUrl);
        setCoverImageFile(compressedFile);
      } else if (type === "product") {
        const updatedProducts = [...products];
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          image: imageUrl,
          imageFile: compressedFile,
        };
        setProducts(updatedProducts);
      }
    }
  };

  /**
   * Removes an image and clears its state.
   * @param {string} type - The type of image ('logo', 'cover', 'product').
   * @param {number|null} index - The index of the product (if type is 'product').
   */
  const removeImage = (type, index = null) => {
    if (type === "logo") {
      if (logo) URL.revokeObjectURL(logo);
      setLogo(null);
      setLogoFile(null);
    }
    else if (type === "cover") {
      if (coverImage) URL.revokeObjectURL(coverImage);
      setCoverImage(null);
      setCoverImageFile(null);
    }
    else if (type === "product" && index !== null) {
      if (products[index].image) URL.revokeObjectURL(products[index].image);
      setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
    }
  };

  /**
   * Adds a new product to the products array.
   */
  const addProduct = () => {
    setProducts([...products, { name: "", price: "", image: null, imageFile: null }]);
  };

  /**
   * Handles input changes for product fields.
   * @param {number} index - The index of the product.
   * @param {string} field - The field to update ('name' or 'price').
   * @param {string} value - The new value for the field.
   */
  const handleProductInput = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  /**
   * Handles the form submission by uploading images to the API and storing URLs in PostgreSQL.
   */
  const handleSubmit = async () => {
    try {
      const apiBaseUrl = ['http://localhost:5173', 'https://vinc-production-3a9e.up.railway.app']; 
      const uploadPromises = [];
      const uploads = {};

      // Upload logo and cover image
      const businessFormData = new FormData();
      if (logoFile) businessFormData.append('logo', logoFile);
      if (coverImageFile) businessFormData.append('cover_image', coverImageFile);

      if (businessFormData.has('logo') || businessFormData.has('cover_image')) {
        const businessUpload = fetch(`${apiBaseUrl}/upload/business`, {
          method: 'POST',
          body: businessFormData,
        })
          .then(response => response.json())
          .then(data => {
            if (data.error) throw new Error(data.error);
            uploads.logo = data.data.logo_url;
            uploads.cover_image = data.data.cover_image;
          });
        uploadPromises.push(businessUpload);
      }

      // Upload product images
      const productPromises = products.map(async (product) => {
        if (product.imageFile) {
          const productFormData = new FormData();
          productFormData.append('product_image', product.imageFile);
          productFormData.append('name', product.name);
          productFormData.append('price', product.price);

          const productUpload = fetch(`${apiBaseUrl}/upload/product`, {
            method: 'POST',
            body: productFormData,
          })
            .then(response => response.json())
            .then(data => {
              if (data.error) throw new Error(data.error);
              return data.data.product_image_url;
            });
          return productUpload;
        }
        return null;
      });

      // Await business uploads
      await Promise.all(uploadPromises);

      // Await product uploads
      const productUrls = await Promise.all(productPromises);

      // Prepare formData (optional, based on API response)
      const formData = {
        logo: uploads.logo || null,
        cover_image: uploads.cover_image || null,
        products: products.map((product, index) => ({
          name: product.name,
          price: product.price,
          image: productUrls[index] || null,
        })),
      };

      console.log('Submitted Data:', formData);
      alert('Photos and products uploaded successfully!');
      resetForm();
    } catch (error) {
      console.error('Detailed error:', error);
      alert(`An error occurred during the upload: ${error.message}`);
    }
  };

  /**
   * Resets the form to its initial state.
   */
  const resetForm = () => {
    // Revoke all Blob URLs to free memory
    if (logo) URL.revokeObjectURL(logo);
    if (coverImage) URL.revokeObjectURL(coverImage);
    products.forEach((product) => {
      if (product.image) URL.revokeObjectURL(product.image);
    });

    // Reset state
    setLogo(null);
    setLogoFile(null);
    setCoverImage(null);
    setCoverImageFile(null);
    setProducts([{ name: '', price: '', image: null, imageFile: null }]);
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
                    aria-label="Remove Logo"
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
                    aria-label="Remove Cover Image"
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
                  aria-label={`Remove Product ${index + 1}`}
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
                    <>
                      <IconButton sx={{ color: "#d32323" }}>
                        <AddIcon />
                      </IconButton>
                      <Typography variant="body2">Add Image</Typography>
                    </>
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
                    type="number"
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
              '&:hover': {
                backgroundColor: "#b31f1f",
              },
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
