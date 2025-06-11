import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// @ts-expect-error problem with types
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

interface MapGuessProps {
  guess: { lat: number; lng: number } | null;
  setGuess: (coords: { lat: number; lng: number }) => void;
  disabled?: boolean;
  debugLocation?: { lat: number; lng: number } | null;
}

const GuessMarker: React.FC<{
  setGuess: (coords: { lat: number; lng: number }) => void;
  disabled?: boolean;
}> = ({ setGuess, disabled }) => {
  useMapEvents({
    // @ts-expect-error problem with types
    click(e) {
      if (!disabled) setGuess(e.latlng);
    },
  });
  return null;
};

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapGuess: React.FC<MapGuessProps> = ({
  guess,
  setGuess,
  disabled,
  debugLocation,
}) => (
  <MapContainer
    // @ts-expect-error problem with types
    center={[38.42523518997033, -6.4196822000000004]}
    zoom={5}
    style={{ height: "100%", width: "100%" }}
    scrollWheelZoom={!disabled}
  >
    <TileLayer
      // @ts-expect-error problem with types
      attribution="&copy; OpenStreetMap contributors"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {guess && (
      //  @ts-expect-error problem with types
      <Marker position={[guess.lat, guess.lng]} icon={customIcon as any} />
    )}
    {debugLocation && debugLocation.lat !== 0 && debugLocation.lng !== 0 && (
      <Marker
        position={[debugLocation.lat, debugLocation.lng]}
        // @ts-ignore
        icon={L.divIcon({
          className: "debug-marker",
          html: '<div style="background:green;width:18px;height:18px;border-radius:50%;border:2px solid #fff;"></div>',
        })}
      />
    )}
    <GuessMarker setGuess={setGuess} disabled={disabled} />
  </MapContainer>
);

export default MapGuess;
