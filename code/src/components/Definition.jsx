import React from 'react'
import { memo } from 'react';
import { Tooltip, Link } from '@nextui-org/react';

export default function Definition(props) {
  return (
    <div>
      <Tooltip className= {props.theme ? "dark text-foreground bg-background capitalize" : "capitalize"} placement={props.placement} offset={15} showArrow 
            content={
            <div className="px-1 py-2 pb-2.5 mb-2.5">
                <div className="text-xl font-extrabold" style={{fontWeight:"bold"}}>{props.title}</div>
                <div className="" style={{maxWidth: "250px"}}>{props.def}</div>
            </div>
            } size='lg' >
              <Link color={"secondary"} isBlock showAnchorIcon style={{paddingLeft: "10px", fontWeight: "bold", fontSize:"4.5vh", fontFamily: "poppins"}}> {props.word}
            </Link>   
            
          </Tooltip> 
        
          <div>
              
        </div>
          
    </div>
  )
}
