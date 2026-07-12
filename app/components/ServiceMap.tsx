"use client";

import React, { useMemo, useState } from "react";
import { Circle, GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const center = { lat: 51.4545, lng: -2.5879 };

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "460px",
  borderRadius: "18px",
};

const BRAND = {
  sage: "#7C8F7A",
  ink: "#0F172A",
  light: "#F8FAF9",
  mutedInk: "#6B7280",
};

function MapFallback({ message }: { message: string }) {
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
      <p style={{ margin: 0, textAlign: "center", color: BRAND.ink }}>{message}</p>
    </div>
  );
}

export default function ServiceMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

  const styles = useMemo(
    () => [
      { elementType: "geometry", stylers: [{ color: BRAND.light }] },
      { elementType: "labels.text.fill", stylers: [{ color: BRAND.ink }] },
      { elementType: "labels.text.stroke", stylers: [{ color: BRAND.light }] },
      { featureType: "poi", stylers: [{ visibility: "off" }] },
      { featureType: "transit", stylers: [{ visibility: "off" }] },
      { featureType: "road", elementType: "geometry", stylers: [{ color: "#E9ECEA" }] },
      { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#DDE3DE" }] },
      { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: BRAND.mutedInk }] },
      { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#E2E7E3" }] },
      { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#D2DAD3" }] },
      { featureType: "water", elementType: "geometry", stylers: [{ color: "#DDE7E1" }] },
      { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#5B6B63" }] },
      { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#EEF3EF" }] },
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

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-maps-script",
    googleMapsApiKey: apiKey || "missing-key",
  });
  const [mapReady, setMapReady] = useState(false);

  if (!apiKey) {
    return <MapFallback message="Map unavailable — missing Google Maps API key." />;
  }

  if (loadError) {
    return <MapFallback message="Map failed to load — please try again." />;
  }

  if (!isLoaded) {
    return <MapFallback message="Loading map…" />;
  }

  return (
    <div style={{ overflow: "hidden", borderRadius: containerStyle.borderRadius, boxShadow: "0 16px 50px rgba(0,0,0,0.12)" }}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} options={options} onLoad={() => setMapReady(true)}>
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
        <Circle center={center} radius={12000} options={{ strokeColor: BRAND.sage, strokeOpacity: 0.25, strokeWeight: 2, fillColor: BRAND.sage, fillOpacity: 0.12, clickable: false }} />
        <Circle center={center} radius={12000} options={{ strokeColor: BRAND.sage, strokeOpacity: 0.55, strokeWeight: 1, fillOpacity: 0, clickable: false }} />
      </GoogleMap>
    </div>
  );
}
