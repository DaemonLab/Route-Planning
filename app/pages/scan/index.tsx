import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import {Login} from "../../components/Scan/Login";

export default function Scan() {

  return (
    <>
      <Navbar />
      <Login />
      <Footer />
    </>
  );
}
