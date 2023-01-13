import { useRouter } from "next/router";
import Login from "../../components/Dispatch/Login";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";

export default function Dispatch() {
  const router = useRouter();
  const onLogin = () => {
    //verification
    router.push("/dispatch/dashboard");
  };

  return (
    <>
      <Navbar />
      <Login />
      <Footer />
    </>
  );
}
