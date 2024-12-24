import React from 'react';
import { Image } from '@nextui-org/react';
export default function LogoCard() {
  return (
    <div className=" shadow-md border-2 rounded-lg flex items-center justify-center bg-white" style={{width: "10%" , height:"100%"}}>
        <Image 
            width="70px" 
            src={require('./Navlogo.jpg')} 
              alt="Logo" 
            style={{paddingTop: "5px", paddingBottom: "3px",}}
        />
  
    </div>

  );
}
