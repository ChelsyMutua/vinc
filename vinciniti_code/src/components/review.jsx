import Container from "./center_container";
import { useState } from "react";


const Review = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([
    {
      name: "Roxana A.",
      rating: 5,
      date: "7/3/2024",
      comment: "Hadn't been there since 2017 but I moved back into the area...",
    },
    {
      name: "Corina L.",
      rating: 4,
      date: "6/6/2024",
      comment: "I had a great experience at Temple recently with a bunch of friends...",
    },
    {
      name: "Annika S.",
      rating: 4,
      date: "6/3/2024",
      comment: "The music was iffy so check whose DJ'ing to make sure it's your music taste!",
    },
  ]);

  // Handle rating click
  const handleRating = (value) => setRating(value);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (review && rating) {
      const newReview = {
        name: "Anonymous", // Replace with user login info if available
        rating,
        date: new Date().toLocaleDateString(),
        comment: review,
      };
      setReviews([newReview, ...reviews]);
      setReview("");
      setRating(0);
    }
  };

  return (
 <Container>
      {/* Header */}
      <header style={{ borderBottom: "1px solid #ddd", marginBottom: "20px", paddingBottom: "10px" }}>
        <h1 style={{ fontSize: "24px", margin: 0 }}>Temple Nightclub</h1>
        <a href="#guidelines" style={{ color: "#0073bb", fontSize: "14px", textDecoration: "none" }}>
          Read our review guidelines
        </a>
      </header>

      {/* Review Form */}
      <div style={{ marginBottom: "40px" }}>
        <form onSubmit={handleSubmit} style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px" }}>
          {/* Rating */}
          <div style={{ marginBottom: "20px" }}>
            <p style={{ marginBottom: "5px" }}>Select your rating</p>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRating(star)}
                  style={{
                    fontSize: "24px",
                    cursor: "pointer",
                    color: star <= rating ? "#ffc107" : "#ddd",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Review Textarea */}
          <div style={{ marginBottom: "20px" }}>
            <p style={{ marginBottom: "5px" }}>A few things to consider in your review</p>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Food, Service, Ambiance..."
              style={{
                width: "100%",
                height: "100px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "10px",
                fontSize: "14px",
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              backgroundColor: "#d32323",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Post Review
          </button>
        </form>
      </div>

      {/* Recent Reviews */}
      <div>
        <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Recent Reviews</h3>
        <div>
          {reviews.map((item, index) => (
            <div
              key={index}
              style={{
                borderBottom: "1px solid #ddd",
                paddingBottom: "10px",
                marginBottom: "10px",
              }}
            >
              <h4 style={{ fontSize: "16px", margin: "0 0 5px 0" }}>
                {item.name} <span style={{ color: "#999", fontSize: "12px" }}>{item.date}</span>
              </h4>
              <p style={{ margin: "0 0 5px 0" }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: i < item.rating ? "#ffc107" : "#ddd", fontSize: "16px" }}>
                    ★
                  </span>
                ))}
              </p>
              <p style={{ margin: 0 }}>{item.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Review;
