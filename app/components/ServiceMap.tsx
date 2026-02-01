"use client";

import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";

const center = { lat: 51.4545, lng: -2.5879 }; // Bristol

const mapContainerClassName = "h-[460px] w-full rounded-[18px]";

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
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

  return (
    <div className="overflow-hidden rounded-[18px] shadow-[0_16px_50px_rgba(0,0,0,0.12)]">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerClassName={mapContainerClassName}
          center={center}
          zoom={12}
          options={options}
        >
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
