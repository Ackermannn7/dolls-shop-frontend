import React, { useEffect, useRef } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const MapContainer = (props) => {
  const mapStyles = {
    position: "relative",
    width: "70px",
    height: "70px",
  };

  const { address } = props; // Extract the address prop
  const delimiter = ":";

  const parts = address.split(delimiter);
  const result = parts.length > 1 ? parts[1].trim() : "";
  const mapRef = useRef(null); // Create a reference to the map component

  const geocodeAddress = (address) => {
    const { google } = props;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK") {
        const { lat, lng } = results[0].geometry.location;
        const center = { lat: lat(), lng: lng() };
        mapRef.current && mapRef.current.map.setCenter(center); // Check if mapRef.current is available before accessing the map object
      } else {
        console.error(
          "Geocode was not successful for the following reason:",
          status
        );
      }
    });
  };

  useEffect(() => {
    geocodeAddress(address);
  }, [address]);

  const onMapReady = (mapProps, map) => {
    mapRef.current = { map }; // Assign the map object to the mapRef.current property
  };

  return (
    <Map
      google={props.google}
      zoom={14}
      style={mapStyles}
      initialCenter={{
        lat: 37.7749,
        lng: -122.4194,
      }}
      onReady={onMapReady}
    />
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyD08QghGoqfGbs-ipidE1x4FetK8WfpzSc", // Replace with your Google Maps API key
})(MapContainer);
