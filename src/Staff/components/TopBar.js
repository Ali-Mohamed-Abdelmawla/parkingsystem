import React from 'react';
import { ReactComponent as ProfileIcon } from '../assets/light-mode/profilePhotoIcon.svg'; 
import { ReactComponent as MoonIcon } from '../assets/light-mode/MoonIcon.svg'; 
import styles from '../components/TopBar.module.css'; 

const TopBar = ({ name }) => {
  return (
    <div className={styles.topbar}>
      <div className={styles['right-content']}>
        <MoonIcon className={styles['moon-icon']} />
        <span className={styles['dark-mode-text']}>DARK MODE</span>
        <div/>
        <div className={styles.spacer} />
        <ProfileIcon className={styles['profile-icon']} />
        <span className={styles['welcome-text']}>WELCOME,<br/>{name}</span>
      </div>
    </div>
  );
};
  
export default TopBar;
