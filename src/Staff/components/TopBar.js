import React from 'react';
import { ReactComponent as ProfileIcon } from '../assets/light-mode/profilePhotoIcon.svg'; 
import { ReactComponent as MoonIcon } from '../assets/light-mode/MoonIcon.svg'; 
import '../components/TopBar.css'; 

const TopBar = ({ name }) => {
    return (
      <div className="topbar">
        <div className="right-content">
          <MoonIcon className="moon-icon" />
          <span className="dark-mode-text">DARK MODE</span>
          <div/>
          <div className="spacer" />
          <ProfileIcon className="profile-icon" />
          <span className="welcome-text">WELCOME,<br/>{name}</span>
        </div>
      </div>
    );
  };
  
  export default TopBar;


