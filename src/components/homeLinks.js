import React from 'react'
import HomeButton from './homeButton';
function HomeLinks(props) {
  return (
    <center id="home_center">
    <div className="home_link" onClick={()=>{props.setView(2)}}>
              <HomeButton title="Create Account" ic={1} />
    </div>
    <div className="home_link" onClick={()=>{props.setView(1)}}>
              <HomeButton title="Login User" ic={2} />
    </div>
  </center>
  )
}

export default HomeLinks;