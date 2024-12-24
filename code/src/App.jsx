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
      
      <div>
        <Nav showAlert={showAlert} text={alert} updateTheme={updateDark} theme={ dark} />
      

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Dictionary style={{height: "screen", overflow: "hidden"}} handleAction={handleAction} theme={dark}  />
} />
            
      </Routes>
      </div>

    </NextUIProvider>
      
  );
}

export default App;
