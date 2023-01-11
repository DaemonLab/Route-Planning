import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import Output from "../../components/Scan/Output";
import ProductList from "../../components/Scan/ProductList";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <Output />
      <ProductList />
      <Footer />
    </>
  );
}
