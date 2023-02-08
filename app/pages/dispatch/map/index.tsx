import React from "react";
import Riders from "../../../components/Dispatch/Riders";
import Navbar from "../../../components/Dispatch/Navbar";
import Footer from "../../../components/Footer";
import { useEffect } from "react";
import { Rider } from "../../../@types/rider";
import { NavigationContextWrapper } from "../../../@types/navigation";
import { NavigationContext } from "../../../context/navigationContext";


export default function Map() {
  const { riders, getRiders } = React.useContext(
    NavigationContext
  ) as NavigationContextWrapper;
  const [ridersProps, setRidersProps] = React.useState<{} | undefined>(undefined);

  useEffect(() => {
    // setInterval(() => {
    //   getRiders();
    // }, 2000);
    // console.log(await getRiders());
    getRiders()
    setRidersProps({ ridersList: riders });
  }, [riders]);



  return (
    <>
      <Navbar />
      {ridersProps ? (<Riders {...ridersProps} />) : (<h1>Loading</h1>)}

      <Footer />
    </>
  );
}
