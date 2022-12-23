import React, { useState ,useEffect} from 'react';
import "./style/prof.css";
import ProfField from './profField';
import { userLogout ,userUpdate} from "../util/UserOps";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setData } from '../util/LocalStorage';

function Profile(props) {
    const [userName, setUsername] = useState(props.userData.username);
    const [useremail, setEmail] = useState(props.userData.email);
    const [userage, setAge] = useState(props.userData.age);
    const [usermobile, setMobile] = useState(props.userData.mobile);
    const [userdate, setDate] = useState(props.userData.dob);
    const [useraddress, setAddress] = useState(props.userData.address);
    const fields=[{title:"User Name",type:"text",value:userName,setValue:setUsername},{title:"Email",type:"email",value:useremail,setValue:setEmail},{title:"AGE",type:"number",value:userage,setValue:setAge},{title:"Date",type:"date",value:userdate,setValue:setDate},{title:"Mobile No",type:"number",value:usermobile,setValue:setMobile},{title:"Address",type:"textarea",value:useraddress,setValue:setAddress}]
    useEffect(() => {
        var user = window.sessionStorage.getItem("user");
        user = JSON.parse(user);
        const { username, email, age, dob, address, mobile } = user;
        userName!==username && setUsername(username)
        useremail!==email && setEmail(email);
        userage!==age && setAge(age);
        useraddress!==address && setAddress(address);
        userdate!==dob && setDate(dob);
        usermobile!==mobile && setMobile(mobile);
    },[]);
    
    const allowedUpdate = () => {
        var data = {
            username: userName,
            email: useremail,
            age: userage,
            mobile: usermobile,
            dob: userdate,
            address:useraddress
        }
        const keys = Object.keys(data);
        const allowedUpdateKeys = keys.filter(f => {
            return data[f] !== props.userData[f];
        })
        var ne = {};
         allowedUpdateKeys.forEach(f => {ne[f]=data[f]}); 
        return ne;
     }
    const updateHandle =async ()=>{
        const data = allowedUpdate();
       
        try {
            const res = await userUpdate(data);
          
            if (res.success === false) {
                throw new Error(res.error);
            }
            toast("User Updated",{autoClose:true});
            const { username, email, age, dob, address, mobile } = res.data;
            
            const user=JSON.stringify({username, age, email, dob, mobile, address })
            window.sessionStorage.setItem("user", user);
            props.setUserData({ username, email, dob, address, mobile,age });
        } catch (e) {
            toast("user Not Updated",{autoClose:true});
     }
    }
    const LogoutHandles = async () => {
        try {

            const res = await userLogout();
            if (res.success === false) {
                throw new Error(res.error);
            }

            toast("User Logout", { autoClose: true });
            props.setUserData({});
            setData("token", null);
            window.sessionStorage.setItem("user", null);
            props.setView(0);
            props.setUserView(false);
           
        } catch (e) {
            toast("Error Logging User",{autoClose:true});
            console.log(e.message);
        }
    }  
    return (
      <center className="prof_cont">
          <div className="prof_head">
              <div className="prof_logo">
                  <h2>
                      UserDetails;
                  </h2>
              </div>
              <div className="prof_lgout">
                  <button className="prof_btn" onClick={LogoutHandles}>Logout</button>
              </div>
          </div>
          <div className="prof_body">
              {fields.map((f,id) => <ProfField key={id} type={f.type} title={f.title} value={f.value} setValue={f.setValue} />)}
          </div>
          <div className="prof_foot">
              <button className="prof_btn" onClick={updateHandle}>
                  Update
              </button>  
            </div>
            <ToastContainer/>
    </center>
  )
}

export default Profile;