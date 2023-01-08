import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Main } from "next/document";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Feature from "../components/Feature";


export default function Home() {
  return (
    <>
      <Navbar />
      <Feature />
      <Footer />
    </>
  );
}
