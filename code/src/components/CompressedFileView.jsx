import React, { useEffect, useState, useRef } from 'react';
import { ModalBody, ModalHeader, Tooltip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Link } from '@nextui-org/react';
import { colors } from '@nextui-org/react';
import "../Global.css"
export default function CompressedFileView(props) {
  const [characters, setCharacters] = useState([]);
  const colors = [
    "#FFCDD2", // Light Red
    "#C8E6C9", // Light Green
    "#BBDEFB", // Light Blue
    "#FFE0B2", // Light Orange
    "#D1C4E9", // Light Purple
    "#FFEB3B", // Yellow
    "#B2DFDB", // Teal
    "#F8BBD0", // Pink
  ];
  const getCharacters = () => {
    const chars = new Set();
  
    // Add all dictionary entries to the Set
    props.dictionary.forEach((entry) => {
      chars.add(entry.key);
    });
  
    // Helper function to check if a character is covered by any dictionary entry
    const isCoveredByDictionary = (char) => {
      for (const value of chars) {
        if (value.includes(char)) {
          return true;
        }
      }
      return false;
    };
  
    // Add remaining individual characters not covered by the dictionary
    for (let a = 0; a < props.text.length; a++) {
      const char = props.text[a];
      if (!isCoveredByDictionary(char)) {
        chars.add(char);
      }
    }
  
    // Convert the Set to an array and set state
    setCharacters(Array.from(chars));
  };
  
    
  useEffect(() => {
    getCharacters();
  }, [props.text, props.dictionary]); // Refreshes if text or dictionary changes

  const getOccurances = (key) => {
    return props.text.split('').filter((char) => char === key).length;
  };

  const getCode = (key) => {
    const index = props.dictionary.findIndex((row) => row.key === key);
    return index !== -1 ? index : "-";
  };

  const textareaRef = useRef(null);
  const divRef = useRef(null);

  const syncScroll = (event) => {
    const otherElement = event.target === textareaRef.current ? divRef.current : textareaRef.current;
    otherElement.scrollTop = event.target.scrollTop;
  };

  const columns = [
    { key: "name", label: "Character" },
    { key: "e", label: "Occurrences" },
    { key: "role", label: "Binary Representation" },
    { key: "d", label: "Compressed" },
  ];
  const renderHighlightedText = (dataArray) => {
    return dataArray.map((element, index) => (
      <span
        key={index}
        style={{
          backgroundColor: colors[index % colors.length],
          padding: "2px 4px",
          borderRadius: "4px",
          margin: "1px",
          display: "inline-block",
        }}
      >
        {element}
      </span>
    ));
  };
  return (
    <>
      <ModalHeader className="flex justify-center z-1000" >
        <p>File Comparison Viewer: {props.fileName}</p>
      </ModalHeader>
      <ModalHeader className="flex justify-evenly" style={{ justifyContent: "space-around"  }}>
        <p>Raw File</p>
        <Tooltip style={{ paddingTop: "30px", }}
          content={
            <div className='ss' style={{ paddingTop: "8px", maxHeight:"60vh", overflowY:"scroll"}} >

          
            <Table removeWrapper style={{overflow:"scroll"}} className='max-h-[100px]' aria-label="Character Information Table" classNames={{
        base: "max-h-[100px] overflow-scroll",
        table: "min-h-[99px]",
      }}>
              <TableHeader>
                {columns.map((column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {characters.map((character) => (
                  <TableRow key={character}>
                    <TableCell>{"'" + character + "'"}</TableCell>
                    <TableCell>{getOccurances(character)}</TableCell>
                    <TableCell>{character.charCodeAt(0).toString(2).padStart(8, '0')}</TableCell>
                    <TableCell>{getCode(character).toString(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              </Table>
              </div>
          }
        >
          <Link showAnchorIcon>Compressed File:</Link>
        </Tooltip>
      </ModalHeader>
      <ModalBody className="flex flex-row">
      <div
  id="raw-file"
  ref={textareaRef}
  onScroll={syncScroll}
  style={{
    overflowY: "scroll",
    width: "100%",
    height: "100%",
    padding: "10px",
    overflowWrap: "break-word", // Existing: Ensures breaking of words when needed
    wordBreak: "break-word", // Added: Breaks long sequences like 0s and 1s
    whiteSpace: "pre-wrap", // Optional: Preserves spacing but still allows breaking
    zIndex: "200",
  }}
>
  <p>{props.rawFile.length > 0 ? renderHighlightedText(props.rawFile) : "Error"}</p>
</div>

            <div
                id="compressed-file"
                ref={divRef}
                onScroll={syncScroll}
                style={{
                overflowY: "scroll",
                width: "100%",
                height: "100%",
                padding: "10px",
                overflowWrap: "break-word",
                }}
            >
                <p>
                {props.compressedFile.length > 0
                    ? renderHighlightedText(props.compressedFile)
                    : "Error"}
                </p>
            </div>
            </ModalBody>
    </>
  );
}
