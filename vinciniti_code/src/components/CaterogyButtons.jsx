import { Box, Button } from "@mui/material";

const categoryIcons = {
  Barbershop: "/assets/barbershop.png",
  Restaurant: "/assets/restaurant.png",
  shoes: "/assets/shoes.png",
  Saloon: "/assets/beauty-saloon.png",
  Nail: "/assets/nail.png",
  Cloths: "/assets/tshirt.png",
};

const categories = [
  "Barbershop",
  "Restaurant",
  "shoes",
  "Saloon",
  "Nail",
  "Cloths",
];

function Categories() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start", // Align items to the left to start scroll
          marginY: 3,
          paddingX: "20px",
          overflowX: "auto", // Enable horizontal scrolling
          overflowY:"hidden",
          whiteSpace: "nowrap", // Prevent the buttons from wrapping to a new line
          scrollbarWidth: "none", // Make scrollbar thinner (for Firefox)
          "&::-webkit-scrollbar": {
            height: "6px", // Adjust scrollbar height for Chrome/Safari
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888", // Scrollbar color
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1", // Scrollbar track color
          },
        }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            variant="outlined"
            sx={{
              marginX: 1,
              color: "black",
              fontSize: "1.20rem",
              borderRadius: "15px",
              display:"inline-flex", // ensure buttons remain in a single row
              alignItems:'center',
              flexShrink:0, //prevent buttons from shrinking in the inside
            }}
          >
            {/* Show the icon next to the text */}
            <Box
              component="img"
              src={categoryIcons[category]} // Use the icon from the categoryIcons mapping
              alt={`${category} icon`}
              sx={{
                width: "2.1825rem",
                height: "2.1825rem",
                marginRight: 2.5, // Space between icon and text
              }}
            />
            {category}
          </Button>
        ))}
      </Box>
    </>
  );
}

export default Categories;
