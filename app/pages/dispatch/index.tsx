import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import Login from "../../components/Dispatch/Login";
import Navbar from "../../components/Home/Navbar";

export default function ManagerHome() {

  const router = useRouter();
  const onLogin = () => {
    //verification
    router.push("/manager/dashboard");
  };
  
  return (
    <>
      <Navbar />
      <Login />
      <Footer />
    </>
  );
}
