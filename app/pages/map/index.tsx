import { useEffect, useState } from "react";
import Image from "next/image";
// import { coordinates } from '../../components/Map/coordinates'
import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('../../components/Map/Map'), {
  ssr: false,
});
export default function Map() {



  // let API_KEY = 'd8678d7061374e9284f6ffc8b5635316'

  // let route_polyline = ""

  // for (let i = 0; i < coordinates.length; i++) {
  //   route_polyline = route_polyline + (coordinates[i][0]).toString() + ',' + (coordinates[i][1]).toString()
  //   if (i <= (coordinates.length - 2)) {
  //     route_polyline = route_polyline + ','
  //   }
  // }
  const [geoData, setGeoData] = useState({ lat: 64.536634, lng: 16.779852 });

  const center = [geoData.lat, geoData.lng];

  return (
    <>
      <h1>Hello this is Mihir</h1>
      <br />
      <br />
      <br />

      {/* <Image
        width="600"
        height="400"
        src={`https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&zoom=8.8809&geometry=polyline:${route_polyline}&apiKey=${API_KEY}`}
        alt="Portland State University, 724 Southwest Hooker Street, Portland, OR 97201, United States of America"
      /> */}
      <div className="h-[500px] w-[500px]">
        <MapWithNoSSR></MapWithNoSSR>
      </div>

    </>
  );
}
