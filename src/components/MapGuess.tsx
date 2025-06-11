import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapGuessProps {
  guess: { lat: number; lng: number } | null;
  setGuess: (coords: { lat: number; lng: number }) => void;
  disabled?: boolean;
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

const MapGuess: React.FC<MapGuessProps> = ({ guess, setGuess, disabled }) => (
  <MapContainer
    // @ts-expect-error problem with types
    center={[20, 0]}
    zoom={2}
    style={{ height: 350, width: "100%" }}
    scrollWheelZoom={!disabled}
  >
    <TileLayer
      // @ts-expect-error problem with types
      attribution="&copy; OpenStreetMap contributors"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {guess && <Marker position={[guess.lat, guess.lng]} />}
    <GuessMarker setGuess={setGuess} disabled={disabled} />
  </MapContainer>
);

export default MapGuess;
