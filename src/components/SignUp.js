import React, { useState } from "react";
import "./style/form.css";
import { userSignUp } from "../util/UserOps";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SignUp(props) {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
    const [cfPwd, setcfPwd] = useState("");
    const validateUser=()=>{
        const l = userData.password.length===cfPwd.length?userData.password.match(cfPwd)?true:false:false;
        return l;
    }

  const CreatUser = async () => {
    try {
        const res = validateUser()===true? await userSignUp(userData):{success:false,error:"Validation Error"};
        if (!res.success) {
            throw new Error(res.error);
        }
      
      const { username, age, email, dob, mobile, address } = res.data;

      window.sessionStorage.setItem("user", JSON.stringify({username, age, email, dob, mobile, address }));
      props.setView(0);
      props.setUserView(true);
    } catch (e) {
        console.log(e);
       
        setUserData({
            username: "",
            email: "",
            password: "",
        });
        setcfPwd("");
        props.setView(0);
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
    </center>
  );
}

export default SignUp;
