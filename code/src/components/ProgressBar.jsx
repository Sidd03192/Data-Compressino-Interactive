import React from 'react'

const ProgressBar = (props) => {
  return (
    <div>
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
  )
}

export default ProgressBar
