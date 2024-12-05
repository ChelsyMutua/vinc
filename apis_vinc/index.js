const express = require('express');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');



// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Configure multer storage (use memory storage to get buffer data)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Define the server port
const PORT = process.env.PORT || 3000;

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,  // Adjust based on security requirements
  },
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to the database');
  release();
});

// Sample route
app.get('/', (req, res) => {
  res.send('API is working!');
});


// Example using Express.js
app.get('/api/streets', async (req, res) => {
  try {
    const streets = await pool.query('SELECT * FROM spatial_ref_sys');
    res.json(streets.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});



// Backend endpoint to update business coordinates
app.put("/api/businesses/:business_id/coordinates", async (req, res) => {
  const { id } = req.params;
  const { latitude, longitude } = req.body;

  try {
    const result = await db.query(
      "UPDATE businesses SET latitude = $1, longitude = $2 WHERE id = $3 RETURNING *",
      [latitude, longitude, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating business coordinates:", err);
    res.status(500).send("Server error");
  }
});

// Fetch businesses with coordinates
app.get("/api/businesses", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT business_id, business_name, latitude, longitude FROM businesses WHERE latitude IS NOT NULL AND longitude IS NOT NULL"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching businesses:", err);
    res.status(500).send("Server error");
  }
});

// Endpoint to upload business images (logo and cover image)
app.post(
  '/api/businesses/:business_id/upload-images',
  upload.fields([{ name: 'logo' }, { name: 'cover_image' }]),
  async (req, res) => {
    const { business_id } = req.params;
    const files = req.files;

    try {
      let logo_url = null;
      let cover_image_url = null;

      // Handle logo upload
      if (files.logo && files.logo[0]) {
        const { buffer, originalname, mimetype } = files.logo[0];
        const filePath = `logos/${business_id}/${Date.now()}_${originalname}`;

        // Upload to Supabase storage
        const { data, error } = await supabase.storage
          .from('business-assets')
          .upload(filePath, buffer, {
            cacheControl: '3600',
            upsert: false,
            contentType: mimetype,
          });

        if (error) throw error;

        // Get public URL
        const { data: urlData, error: publicURLError } = supabase.storage
          .from('business-assets')
          .getPublicUrl(filePath);

        if (publicURLError) throw publicURLError;

        logo_url = urlData.publicUrl;
      }

      // Handle cover image upload
      if (files.cover_image && files.cover_image[0]) {
        const { buffer, originalname, mimetype } = files.cover_image[0];
        const filePath = `cover_images/${business_id}/${Date.now()}_${originalname}`;

        // Upload to Supabase storage
        const { data, error } = await supabase.storage
          .from('business-assets')
          .upload(filePath, buffer, {
            cacheControl: '3600',
            upsert: false,
            contentType: mimetype,
          });

        if (error) throw error;

        // Get public URL
        const { data: urlData, error: publicURLError } = supabase.storage
          .from('business-assets')
          .getPublicUrl(filePath);

        if (publicURLError) throw publicURLError;

        cover_image_url = urlData.publicUrl;
      }

      // Update the database
      const queryText = `
        UPDATE businesses
        SET
          logo_url = COALESCE($1, logo_url),
          cover_image_url = COALESCE($2, cover_image_url)
        WHERE business_id = $3
        RETURNING *;
      `;

      const values = [logo_url, cover_image_url, business_id];

      const result = await pool.query(queryText, values);

      res.json({
        message: 'Images uploaded successfully',
        business: result.rows[0],
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      res.status(500).json({ error: 'Error uploading images' });
    }
  }
);

// Endpoint to upload product image
app.post(
  '/api/products/:product_id/upload-image',
  upload.single('product_image'),
  async (req, res) => {
    const { product_id } = req.params;
    const file = req.file;

    try {
      let product_image_url = null;

      if (file) {
        const { buffer, originalname, mimetype } = file;
        const filePath = `product_images/${product_id}/${Date.now()}_${originalname}`;

        // Upload to Supabase storage
        const { data, error } = await supabase.storage
          .from('product-assets')
          .upload(filePath, buffer, {
            cacheControl: '3600',
            upsert: false,
            contentType: mimetype,
          });

        if (error) throw error;

        // Get public URL
        const { data: urlData, error: publicURLError } = supabase.storage
          .from('product-assets')
          .getPublicUrl(filePath);

        if (publicURLError) throw publicURLError;

        product_image_url = urlData.publicUrl;
      }

      // Update the database
      const queryText = `
        UPDATE products
        SET
          product_image_url = COALESCE($1, product_image_url)
        WHERE product_id = $2
        RETURNING *;
      `;

      const values = [product_image_url, product_id];

      const result = await pool.query(queryText, values);

      res.json({
        message: 'Product image uploaded successfully',
        product: result.rows[0],
      });
    } catch (error) {
      console.error('Error uploading product image:', error);
      res.status(500).json({ error: 'Error uploading product image' });
    }
  }
);



// Make sure the server is listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});