import React, { useEffect, useState } from 'react'
import { ModalBody, ModalHeader, ModalFooter, Tooltip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Link } from '@nextui-org/react'
import { useRef } from 'react';
export default function CompressedFileView(props) {
    const [characters, setCharacters] = useState([])


    const getCharacters = () => {
        const chars = []
       for (let a = 0; a < props.text.length; a++) {
            if (!chars.includes(props.text[a])) {
                chars.push(props.text[a])
            }
        }
        setCharacters(chars);
    }
    useEffect(() => {
        getCharacters();
      }, [props.text]); // refreshes if text changes :)

    const getOccurances = (key) => {
        const text = props.text;
        let count = 0;
        for (let a = 0; a < text.length; a++) {
          if (text[a] == key) {
            count++;
          }
          
        }
        return count;
      }
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
        {
          key: "name",
          label: "Character",
        }, {
            key: "e",
            label: "Occurances"
        },
        {
          key: "role",
          label: "Binary Rep.",
        }, {
            key: 'd',
            label:"Compressed"
        }
    ]; 
    return (
        <>
            <ModalHeader className='flex justify-center'>
                <p>File Comparison Viewer: {props.fileName }</p>
            </ModalHeader>
            <ModalHeader className='flex justify-evenly' style={{justifyContent: "space-around"}} >
                <p>Raw File</p>
                <Tooltip content={ 
                            <Table isStriped aria-label="Example table with dynamic content">
                            <TableHeader>
                                {columns.map((column) =>
                                    <TableColumn key={column.key} >{column.label} </TableColumn>
                                )}
                            </TableHeader>
                            <TableBody  >
                                {characters.map((character) =>
                                <TableRow key={character}>
                                    <TableCell>{"'"+ character +"'"}</TableCell>
                                        <TableCell>{getOccurances(character)}</TableCell>
                                        <TableCell>{character.charCodeAt(0).toString(2).padStart(8, '0')}</TableCell>
                                    <TableCell>{getCode(character).toString(2)}</TableCell>
                                </TableRow>
                                )}
                            </TableBody>
                    </Table>}>
                   <Link showAnchorIcon> Compressed File: </Link></Tooltip>
            </ModalHeader>
            <ModalBody className='flex flex-row'>
                <div id="raw file" ref={textareaRef} onScroll={syncScroll} style={{ overflowY: "scroll", width: "100%", height:"100%", padding:"10px", overflowWrap:"break-word"}}>
                    <p>
                        {(props.rawFile == []) ? "Error" : props.rawFile.join(" ")}
                    </p>
                </div>
                <div id ="compressed file" ref={divRef} onScroll={syncScroll} style={{overflowY: "scroll", width:"100%", height:"100%", padding:"10px", overflowWrap:"break-word"}}>
                    <p>
                    {(props.compressedFile == []) ? "Error" : props.compressedFile.join("")}

                    </p>
                </div>
              </ModalBody>
      </>
    
  )
}
