import React, { useState, useEffect } from "react";
import "./style/home.css";
import HomeLinks from "./homeLinks";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Close from "./Close";
import Profile from "./profile";
import { getData } from "../util/LocalStorage";
function Home() {
  const [view, setView] = useState(0);
    const [isUser, setUserView] = useState(false);
    const [userData, setUserData] = useState({});
  const views = [
    <HomeLinks setView={setView} />,
    <SignIn setView={setView}  setUserView={setUserView} />,
    <SignUp setView={setView}  setUserView={setUserView} />,
  ];
  const userView = () => {
    const k = getData("token");
    if (k == null) {
      setUserView(false);
      return;
    }
    setUserView(true);
    var user = window.sessionStorage.getItem("user");
    if (!user) {
      setUserData({ username: "", age: "", email: "", dob: "", mobile: "", address: "" });
      return;
    }
    user = JSON.parse(user);
    const { username, age, email, dob, mobile, address } = user;
    setUserData({ username, age, email, dob, mobile, address});
    };
    useEffect(() => {
        userView();
    },[]);
  return (
    <div id="home">
      {view !== 0 ? <Close setView={setView} /> : ""}
          {isUser ? <Profile setView={setView} setUserView={setUserView}  userData={userData} setUserData={setUserData} /> : views[view]}
    </div>
  );
}

export default Home;
