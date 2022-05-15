import React from 'react';
import "./LoadingBox.css"
import CircleLoader from "react-spinners/CircleLoader";


export default function LoadingBox({size,color,text}) {
  return (
    <div className="loadingBoxComp">
      <CircleLoader color={color}   size={size} className="CircleLoaderSVG" /> 
      {
             ( text==="")?
             <span className="LoadingText" hidden>{text}</span>
              :
             <span className="LoadingText">{text}</span>
        }
    </div>
  );
}


LoadingBox.defaultProps={
        size:45,
       color: "#0c8ac1",
       text:"Loading..."
}