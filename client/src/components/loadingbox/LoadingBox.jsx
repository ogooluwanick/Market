import React from 'react';
import "./LoadingBox.css"
import CircleLoader from "react-spinners/CircleLoader";


export default function LoadingBox() {
  return (
    <div className="loadingBoxComp">
      <CircleLoader color={"#0c8ac1"}   size={45} className="CircleLoaderSVG" /> 
      <span className="LoadingText">Loading...</span> 
    </div>
  );
}