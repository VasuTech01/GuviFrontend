import { setData, getData } from "./LocalStorage";
import axios from "axios";
const url = "http://localhost:5000/";
export const userSignUp = async (userData) => {
  return new Promise(async (resolve, rej) => {
    try {
      const res = await axios(url + "user/signup", {
        method: "post",
        data: {
          ...userData,
        },
        responseType: "json",
      });
      console.log(res);
      if (!res) {
        throw new Error();
      }
      setData("token", res.data.token);
      resolve({ success: true, data: res.data.user });
    } catch (e) {
      rej({ success: false, error: e.message });
    }
  });
};
export const userSignIn = async (userData) => {
  return new Promise(async (resolve, reject) => {
    console.log(userData);
    try {
      const res = await axios(url + "user/login", {
        method: "post",
        data: {
          ...userData,
        },
        responseType: "json",
      });
      console.log(res);
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      setData("token", res.data.token);
      resolve({ success: true, data: res.data.user });
    } catch (e) {
      reject({ success: false, error: e.message });
    }
  });
};

export const userLogout = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios(url + "user/logout", {
        method: "post",
        headers: {
          Authorization: "Bearer " + getData("token"),
          },
        responseType: "json"
      });
      if (res.status!==200) {
        throw new Error("unable to logout");
      }
      setData("token", null);    
      resolve({ success: true, data: "User Loged Out" });
    } catch (e) {
      console.log(e.message);
      reject({ success: false, error: e.message });
    }
  });
};

export const userUpdate = async (userData) => {
   return new Promise(async (resolve, reject) => {
        try {
            const res = await axios(url + "user/me", {
                method: "patch",
                headers: {
                    "Authorization": "Bearer " + getData("token"),
                },
                data: {
                  ...userData  
                },
                responseType:"json",
            })
            console.log("updated", res);
            if (res.status!==200) {
                throw new Error("User Not Updated");
            }
            console.log(res);
            resolve({ success: true, data: res.data.user });
        } catch (e) {
            console.log(e);
            reject({ success: false, error: e.message });
        }
    })
}