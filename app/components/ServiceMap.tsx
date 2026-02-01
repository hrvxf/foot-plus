"use client";

import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";

const center = { lat: 51.4545, lng: -2.5879 }; // Bristol

const containerStyle = {
  width: "100%",
  height: "460px",
  borderRadius: "18px",
};

// Foot+ brand colours
const BRAND = {
  sage: "#7C8F7A",
  ink: "#0F172A",
  light: "#F8FAF9",
  mutedInk: "#6B7280",
};

// Stylised “calm premium” map theme
const styles = [
  // Base canvas: clean + warm
  { elementType: "geometry", stylers: [{ color: BRAND.light }] },
  { elementType: "labels.text.fill", stylers: [{ color: BRAND.ink }] },
  { elementType: "labels.text.stroke", stylers: [{ color: BRAND.light }] },

  // De-emphasise POIs + clutter
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },

  // Roads: soft + minimal
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#E9ECEA" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#DDE3DE" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: BRAND.mutedInk }] },

  // Highways: slightly clearer but still calm
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#E2E7E3" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#D2DAD3" }] },

  // Water: soft sage tint
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#DDE7E1" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#5B6B63" }] },

  // Parks/landscape: subtle sage wash
  { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#EEF3EF" }] },
];

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  clickableIcons: false,
  styles,
};

export default function ServiceMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // If the key isn't present, don't try to load Google Maps
  if (!apiKey) {
    return (
      <div
        style={{
          height: containerStyle.height,
          borderRadius: containerStyle.borderRadius,
          background: "rgba(15, 23, 42, 0.04)",
          display: "grid",
          placeItems: "center",
          padding: 16,
        }}
      >
        <p style={{ margin: 0, textAlign: "center", color: BRAND.ink }}>
          Map unavailable — missing Google Maps API key.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: containerStyle.borderRadius,
        boxShadow: "0 16px 50px rgba(0,0,0,0.12)",
      }}
    >
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          options={options}
        >
          <Marker position={center} />

          <Circle
            center={center}
            radius={12000} // 12km service radius
            options={{
              strokeColor: BRAND.sage,
              strokeOpacity: 0.55,
              strokeWeight: 2,
              fillColor: BRAND.sage,
              fillOpacity: 0.14,
              clickable: false,
            }}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}