import React, { use } from 'react'
import { useState } from 'react'
import { Button, Card, CardBody, Link, Tooltip, useDisclosure, Modal, ModalBody, ModalContent } from '@nextui-org/react'
import CompressedFileView from './CompressedFileView';
import { MdOutlineCompress } from "react-icons/md";

import Definition from './Definition';

export const FileView = (props) => {

  const huffman = ""
  console.log("hello" + props.dictionary);



  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState(''); // State to store file content
  const [fileAsBinary, setFileAsBinary] = useState([]);
  const [compressedFile, setCompressed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [compressions, setCompressions] = useState(0);
  

  // Handle file selection
  const handleFileChange = (e) => {
    setFileName("");
    setFile("");
    setFileContent("");
    const selectedFile = e.target.files[0];  // Get the first selected file
    if (selectedFile) {
      // Check if the file is a text file
      if (selectedFile.type === 'text/plain') {
        setFile(selectedFile);
        setFileName(selectedFile.name);  // Optionally display the file name

        // Read the file content
        const reader = new FileReader();
        reader.onload = () => {
          setFileContent(reader.result); // Store file content in state
        };
        reader.readAsText(selectedFile); // Read the file as text
      } else {
        alert("Please select a valid text file.");
      }
    } 

    console.log("uploaded file successfully!")



  };

  const asBinary = () => {
    setFileAsBinary([]);
    setCompressions(0);
    setLoading(true);
  
    // Convert fileContent to binary representation
    const binaryArray = fileContent.split("").map((char) => 
      char.charCodeAt(0).toString(2).padStart(8, '0')
    );
  
    // Update the state
    setFileAsBinary(binaryArray);
    console.log("Binary Array:", binaryArray);
  
    // Pass the binaryArray to Compress
    Compress(binaryArray);
  };
  
  const Compress = (binaryArray) => {
    setCompressed([]);
    setCompressions(0);
    const compressedArray = [];
    let count = 0;
  
    // Compress the binary data
    for (let i = 0; i < fileContent.length; i++) {
      let added = false;
  
      for (let a = 0; a < props.dictionary.length; a++) {
        // Check if the character exists in the dictionary
        if (props.dictionary[a].key === fileContent[i]) {
          compressedArray[i] = a.toString(2); // Replace with dictionary index in binary
          count++;
          added = true;
          break; // Exit loop once found
        }
      }
  
      // If not found in the dictionary, use the binary representation
      if (!added) {
        compressedArray[i] = binaryArray[i];
      }
    }
  
    console.log("Compressed Array:", compressedArray);
    setCompressed(compressedArray);
    setCompressions(count);
  
    // Finalize
    setLoading(false);
    onOpen();
  };
  
  
  


 // need to show file as binary and file as compressed.
  
  return (
    <div className="h-full flex flex-col justify-start">
      
          <Card style={{width: "100%", height:"30vh"}}>
              <CardBody style={{width: "100%", overflowX: "wrap"}}>
                  <div>
                    When reading a file, your computer has to read a continuous list of 1s and 0s and then convert them into numbers, words, and letters.
                    This is done using the ascii values. For example: ASCII code for 'A' is 65, which in binary is 01000001. However, we know that setCompressed
                    characters are used more frequently than others like: 'e', 'a', ' '. Instead of expressing these as 8 bit values, we can compress by replacing their 
                    length 8 values with lower length values. A common way of doing this is <Link isExternal="true"href='https://brilliant.org/wiki/huffman-encoding/'>Huffman Encoding.</Link>
                    
                    <p style={{fontWeight: "bold", marginTop: "2vh"}}>Now, add a couple values in the dictionary and upload a file. Let's see how much you can compress your file ! </p>
                  </div>
              </CardBody>
          </Card>
          {/* File input field restricted to text files */}
      
      <section className='flex flex-row justify-center w-full ' style={{ marginTop: "5vh"}}>
          <label className="fileupload cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400 w-full"
          >
            {(fileName == "") ? "Upload a File" : fileName}
            <input
              id="file-upload"
              type="file"
              accept=".txt"
            onChange={handleFileChange}
              className="hidden"
            />
          </label>

          
        <div>
          <Tooltip content={(props.dictionary.length == 0)? "Dictionary can't be empty!" :"Compress File"}>
            <Button className='px-6 py-3 w-full h-full' color='secondary' variant='ghost' isDisabled={props.dictionary.length == 0 || fileContent ==""} onPress={asBinary} style={{marginLeft: "2rem"}} isLoading={loading}> Compress File <MdOutlineCompress/> </Button>

          </Tooltip>
        </div> 
      <Modal isDismissable={false} style={{height: "60vh"}} scrollBehavior="inside" 
      isKeyboardDismissDisabled={true} isOpen={isOpen} onOpenChange={onOpenChange} size='5xl'>
      <ModalContent>
        {(onClose) => (
          <>
                <CompressedFileView compressions={ compressions} rawFile ={fileAsBinary} compressedFile ={compressedFile} fileName={fileName} dictionary ={props.dictionary} text ={fileContent}></CompressedFileView>
            
          </>
        )}
      </ModalContent> </Modal> 


        

      </section>
          

    </div>
  )
}
