import React from 'react';
import { BsFillPersonPlusFill, BsPersonCircle } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomeButton(props) {
     
  return (
      <div className="homeButton"  onClick={()=>{toast.info("hi  there 🙏",{
        position: "bottom-right",
          autoClose: true
      })
      }} >
          <div style={{fontSize:"3rem"}}>
              {props.ic===1?<BsFillPersonPlusFill />:<BsPersonCircle/>}
          </div>
          <h2>
            {props.title}
          </h2>  
          <ToastContainer  />
    </div>
  )
}

export default HomeButton;