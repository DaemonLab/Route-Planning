import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import Login from "../../components/Deliver/Login";
import Navbar from "../../components/Home/Navbar";

export default function ScannerHome() {

  const router = useRouter();
  const onLogin = () => {
    //verification
    router.push("/scanner/dashboard");
  };
  
  return (
    <>
      <Navbar />
      <Login />
      <Footer />
    </>
  );
}
