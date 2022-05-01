import React from 'react';
import "./LoadingBox.css"
import CircleLoader from "react-spinners/CircleLoader";


export default function LoadingBox({size,color}) {
  return (
    <div className="loadingBoxComp">
      <CircleLoader color={color}   size={size} className="CircleLoaderSVG" /> 
      <span className="LoadingText">Loading...</span> 
    </div>
  );
}


LoadingBox.defaultProps={
        size:45,
       color: "#0c8ac1"
}