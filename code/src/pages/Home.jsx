import React from 'react'
import "../Global.css"
import { useState } from 'react';
export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
  <>
  
 <div 
      className='w-full flex text-center justify-center items-center' 
      style={{ height: "93vh", flexDirection: "column" }} // Added vertical alignment styles
      >
        <div>
      <input type="file" onChange={handleFileChange} />
    </div>
      <section className="w-full text-center">
        <span 
          style={{ fontSize: "14vh", fontWeight: "bold" }} 
          className="relative z-20 bg-clip-text text-transparent green_blue_gradient"
        >
          Mr. Watson
          </span>
        <p 
          className="desc font-poppins text-[3vh]" 
          style={{ fontSize: "3vh"}}
        >
          I'm The Coolest 😎
        </p>
      </section>
    </div> 
  </>    

  
      

      


  )




    
  
}
