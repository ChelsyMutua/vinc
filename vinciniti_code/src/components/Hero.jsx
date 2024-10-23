import { Box } from "@mui/material";
import { useEffect, useState } from "react";

//list of images for the background
const backgroundImages = [
  "assets/p_yellow.png",
  "assets/kims_barbershop.png",
  "assets/sallon.png",
];

function Hero() {
  // keep track of the current background image
  const [currentImage, setCurrentImage] = useState(0);

  // Change background image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % backgroundImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: {
            xs: "20rem",
            sm: "30rem",
            md: "40rem",
            lg: "45rem",
            xl: "48rem",
          },
          padding: "20px",
          color: "white",
          textAlign: "center",
        }}
      >
        {/* Use object-fit to control image behavior */}
        <img
          src={backgroundImages[currentImage]} // Image URL from state
          alt="Current Background"
          style={{
            width: "100%", // Make image responsive to its container width
            height: "100%", // Scale the image proportionally
            objectFit: "cover", // Use "cover" to fill the container without distortion
            borderRadius:"20px",
          }}
        />
      </Box>
    </>
  );
}
export default Hero;
