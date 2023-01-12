import { useRouter } from "next/router";
import Login from "../../components/Deliver/Login";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";

export default function Deliver() {

  const router = useRouter();
  const onLogin = () => {
    //verification
    router.push("/deliver/dashboard");
  };
  
  return (
    <>
      <Navbar />
      <Login />
      <Footer />
    </>
  );
}
