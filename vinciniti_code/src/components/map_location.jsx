import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const MapLocation = () => {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC7mpT_fQp9RirAqW3uA-8kXVJ_zSfSXCI'// Ensure this environment variable is set
  });

  const [markerPosition, setMarkerPosition] = useState(null);
  const [streetData, setStreetData] = useState([]);
  const [selectedStreet, setSelectedStreet] = useState(null);

  useEffect(() => {
    // Fetch user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMarkerPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          // Handle location access denied or error
          setMarkerPosition({
            lat: 37.7749, // Default latitude
            lng: -122.4194, // Default longitude
          });
        }
      );
    } else {
      // Browser doesn't support Geolocation
      setMarkerPosition({
        lat: 37.7749, // Default latitude
        lng: -122.4194, // Default longitude
      });
    }

    // Fetch street data from backend
    axios.get('/api/streets')
      .then(response => {
        console.log('Street data:', response.data);
        setStreetData(response.data);
      })
      .catch(error => {
        console.error('Error fetching street data:', error);
      });
  }, []);

  const handleMapClick = (event) => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  if (!isLoaded || !markerPosition) return <div>Loading Map...</div>;

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
        onClick={handleMapClick}
      >
        <Marker position={markerPosition} />
        {Array.isArray(streetData) && streetData.map((item) => (
          <Marker
            key={item.said}
            position={{ lat: item.latitude, lng: item.longitude }}
            title={item.srtext}
            onClick={() => setSelectedStreet(item)}
          />
        ))}
        {selectedStreet && (
          <InfoWindow
            position={{ lat: selectedStreet.latitude, lng: selectedStreet.longitude }}
            onCloseClick={() => setSelectedStreet(null)}
          >
            <div>
              <h2>{selectedStreet.srtext}</h2>
              {/* Add more details if necessary */}
            </div>
          </InfoWindow>
        )}
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
