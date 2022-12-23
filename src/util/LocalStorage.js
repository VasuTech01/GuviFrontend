export const setData = async (value,data) => {
    window.sessionStorage.setItem(value, data);
}
export const getData = (value) => {
    let token = window.sessionStorage.getItem(value);
    return token ? token : null;
}
// export const saveUserData(value){
//     let { username, age, email, dob, mobile, address } = value;
//     window.sessionStorage.
        
// } 