import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
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

export default function Map({rider}) {

  console.log("Got rider",rider)

  const [riderPosition, setRiderPosition] = useState({
    lat: rider['current_route'][rider['route_index']]['lat'],
    lng: rider['current_route'][rider['route_index']]['lng']
  });


  useEffect(()=>{
    setRiderPosition({
      lat: rider['current_route'][rider['route_index']]['lat'],
      lng: rider['current_route'][rider['route_index']]['lng']
    })
    console.log("Updated Rider")
  },[rider])
  
  
  return (
    <section className="text-gray-600 bg-black overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <MapContainer
            center={[riderPosition.lat, riderPosition.lng]}
            zoom={20}
            style={{ width: "100vw", height: "100vh" }}
            scrollWheelZoom={true}
          >
            Hi
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {riderPosition.lat && riderPosition.lng && (
              <Marker position={[riderPosition.lat, riderPosition.lng]} icon={markerIcon} />
            )}

            <Polyline pathOptions={limeOptions} positions={rider['route_polyline']} />
            <ChangeView coords={[riderPosition.lat, riderPosition.lng]} />
          </MapContainer>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          </div>
        </div>
      </div>
    </section>


  );
}