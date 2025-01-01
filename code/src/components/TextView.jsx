import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { Textarea, Button, Progress, Tooltip, Table } from '@nextui-org/react';
import { LiaCompressArrowsAltSolid } from "react-icons/lia";
import {TableHeader, TableColumn, TableBody,  TableRow, TableCell, getKeyValue, Divider, Tab, Tabs} from "@nextui-org/react";


export const TextView = (props) => {
  const dic = props.dictionary;
  const [total, setTotal] = useState();
  const [freqMap, setFreqMap] = useState([]);
  const [confetti, setConfetti] = useState(false);
  

  const highlightCondition = (char) => {
    char = char.toLowerCase();
    for (let a = 0; a < dic.length; a++) {
      if (dic[a].key == char) {
        return true;
      }
    }
    return false;
  }

  const columns = [
    {
      key: "name",
      label: "Number of Items",
    },
    {
      key: "role",
      label: "Max Compression",
    },
  ];

  const frequencyCharArray = () => {
    const freqMap = {};
  
    // Create a frequency map
    for (const char of props.text) {
      freqMap[char] = (freqMap[char] || 0) + 1;
    }
  
    const freqArray = Object.keys(freqMap).map((key) => ({
      key: key,
      frequency: freqMap[key],
    }));
  
    // Sort the frequency array in descending order
    freqArray.sort((a, b) => b.frequency - a.frequency);
  
    const charFrequencyArray = [];
    let totalFrequencies = 0;
  
    // Build the charFrequencyArray and only keep the first 4 values
    freqArray.slice(0, 10).forEach((item, index) => {
      totalFrequencies += item.frequency; // Cumulative frequency
      charFrequencyArray.push({ charsUsed: index + 1, totalFreq: totalFrequencies });
    });
  
    setFreqMap(charFrequencyArray);
    console.log(charFrequencyArray);
  };
  
  
  useEffect(() => {
    frequencyCharArray();
  }, [props.text])

  useEffect(() => {
    console.log("nooooway yasyfyasdyf")
    
  }, [props.dictionary])

 

  useEffect(() => {
    // Calculate the total number of highlighted characters
    console.log(props.dictionary + "dictionary")
    let count = 0;
    for (let i = 0; i < props.text.length; i++) {
      if (highlightCondition(props.text[i])) {
        count++;
      }
    }
    console.log(props.update)
    console.log(count + " count");
    let newTotal = (count / (1.0 * props.text.length) * 100)
    setTotal((isNaN(newTotal)) ? 0 : newTotal);
    console.log("updated total" + count + newTotal);
  }, [props.dictionary, props.text]);
  
  
  // scroll refs
  const textareaRef = useRef(null);
  const divRef = useRef(null);
  const syncScroll = (event) => {
    const otherElement = event.target === textareaRef.current ? divRef.current : textareaRef.current;
    otherElement.scrollTop = event.target.scrollTop;
  };
  ////////
  useEffect(() => {
    if (freqMap.length > 0 && total === freqMap[freqMap.length - 1]) {
      setConfetti(true);
    } else {
      setConfetti(false);
    }
  }, [total, freqMap]);
  return (

      <div className="h-full flex flex-col justify-between">
        
      <Textarea
                      ref={textareaRef}
                      onScroll={syncScroll}
                      style={{letterSpacing: "2px"}}
                      minRows={4}
                      maxRows={4}
                      isClearable
                      defaultValue="Include Text Here For Compression."
                      label="Text To Compress"
                      placeholder="Include Text To Compress Here !"
                      variant="bordered"
                      size="lg"
                      value={props.text}
                      onValueChange={props.setText}
                      onClear={() => console.log("textarea cleared")}
                      className="flex-grow text-medium" // Ensures the Textarea takes available space
                />

            <div className='text-center' style={{alignContent:"center"}}>
            <h1 style={{ fontWeight: "bold", fontSize: "2.5vh", fontFamily: "poppins", alignContent: "center" }}> Compressed Text:</h1>
            <p className='font-semibold'>The <span  className="rounded-md "style={{backgroundColor: "#90EE90", marginRight:"3px", padding:"2px"}}>highlighted</span>
             characters represent the characters that are coded in your dictionary.</p>

            </div>
            <div className="text text-medium mt-11"
                onScroll={syncScroll}
                ref={divRef}
                style={{ whiteSpace: 'pre-wrap', fontSize: "1.2rem", width: "100%", overflowY: 'scroll', // Hide overflowing content
                            wordWrap: 'break-word', // Handle long unbroken strings
                                overflowWrap: 'break-word', letterSpacing: "2px"
                        }}>
              
              {/* for each character, displays as object in  */}
                {props.text.split('').map((char, index) => (
                  <span className="text-sm  overscroll-contain rounded-sm "
                    
                    key={index}
                    style={{
                        backgroundColor: highlightCondition(char) ? '#90EE90' : 'transparent',
                        color: highlightCondition(char) ? 'black' : 'inherit',
                      fontSize: "medium",
                        width: "60%"

                    }}
                    >
                    {char}
                    </span>
                ))}
        </div>
        <Tooltip
  content={
                    <Table isStriped aria-label="Example table with dynamic content">
                        <TableHeader>
                            {columns.map((column) =>
                                <TableColumn key={column.key} style={{fontSize: "1.5vh"}}>{column.label} </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody  emptyContent={"No rows to display."}>
                            {freqMap.map((row) =>
                            <TableRow key={row}>
                                <TableCell>{row.charsUsed}</TableCell>
                                <TableCell>{((row.totalFreq) / (1.0 * props.text.length) * 100).toFixed(2) + "%"}</TableCell>
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
  }
>      

<Progress
    className="w-full"
    color={
      freqMap.length > 0 && 
      (freqMap[freqMap.length - 1].totalFreq * 100) / props.text.length === total
        ? "success"
        : "secondary"
    }
    style={{ marginTop: "10px" }}
    label={"Percent Compression with Dictionary"}
    maxValue={100}
    showValueLabel={true}
    size="md"
    value={total}
  />
</Tooltip>



        
            
    </div>
  )
}
