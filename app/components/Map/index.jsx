import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import {
  MapContainer, Marker, Polyline, TileLayer, useMap
} from "react-leaflet";
import coordinates from "./coordinates";
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

export default function Map(props) {
  const [geoData, setGeoData] = useState({
    lat: coordinates[0][0],
    lng: coordinates[0][1],
  });

  const center = [geoData.lat, geoData.lng];

  return (
    <section className="text-gray-600 bg-black overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <MapContainer
            center={center}
            zoom={200}
            style={{ width: "100vw", height: "100vh" }}
            scrollWheelZoom={true}
          >
            Hi
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
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          </div>
        </div>
      </div>
    </section>


  );
}
