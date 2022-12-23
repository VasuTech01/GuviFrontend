import React, { useState } from "react";
import "./style/form.css";
import { userSignUp } from "../util/UserOps";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";
function SignUp(props) {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
    const [cfPwd, setcfPwd] = useState("");
    const validateUser=()=>{
      var isMail = validator.isEmail(userData.email);
      var matching = userData.password.length > 8 ? userData.password===(cfPwd)? true : false : false;
      return isMail && matching;
    }

  const CreatUser = async () => {
    try {
    
      if (!validateUser()) {
        throw new Error("Enter Valid Data");
      }
      const res = await userSignUp(userData);
      
        if (!res.success) {
            throw new Error(res.error);
        }
      
      const { username, age, email, dob, mobile, address } = res.data;

      window.sessionStorage.setItem("user", JSON.stringify({username, age, email, dob, mobile, address }));
      props.setView(0);
      props.setUserView(true);
    } catch (e) {
     
      toast(e.message+"🧨",{autoClose:true});
        setUserData({
            username: "",
            email: "",
            password: "",
        });
        setcfPwd("");
        // props.setView(0);
    }
  };

  return (
    <center className="form_cont">
      <div className="form_head">
        <h2>Create Your Account</h2>
      </div>
      <div className="form_body">
        <div className="form_fields">
          <input
            className="form_input"
            value={userData.username}
            onChange={(e) => {
              setUserData({ ...userData, username: e.target.value });
            }}
            type="text"
          />
          <p className="formLabels">Name</p>
        </div>
        <div className="form_fields">
          <input
            className="form_input"
            value={userData.email}
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
            type="email"
          />
          <p className="formLabels">Email</p>
        </div>
        <div className="form_fields">
          <input
            className="form_input"
            value={userData.password}
            onChange={(e) => {
              setUserData({ ...userData, password: e.target.value });
            }}
            type="text"
            minLength={8}
          />
          <p className="formLabels">Password</p>
        </div>
        <div className="form_fields">
          <input
            className="form_input"
            value={cfPwd}
            onChange={(e) => {
              setcfPwd(e.target.value);
            }}
            type="password"
            minLength={8}
          />
          <p className="formLabels">Confirm Password</p>
        </div>
      </div>
      <div className="form_foot">
        <button className="form_btn" onClick={CreatUser}>
          Sign Up
        </button>
      </div>
      <ToastContainer/>
    </center>
  );
}

export default SignUp;
