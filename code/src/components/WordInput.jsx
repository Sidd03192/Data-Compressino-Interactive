import { Button, Input, InputOtp} from "@nextui-org/react";
import React from "react";
import { useState } from "react";
import {Divider, Progress, Tabs, Tab} from "@nextui-org/react";
import DictionaryTable from "./DictionaryTable";
import { IoMdAdd } from "react-icons/io";
import { TextView } from "./TextView";
import { MdClear } from "react-icons/md";
import { FileView } from "./FileView";
import "../Global.css"
import { label } from "framer-motion/client";
export const DeleteIcon = (props, ) => {
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

export default function WordInput(props) {
    const columns = [
        {
          key: "name",
          label: "Value",
        },
        {
          key: "role",
          label: "Occurances",
      }, {
          key: "code",
          label: "Compressed Code"
        },
        {
            key: "delete",
            label: "Actions"
      }
    ];
    
  const [text, setText] = React.useState("You might not think that programmers are artists, but programming is an extremely creative profession. It’s logic-based creativity.” – John Romero, video game developer and programmer");
  const [dictionary, setDictionary] = React.useState([
    { key: "d", value: "d" },
    { key: "a", value: "a" }, 
    {key:"program", value:"program"}
  ]);
  const [percent, setPercent] = React.useState(10);
  const [rows, setRows] = React.useState();
  const [letter, setLetter] = React.useState("");
  const [cheat, setCheat] = useState(0);

  const clear = () => {
    setDictionary([]);
  }
  const updateDictionary = () => {
    if (letter != "") {
      if ((dictionary.length >= 10 ) ) {
        props.showAlert("You can't add more than 4 items to the dictionary in this input format. Please change input format / remove an item from the dictionary :) "); // calls update function in parent to send alert !
      
      } 
      else {
        // logic for setting count etc...
        let add = true;
        for (let i = 0; i < dictionary.length; i++) {
          if (dictionary[i].key == letter) {
            add = false;
            props.showAlert("You can't add repeats to the Dictionary!")
          }
        }
        if (add) {
          dictionary.push({
            key: letter.toLowerCase(),
            value: letter.toLowerCase(), 
          });
          let dic = dictionary;
          dic.sort((a, b) => a.length - b.length); 
          setDictionary(dic);
          setCheat(letter)
        } 
        setLetter('');
        }
    }
  }
  
  const tabs = ["Text Input", "File Input"]
  const deleteDictionaryItem = (key) => {
    console.log("attempt Delete")
    const updatedDictionary = dictionary.filter(item => item.key != key);
    setDictionary(updatedDictionary);
    console.log("deleted item:" + key)
    console.log(updatedDictionary);
  }

  

    return (
      <div className="flex justify-between  " style={{ marginTop: "2%", height:"50vh"}}>
            < div className="justify-center " style={{width: "40%", marginLeft: "5%", height: "50vh"}}>
                <h1 className="text-center" style={{ fontWeight: "bold", fontSize: "2.5vh", fontFamily: "poppins", alignContent: "center" }}>
                    Raw Compression Text  
                </h1>

               <Tabs className="">
                <Tab title="Text Input" className="h-full">
                <TextView text={text} setText={setText} dictionary={dictionary} cheat={cheat} />

                </Tab>
                <Tab title="File Input" className="h-full">
                  <FileView clearDictionary = {clear} dictionary={dictionary}></FileView>
                </Tab>
               </Tabs>
                    
            </div>

            <Divider orientation="vertical" style={{height: "40vh"}}></Divider>
            < div className="justify-center " style={{width: "40%", marginRight: "5%", marginTop: "", height: "48vh"}}>
                <h1 className="text-center" style={{ fontWeight: "bold", fontSize: "2.5vh", fontFamily: "poppins", alignContent: "center" }}>
                    Dictionary Table  
                </h1>
                <div className="h-full flex flex-col justify-between " style={{marginTop: "5vh"}}>
            <DictionaryTable columns={columns} rows={dictionary} deleteItem={deleteDictionaryItem} text={text} dictionary = {dictionary} />
                
                <div className="flex  justify-between mt-5" style={{ marginTop: "10px" }} >
                  <div className="flex flex-col w-full">
                  <Input placeholder="Add to dictionary..."  variant="bordered" style={{height:"100%"}} value={letter} onValueChange={setLetter} autoFocus/>     
                    <Button  className="w-full" isDisabled={letter.length <=0}  variant={(letter == "") ? "ghost" : "solid"} color="warning" style={{ fontSize: "1.7vh", marginTop: "5px"}} onPress={updateDictionary}>
                    Add a Letter <IoMdAdd/>
                    </Button> 
                  </div>
                    <Divider orientation="vertical" style={{marginLeft: "10px", marginRight: "10px"}}></Divider>
                    <Button className="w-3/5 h-full" variant="ghost" color="danger"  style={{marginLeft: "5px", fontSize: "1.7vh", width: "40%"}} onPress={clear}>Clear Dictionary <MdClear/></Button>
                  </div>
            </div>
        </div>
        

        
        </div>
  );
}
