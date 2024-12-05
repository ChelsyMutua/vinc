import { Box, Typography } from "@mui/material";
import GridLayout from "./grid-layout";
import LeftSection from "./left-section";

const Analytics = () => {
  return (
    <GridLayout
      leftContent={
        <LeftSection
          imageSrc="/assets/tatu-moto.png"
          altText="Business Logo"
        />
      }
      rightContent={
        <Box sx={{ padding: "1rem 0 1rem 1rem", height: "100%" }}>
          <Typography
            variant="h4"
            sx={{
              marginBottom: "1.5rem",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Analytics Dashboard
          </Typography>

          {/* Grid for Cards */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr", // Two equal columns
              gridTemplateRows: "1fr 1fr", // Two equal rows
              gap: "1rem", // Reduced gap between cards
              height: "calc(100% - 2rem)", // Ensures cards fill the remaining height
            }}
          >
            {/* Card 1: Transactions */}
            <Box
              sx={{
                backgroundColor: "black",
                borderRadius: "12px",
                padding: "1.5rem",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                Transactions
              </Typography>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <Typography>Youtube Music</Typography>
                  <Typography color="error">- $55.50</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <Typography>Easy Pay</Typography>
                  <Typography color="success.main">+ $1,955.00</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>iTunes</Typography>
                  <Typography color="error">- $25.00</Typography>
                </Box>
              </Box>
            </Box>

            {/* Card 2: Total */}
            <Box
              sx={{
                backgroundColor: "black",
                borderRadius: "12px",
                padding: "1.5rem",
                color: "white",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                Total
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: "success.main",
                }}
              >
                $94,475
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                Last updated: Today
              </Typography>
            </Box>

            {/* Card 3: Users in Last Week */}
            <Box
              sx={{
                backgroundColor: "black",
                borderRadius: "12px",
                padding: "1.5rem",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                Users in the Last Week
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "success.main" }}
                >
                  +2.1%
                </Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  Compared to last week
                </Typography>
              </Box>
            </Box>

            {/* Card 4: Balance */}
            <Box
              sx={{
                backgroundColor: "black",
                borderRadius: "12px",
                padding: "1.5rem",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                Balance
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: "success.main",
                  marginBottom: "0.5rem",
                }}
              >
                $162,745.00
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                Total Week Profit:{" "}
                <span style={{ color: "#4caf50" }}>+11.05%</span>
              </Typography>
            </Box>
          </Box>
        </Box>
      }
    />
  );
};

export default Analytics;
