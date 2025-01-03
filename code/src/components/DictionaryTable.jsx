import React from 'react'
import {Table, TableHeader, Button, TableColumn, TableBody, Tooltip, TableRow, TableCell, getKeyValue, Divider, Progress} from "@nextui-org/react";
import { useState } from 'react';
import "../Global.css"
export default function DictionaryTable(props) {
 
  
   const DeleteIcon = (props) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 20 20"
        width="1em"
        {...props}
      >
        <path
          d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
        <path
          d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
        <path
          d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
        <path
          d="M8.60834 13.75H11.3833"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
        <path
          d="M7.91669 10.4167H12.0834"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
      </svg>
    );
  };

  const update = (key) => {
    props.deleteItem(key);
  }

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
    const index = props.rows.findIndex((row) => row.key === key);
    return index !== -1 ? index : "Not Found";
  };
  

  return (
    <div className='' style={{maxHeight:"44vh", overflowY:"scroll", padding:"20px"}}>
      <Table  aria-label="Example table with dynamic content">
                    <TableHeader className='bg-blue-500' color="secondary">
                        {props.columns.map((column) =>
                            <TableColumn className='font-bold font-black' key={column.key} style={{fontSize: "1.5vh"}}>{column.label} </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody  emptyContent={"No rows to display."}>
                        {props.rows.map((row) =>
                        <TableRow key={row.key}>
                            <TableCell>{"'"+ row.value +"'"}</TableCell>
                            <TableCell>{getOccurances(row.key)}</TableCell>
                            <TableCell>{getCode(row.key).toString(2)}</TableCell>
                            <TableCell>
                              <Tooltip color="danger" content="Delete item" placement='' >
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <DeleteIcon onClick={() => update(row.key)} />
                                </span>
                              </Tooltip>
                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
    </div>
  )
}
