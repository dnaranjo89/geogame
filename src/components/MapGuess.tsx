import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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

const MapGuess: React.FC<MapGuessProps> = ({
  guess,
  setGuess,
  disabled,
  debugLocation,
}) => (
  <MapContainer
    // @ts-expect-error problem with types
    center={[48.8584, 2.2945]}
    zoom={7}
    style={{ height: 350, width: "100%" }}
    scrollWheelZoom={!disabled}
  >
    <TileLayer
      // @ts-expect-error problem with types
      attribution="&copy; OpenStreetMap contributors"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {guess && <Marker position={[guess.lat, guess.lng]} />}
    {debugLocation && (
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
