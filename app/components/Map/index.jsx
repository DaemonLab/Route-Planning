import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
  MapContainer, Marker, Polyline, TileLayer, useMap, Popup
} from "react-leaflet";

let zoomLevel = 12

const markerIcon = new L.icon({
  iconUrl: "/images/marker2.png",
  iconSize: [40, 40],
});
const limeOptions = { color: "blue" };

const createRoute = (rider) =>{
  
  let coordinates = []

  for(let i=0; i<rider["tasks"].length; i++) {
    coordinates = [...coordinates,...rider["tasks"][i]["route_polyline"]]
  }

  return coordinates
}

export function ChangeView({ coords }) {
  const map = useMap();
  map.setView(coords, zoomLevel);
  return null;
}

export default function Map({rider}) {


  const [riderPosition, setRiderPosition] = useState({
    lat: 12.9699142,
    lng: 77.6379417
  });
    
  return (
    <section className="text-gray-600 bg-black overflow-hidden">
      <div className="container px0 py-0 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <MapContainer
            center={[riderPosition.lat, riderPosition.lng]}
            zoom={20}
            style={{ width: "100vw", height: "70vh" }}
            scrollWheelZoom={true}
          >
            Hi
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {riderPosition.lat && riderPosition.lng && (
                <Marker position={[riderPosition.lat, riderPosition.lng]} icon={markerIcon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            )}

            <Polyline pathOptions={limeOptions} positions={createRoute(rider)} />
            <ChangeView coords={[riderPosition.lat, riderPosition.lng]} />
          </MapContainer>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          </div>
        </div>
      </div>
    </section>


  );
}