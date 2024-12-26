import React from 'react'
import "../Global.css"
 
export default function Home() {
  return (
  <>
  
 <div 
      className='w-full flex text-center justify-center items-center' 
      style={{ height: "93vh", flexDirection: "column" }} // Added vertical alignment styles
      >

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
