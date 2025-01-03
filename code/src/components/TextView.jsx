import React, { useRef, useState, useEffect } from "react";
import { Textarea, Button, Progress, Tooltip, Table } from "@nextui-org/react";
import { TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

export const TextView = (props) => {
  const dic = props.dictionary;
  const [total, setTotal] = useState();
  const [freqMap, setFreqMap] = useState([]);
  const [confetti, setConfetti] = useState(false);

  const highlightCondition = (startIdx) => {
    // Sort the dictionary by word length in descending order
    const sortedDic = [...dic].sort((a, b) => b.key.length - a.key.length);
  
    for (let word of sortedDic) {
      const substring = props.text.slice(startIdx, startIdx + word.key.length).toLowerCase();
      if (substring === word.key.toLowerCase()) {
        return word.key.length; // Return the length of the matching word
      }
    }
    return 0; // No match
  };
  
  const renderHighlightedText = () => {
    const highlightedText = [];
    let i = 0;
  
    while (i < props.text.length) {
      const matchLength = highlightCondition(i);
  
      if (matchLength > 0) {
        // Add the highlighted word
        highlightedText.push(
          <span
            key={i}
            style={{
              backgroundColor: '#90EE90',
              color: 'black',
              fontSize: 'medium',
            }}
          >
            {props.text.slice(i, i + matchLength)}
          </span>
        );
        i += matchLength; // Skip the matched word
      } else {
        // Add the unhighlighted character
        highlightedText.push(
          <span key={i} style={{ fontSize: 'medium' }}>
            {props.text[i]}
          </span>
        );
        i++;
      }
    }
  
    return highlightedText;
  };
  
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
  };

  useEffect(() => {
    frequencyCharArray();
  }, [props.text]);



  
  useEffect(() => {
    let count = 0;
    let i = 0;

    while (i < props.text.length) {
      const matchLength = highlightCondition(i);
      if (matchLength > 0) {
        count += matchLength;
        i += matchLength; // Skip the matched word
      } else {
        i++;
      }
    }

    const newTotal = (count / (1.0 * props.text.length)) * 100;
    setTotal(isNaN(newTotal) ? 0 : newTotal);

  }, [props.dictionary, props.text]);

  const textareaRef = useRef(null);
  const divRef = useRef(null);

  const syncScroll = (event) => {
    const otherElement = event.target === textareaRef.current ? divRef.current : textareaRef.current;
    otherElement.scrollTop = event.target.scrollTop;
  };

  useEffect(() => {
    if (freqMap.length > 0 && total === freqMap[freqMap.length - 1]) {
      setConfetti(true);
    } else {
      setConfetti(false);
    }
  }, [total, freqMap]);

  let highlightedText = [];
  for (let i = 0; i < props.text.length; ) {
    const matchLength = highlightCondition(i);

    if (matchLength > 0) {
      const word = props.text.slice(i, i + matchLength);

      highlightedText.push(
        <span
          key={i}
          style={{
            backgroundColor: "#90EE90",
            color: "black",
            fontSize: "medium",
          }}
        >
          {word}
        </span>
      );

      i += matchLength; // Skip over the matched word
    } else {
      highlightedText.push(<span key={i}>{props.text[i]}</span>);
      i++;
    }
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <Textarea
        ref={textareaRef}
        onScroll={syncScroll}
        style={{ letterSpacing: "2px" }}
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

      <div className="text-center" style={{ alignContent: "center" }}>
        <h1 style={{ fontWeight: "bold", fontSize: "2.5vh", fontFamily: "poppins", alignContent: "center" }}>
          Compressed Text:
        </h1>
        <p className="font-semibold">
          The{" "}
          <span
            className="rounded-md"
            style={{ backgroundColor: "#90EE90", marginRight: "3px", padding: "2px" }}
          >
            highlighted
          </span>
          characters represent the characters that are coded in your dictionary.
        </p>
      </div>

      <div
        className="text text-medium mt-11"
        onScroll={syncScroll}
        ref={divRef}
        style={{ whiteSpace: 'pre-wrap', fontSize: "1.2rem", width: "100%", overflowY: 'scroll', // Hide overflowing content
          wordWrap: 'break-word', // Handle long unbroken strings
              overflowWrap: 'break-word', letterSpacing: "2px"
      }}>
      
        {renderHighlightedText()}
      </div>

      <Tooltip
        content={ "When the text is at max compression with 10 dictionary elements, this bar will become green!"
          
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
  );
};
