import logo from './logo.svg';
import './Global.css';
import {NextUIProvider} from "@nextui-org/react";
import Nav from './components/Nav';
import LogoCard from './components/logoCard';
import Dictionary from './pages/Dictionary';
import { Alert } from '@nextui-org/react';
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import { MdHeight } from 'react-icons/md';
function App() {
  // alert code 

  const [dark, setDark] = useState(false);


  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
  const [alert, setAlert] = useState();
  const handleAction = (alertText) => {
    setAlert(alertText)
    console.log(alertText);
    setShowAlert(true); // Show the alert
    setTimeout(() => {
      setShowAlert(false); // Hide the alert after 3 seconds
    }, 3000); // Adjust the timeout as needed
  };

  const updateDark = () => {
    setDark(!dark);
  }



  return (
    <NextUIProvider className={(dark) ? 'dark text-foreground bg-background' : ""}>
              <Nav showAlert={showAlert} text={alert} updateTheme={updateDark} theme={ dark} />

      <div className=' flex flex-row justify-center  items-center'>
        {/* Alert section */}
        <div
  className="absolute z-100 flex justify-center"
  style={{
    width: "100%",
    height: "100%", // Makes it cover the entire parent height
    top: 0,        // Ensure it aligns to the top of the screen
    left: 0,       // Ensure it aligns to the left of the screen
  }}
>
  <AnimatePresence>
    {showAlert && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        style={{
          zIndex: "200",
          marginTop: "10px",
          position: "absolute",
          width: "auto", // Ensure alert doesn't stretch across full width
        }}
      >
        <Alert className="h-36" color="danger" title={alert} />
      </motion.div>
    )}
  </AnimatePresence>
</div>
      

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compressioninteractive" element={<Dictionary style={{height: "screen", overflow: "hidden"}} handleAction={handleAction} theme={dark}  />
} />
            
      </Routes>
      </div>

    </NextUIProvider>
      
  );
}

export default App;
