"use client";

import React, { useMemo, useState } from "react";
import { GoogleMap, Marker, Circle, useJsApiLoader } from "@react-google-maps/api";

const center = { lat: 51.4545, lng: -2.5879 }; // Bristol

const containerStyle: React.CSSProperties = {
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

export default function ServiceMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Guard: key missing
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

  // Memoize styles/options to avoid re-creating them each render
  const styles = useMemo(
    () => [
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
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: BRAND.mutedInk }],
      },

      // Highways: slightly clearer but still calm
      { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#E2E7E3" }] },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#D2DAD3" }],
      },

      // Water: soft sage tint
      { featureType: "water", elementType: "geometry", stylers: [{ color: "#DDE7E1" }] },
      { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#5B6B63" }] },

      // Parks/landscape: subtle sage wash
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [{ color: "#EEF3EF" }],
      },
    ],
    []
  );

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      zoomControl: true,
      clickableIcons: false,
      styles,
    }),
    [styles]
  );

  // ✅ Loads the Google script ONCE, prevents "already present"
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-maps-script", // stable id helps reuse
    googleMapsApiKey: apiKey,
  });

  // Needed for branded marker (wait until map is ready)
  const [mapReady, setMapReady] = useState(false);

  if (loadError) {
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
          Map failed to load — please try again.
        </p>
      </div>
    );
  }

  if (!isLoaded) {
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
        <p style={{ margin: 0, textAlign: "center", color: BRAND.ink }}>Loading map…</p>
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
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={options}
        onLoad={() => setMapReady(true)}
      >
        {/* Branded marker (optional upgrade) */}
        {mapReady ? (
          <Marker
            position={center}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: BRAND.sage,
              fillOpacity: 1,
              strokeColor: "#FFFFFF",
              strokeWeight: 3,
            }}
          />
        ) : (
          <Marker position={center} />
        )}

        {/* Service coverage: soft sage glow */}
        <Circle
          center={center}
          radius={12000} // 12km service radius
          options={{
            strokeColor: BRAND.sage,
            strokeOpacity: 0.25,
            strokeWeight: 2,
            fillColor: BRAND.sage,
            fillOpacity: 0.12,
            clickable: false,
          }}
        />
        <Circle
          center={center}
          radius={12000}
          options={{
            strokeColor: BRAND.sage,
            strokeOpacity: 0.55,
            strokeWeight: 1,
            fillOpacity: 0,
            clickable: false,
          }}
        />
      </GoogleMap>
    </div>
  );
}