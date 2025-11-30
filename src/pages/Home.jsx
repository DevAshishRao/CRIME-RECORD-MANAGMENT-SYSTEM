import React, { useEffect } from "react";

// Components
import Navbar from "../components/Navbar";
import Block from "../components/Block";
import About from "../components/About";
import Core from '../components/Core'
import Ready from '../components/Ready'
import Footer from '../components/Footer'

export default function Home() {

  useEffect(() => {
    document.title = "Home - Crime Record Management";
  }, []);

  return (
    <>
      <Navbar />
      <Block />
      <About />
      <Core />
      <Ready />
      <Footer />
    </>
  );
}
