"use client";

import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";

const center = { lat: 51.4545, lng: -2.5879 }; // Bristol

const containerStyle = {
  width: "100%",
  height: "460px",
  borderRadius: "18px",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  clickableIcons: false,
  styles: [
    { elementType: "geometry", stylers: [{ saturation: -80 }, { lightness: 15 }] },
    { elementType: "labels.text.fill", stylers: [{ saturation: -100 }, { lightness: 10 }] },
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
  ],
};

export default function ServiceMap() {
  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: containerStyle.borderRadius,
        boxShadow: "0 16px 50px rgba(0,0,0,0.12)",
      }}
    >
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} options={options}>
          <Marker position={center} />
          <Circle
            center={center}
            radius={12000} // 12km service radius
            options={{
              strokeOpacity: 0.4,
              strokeWeight: 2,
              fillOpacity: 0.12,
              clickable: false,
            }}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
