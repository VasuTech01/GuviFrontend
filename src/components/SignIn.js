import React, { useState} from 'react';
import "./style/form.css";
import { userSignIn } from '../util/UserOps';
import { getData,setData } from '../util/LocalStorage';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SignIn(props) {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const validateUserData = () => {
        return userData.email.length > 0 ? userData.password.length >=8 ? true : false : false;
   }
    const SignUserin =async () => {
        
        try {
            console.log(userData);
          
            const res = validateUserData() === true ? await userSignIn(userData) : { success: false, error: "check Entered Data" };
            console.log(res);
            if (res.success === false) {
                throw new Error(res.error);
            }
           
            const { username, age, email, dob, mobile, address } = res.data;
            window.sessionStorage.setItem("user", JSON.stringify({username, age, email, dob, mobile, address }));
            props.setView(0);
            props.setUserView(true);
        }catch (e) {
            console.log(e);
           
            setUserData({
                email: "",
                password: "",
            });  
            
        }
  }

  return (
    <center className="form_cont">
          <div className="form_head"  style={{height:"10%"}}>
              <h2>User Login</h2>
              {userData.email}
              {userData.password}
          </div>
          <div className="form_body" style={{height:"60%"}}>
              <div className="form_fields">
                  <input className="form_input" value={userData.email} onChange={(e) => {
                      setUserData({...userData,email:e.target.value})
              }} type="email"/> 
              <p className="formLabels">Email</p>
              </div>
              <div className="form_fields">
              <input className="form_input" value={userData.password} onChange={(e) => {
                      setUserData({...userData,password:e.target.value})
              }} type="password" /> 
              <p className="formLabels">Password</p>
              </div>
          </div>
          <div className="form_foot" onClick={SignUserin}>
              <button className="form_btn">Sign In</button>
          </div>
          <ToastContainer/>
     </center>
  )
}

export default SignIn