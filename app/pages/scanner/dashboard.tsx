import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Output from "../../components/Output";
import ProductList from "../../components/ProductList";

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
