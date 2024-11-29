import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Box, Typography } from "@mui/material";

const MapLocation = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD_FPcoZL50S8WeYvrpGc452rDYadVRkuQ", // Replace with your API Key
  });

  const [markerPosition, setMarkerPosition] = useState({
    lat: 37.7749, // Default latitude (San Francisco)
    lng: -122.4194, // Default longitude (San Francisco)
  });

  const handleMapClick = (event) => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <Box>
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Map Location
      </Typography>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "400px",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
        center={markerPosition}
        zoom={12}
        onClick={handleMapClick} // Updates the marker when the map is clicked
      >
        <Marker position={markerPosition} />
      </GoogleMap>
      <Box sx={{ marginTop: "10px" }}>
        <Typography variant="body2">
          Latitude: {markerPosition.lat.toFixed(6)}
        </Typography>
        <Typography variant="body2">
          Longitude: {markerPosition.lng.toFixed(6)}
        </Typography>
      </Box>
    </Box>
  );
};

export default MapLocation;
