import React, { useEffect, useState } from "react";
import "../styles/MenuBar.css"; 

const MenuBar = () => {

  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 100){
        setIsShown(true)
      }else{
        setIsShown(false)
      }
    })
    return () => {
      window.removeEventListener("scroll",null)
    }
  },[])

  return (
    <div className="MenuBar-container" style={{background: isShown && "black"}}>
      <img
        src="/images/Logonetflix.png"
        alt="Netflix logo"
        className="MenuBar-logo"
      />
      <img
        src="/images/Netflix-avatar.png"
        alt="Netflix profile image"
        className="MenuBar-avatar"
      />
    </div>
  );
};

export default MenuBar;
