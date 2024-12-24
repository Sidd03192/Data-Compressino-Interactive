import React from 'react'
import Definition from '../components/Definition';
import WordInput from '../components/WordInput';
import { Alert } from '@nextui-org/react';
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import "../Global.css"
export default function Dictionary({ handleAction, theme }) {
  // call backk method for alert !
  const update = (inputText) => {
    handleAction(inputText)
  };

    const def = "Lossless compression is a type of data compression that allows the original data to be" 
     + " perfectly reconstructed from the compressed data without any loss of information. Examples iclude bmp files and jpg files";
    const def2 = "Dictionary compression is a data compression technique that replaces repeated patterns or sequences of data with shorter representations, referencing entries in a dictionary. The dictionary serves as a lookup table that maps frequently occurring data patterns (e.g., words, substrings, or sequences) to shorter codes or indices."
    const instructions = "This interactive demonstrates the concept of using a dictionary to compress text. Using the input box below, enter a message. Then try and build a dictionary that compresses the text by the greatest ammount. How efficient is your dictionary? Are you compressing one character per dictionary entry, or many? What happens if you add additional text to your message, does your dictionary still compress all of the text"
  return (
      <div className='h-screen maind'>
      <div className="justify-center" >
        <section id='description'>
              <div className='text-center text-9xl font-extrabold'>
                <h1 className="flex justify-center" style={{fontWeight: "bold", fontSize:"4.5vh", fontFamily: "poppins",alignContent: "center" }}>
              <Definition theme={ theme} def={def2} word ={"DictionaryCompression"} placement={"bottom"} title={"Dictionary Compression"}></Definition>
              <Definition theme={ theme} def={def} word ={"(Lossless)"} placement={"right-end"} title={"Lossless Compression"}></Definition>    
                </h1>
              </div>
              <div className="text-center flex justify-center items-center" style={{ width: "60%", height: "100%", margin: "0 auto" }}>
                <p style={{ fontSize: "1.25rem" }}>
                    {instructions}
                </p>
              </div>
        </section>
            
        <WordInput showAlert={update} />
    </div>
      </div>
       
  )
}
