import React from "react";
import Riders from "../../../components/Dispatch/Riders";
import Navbar from "../../../components/Dispatch/Navbar";
import Footer from "../../../components/Footer";
import { useEffect } from "react";



export default function Map() {

  return (
    <>
      <Navbar />
      <Riders />
      <Footer />
    </>
  );
}
