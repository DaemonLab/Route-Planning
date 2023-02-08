// import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from '@next/font/google'
// import styles from '../styles/Home.module.css'
// import { useEffect, useState } from 'react'
// import { Canvas } from '@react-three/fiber'
// import Box from '../../components/Box'
// const inter = Inter({ subsets: ['latin'] })

// export default function Home() {
//   const [message, setMessage] = useState("");
//   const [input, setInput] = useState("");
//   const [imagesrc, setImagesrc] = useState(" ");

//   useEffect(() => {

//     const ws = new WebSocket("ws://localhost:8000/ws");

//     ws.onmessage = function (event) {
//       const msg = event.data;
//       console.log(msg)
//       setImagesrc(msg);
//       // const arrayBuffer = event.data;

//     };
//     const btn = document.querySelector(".submit-btn");
//     btn?.addEventListener("click", () => {
//       ws.send(input);
//     })

//   }, [input])
//   return (
//     <>
//       <input type="number" onChange={(e) => setInput(e.target.value)}></input>
//       <button className='submit-btn'>Submit</button>
//       <h1>{message}</h1>
//       <Canvas className='canvas' style={{ backgroundColor: "red", height: 500 }}>
//         <ambientLight intensity={0.5}></ambientLight>
//         <Box image={imagesrc}></Box>
//       </Canvas>
//     </>
//   )
// }