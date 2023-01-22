import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import coordinates from "./coordinates";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup,
  Polyline,
} from "react-leaflet";
import markerLogo from "../../public/images/marker.png";
import L, { marker } from "leaflet";
import { data } from "autoprefixer";
const markerIcon = new L.icon({
  iconUrl: "/images/marker2.png",
  iconSize: [40, 40],
});
const limeOptions = { color: "lime" };

export function ChangeView({ coords }) {
  const map = useMap();
  map.setView(coords, 12);
  return null;
}

export default function Map() {
  const [geoData, setGeoData] = useState({
    lat: coordinates[0][0],
    lng: coordinates[0][1],
  });

  const center = [geoData.lat, geoData.lng];

  return (
    <>
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "100vh" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoData.lat && geoData.lng && (
          <Marker position={[geoData.lat, geoData.lng]} icon={markerIcon} />
        )}
        <Polyline pathOptions={limeOptions} positions={coordinates} />
        <ChangeView coords={center} />
      </MapContainer>
    </>
  );
}
