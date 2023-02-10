import Navbar from "../../../components/Dispatch/Navbar";
import Footer from "../../../components/Footer";
import Navigation from "../../../components/Dispatch/Navigation";
import React, { useEffect } from "react";
import { Rider } from "../../../@types/rider";
import { NavigationContextWrapper } from "../../../@types/navigation";
import { NavigationContext } from "../../../context/navigationContext";

export default function Dashboard() {

  const { riders, getRiders } = React.useContext(
    NavigationContext
  ) as NavigationContextWrapper;

  const [ridersProps, setRidersProps] = React.useState<{} | undefined>(undefined);
  
  useEffect(() => {
    getRiders()
  }, []);


  return (
    <>
      <Navbar />
      {riders.length > 0 ? (<Navigation/>) : (<h1>Loading</h1>)}
      <Footer />
    </>
  );
}
