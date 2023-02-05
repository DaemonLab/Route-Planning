import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { RiderContextWrapper, Rider } from "../../../@types/rider";
import { RiderContext } from "../../../context/riderContext";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../../../components/Map"), {
  ssr: false,
});

function RiderMap() {
  const router = useRouter();
  const {
    query: { rider_id },
  } = router;
  const {
    rider,
    riders,
    getRider,
    getRiders,
    addRider,
    addRiders,
    deleteRider,
  } = React.useContext(RiderContext) as RiderContextWrapper;
  useEffect(() => {
    if (rider_id && !Array.isArray(rider_id)) getRider(rider_id);
  }, [rider_id]);
  return (
    <>
      <div className="h-[500px] w-[500px]">{rider_id}
        <MapWithNoSSR rider_id={rider_id}></MapWithNoSSR>
      </div>
    </>
  );
}

export default RiderMap;
