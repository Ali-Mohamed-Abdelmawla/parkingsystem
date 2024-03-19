import React from 'react';
import { ReactComponent as ProfileIcon } from '../assets/LightMode/profilePhotoIcon.svg';  
import {ReactComponent as MoonIcon} from '../assets/LightMode/moon-icon.svg';
import '../Component/navbar.css'; 

const NavBar = ({ name }) => {
return (
    <div className="navbar">
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

export default NavBar;
