import { useState } from "react";
import { Box, Typography, Button, TextField, Grid } from "@mui/material";
import Container from "./center_container";

const ReviewReply = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Roxana A.",
      rating: 5,
      date: "7/3/2024",
      comment: "Hadn't been there since 2017 but I moved back into the area...",
      reply: "", // Initial reply is empty
      showReplyBox: false, // Tracks whether the reply box is visible
    },
    {
      id: 2,
      name: "Corina L.",
      rating: 4,
      date: "6/6/2024",
      comment: "I had a great experience at Temple recently with a bunch of friends...",
      reply: "",
      showReplyBox: false,
    },
    {
      id: 3,
      name: "Annika S.",
      rating: 4,
      date: "6/3/2024",
      comment: "The music was iffy so check whose DJ'ing to make sure it's your music taste!",
      reply: "",
      showReplyBox: false,
    },
  ]);

  // Toggle Reply Box Visibility
  const toggleReplyBox = (id) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id
          ? { ...review, showReplyBox: !review.showReplyBox }
          : review
      )
    );
  };

  // Handle Reply Input
  const handleReplyChange = (id, value) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, reply: value } : review
      )
    );
  };

  // Handle Submit Reply
  const handleReplySubmit = (id) => {
    alert("Reply posted!");
    // Logic to send reply to server can go here
    toggleReplyBox(id); // Close reply box after submitting
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
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
              src="/assets/tatu-moto.png" // Replace with the correct path to your logo
              alt="Business Logo"
              style={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: "8px",
              }}
            />
          </Box>
        </Grid>

        {/* Right Column - Reviews and Replies */}
        <Grid item xs={12} md={6}>
          <Box>
            {/* Header */}
            <Box sx={{ borderBottom: "1px solid #ddd", marginBottom: "20px", paddingBottom: "10px" }}>
              <Typography variant="h4" sx={{ marginBottom: "10px" }}>
                Reviews and Replies
              </Typography>
            </Box>

            {/* Reviews Section */}
            {reviews.map((review) => (
              <Box
                key={review.id}
                sx={{
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "20px",
                  marginBottom: "20px",
                }}
              >
                {/* Review Details */}
                <Typography variant="h6" sx={{ marginBottom: "5px" }}>
                  {review.name} <Typography variant="caption">({review.date})</Typography>
                </Typography>
                <Box sx={{ marginBottom: "10px" }}>
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      style={{
                        color: index < review.rating ? "#ffc107" : "#ddd",
                        fontSize: "16px",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </Box>
                <Typography variant="body1" sx={{ marginBottom: "15px" }}>
                  {review.comment}
                </Typography>

                {/* Reply Button */}
                <Button
                  variant="contained"
                  onClick={() => toggleReplyBox(review.id)}
                  sx={{
                    backgroundColor: "#d32323", // Matches Post Review button
                    color: "#fff", // White text
                    textTransform: "none", // Prevent uppercase text
                    marginBottom: "10px",
                  }}
                >
                  {review.showReplyBox ? "Cancel" : "Reply"}
                </Button>

                {/* Reply TextArea (only visible if reply box is toggled) */}
                {review.showReplyBox && (
                  <Box>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      value={review.reply}
                      onChange={(e) => handleReplyChange(review.id, e.target.value)}
                      placeholder="Write your reply here..."
                      sx={{ marginBottom: "10px" }}
                    />
                    <Button
                      variant="contained"
                      onClick={() => handleReplySubmit(review.id)}
                      disabled={!review.reply.trim()} // Disable button if reply is empty
                      sx={{
                        backgroundColor: "#d32323",
                        color: "#fff",
                      }}
                    >
                      Post Reply
                    </Button>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReviewReply;
