import { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import GridLayout from "./grid-layout";
import LeftSection from "./left-section";

const ReviewReply = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Roxana A.",
      rating: 5,
      date: "7/3/2024",
      comment: "Hadn't been there since 2017 but I moved back into the area...",
      reply: "",
      showReplyBox: false,
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
    {
    id: 4,
    name: "Roxana A.",
    rating: 5,
    date: "7/3/2024",
    comment: "Hadn't been there since 2017 but I moved back into the area...",
    reply: "",
    showReplyBox: false,
  },
  {
    id: 5,
    name: "Corina L.",
    rating: 4,
    date: "6/6/2024",
    comment: "I had a great experience at Temple recently with a bunch of friends...",
    reply: "",
    showReplyBox: false,
  },
  {
    id: 6,
    name: "Annika S.",
    rating: 4,
    date: "6/3/2024",
    comment: "The music was iffy so check whose DJ'ing to make sure it's your music taste!",
    reply: "",
    showReplyBox: false,
  },
  ]);

  const toggleReplyBox = (id) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id
          ? { ...review, showReplyBox: !review.showReplyBox }
          : review
      )
    );
  };

  const handleReplyChange = (id, value) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, reply: value } : review
      )
    );
  };

  const handleReplySubmit = (id) => {
    alert("Reply posted!");
    toggleReplyBox(id);
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
          <Typography variant="h4" sx={{ marginBottom: "20px" }}>
            Reviews and Replies
          </Typography>

          {reviews.map((review) => (
            <Box
              key={review.id}
              sx={{
                borderBottom: "1px solid #ddd",
                paddingBottom: "20px",
                marginBottom: "20px",
              }}
            >
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

              <Button
                variant="contained"
                onClick={() => toggleReplyBox(review.id)}
                sx={{
                  backgroundColor: "#d32323",
                  color: "#fff",
                  textTransform: "none",
                  marginBottom: "10px",
                }}
              >
                {review.showReplyBox ? "Cancel" : "Reply"}
              </Button>

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
                    disabled={!review.reply.trim()}
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
      }
    />
  );
};

export default ReviewReply;
