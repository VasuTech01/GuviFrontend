import React, { useState } from "react";
import { BsXOctagon, BsXOctagonFill } from "react-icons/bs";
import "./style/home.css";

function Close(props) {
  const [fill, setFill] = useState(0);
  return (
    <div
      className="close_btn"
      onMouseEnter={() => {
        setFill(1);
      }}
      onMouseLeave={() => {
        setFill(0);
          }}
          onClick={() => {
              props.setView(0);
          }}
    >
      {fill == 0 ? <BsXOctagon /> : <BsXOctagonFill />}
    </div>
  );
}

export default Close;
