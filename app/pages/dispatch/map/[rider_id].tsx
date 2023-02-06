import React, { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { Rider } from "../../../@types/rider";
import { NavigationContextWrapper } from "../../../@types/navigation";
import { NavigationContext } from "../../../context/navigationContext";

const MapWithNoSSR = dynamic(() => import("../../../components/Map"), {
  ssr: false,
});

export default function RiderMap() {

  const router = useRouter();
  const {
    query: { rider_id },
  } = router;

  const { riders, getRiders } = React.useContext(
    NavigationContext
  ) as NavigationContextWrapper;
  const [rider, setRider] = React.useState<Rider | undefined>(undefined);

  useEffect(() => {
    // setInterval(() => {
    //   getRiders();
    // }, 2000);
    getRiders()
    console.log(riders)
  }, [riders]);


  useEffect(() => {
    setRider(
      riders.find((rider) => {
        return rider.rider_id === rider_id;
      })
    );
  }, [riders, rider_id]);


  return (
    <>
      {rider === undefined || rider['current_route'].length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <div className="h-[500px] w-[500px]">
          {rider_id}
          <MapWithNoSSR rider={rider}></MapWithNoSSR>
        </div>
      )
      }
    </>
  );
}
