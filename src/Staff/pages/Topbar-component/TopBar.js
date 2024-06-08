import React, { useState } from 'react';
import { ReactComponent as ProfileIconLight } from '../../assets/light-mode/profilePhotoIcon.svg'; 
import { ReactComponent as ProfileIconDark } from '../../assets/Dark-mode/profilePhotoIcon.svg'; 
import { ReactComponent as MoonIcon } from '../../assets/light-mode/MoonIcon.svg'; 
import { ReactComponent as SunIcon } from '../../assets/Dark-mode/sunIcon.svg'; 
import styles from './TopBar.module.css'; 

const TopBar = ({ name, darkMode, toggleDarkMode }) => {
  return (
    <div className={`${styles.topbar} ${darkMode ? styles['dark-mode'] : styles['light-mode']}`}>
      <div className={styles['right-content']}>
        {darkMode ? (
          <SunIcon className={styles['moon-icon']} onClick={toggleDarkMode} />
        ) : (
          <MoonIcon className={styles['moon-icon']} onClick={toggleDarkMode} />
        )}
        <span className={styles['dark-mode-text']} onClick={toggleDarkMode}>
          {darkMode ? 'LIGHT MODE' : 'DARK MODE'}
        </span>
        <div />
        <div className={styles.spacer} />
        <div className={styles['profile-icon']}>
          {darkMode ? <ProfileIconDark /> : <ProfileIconLight />}
        </div>
        <span className={styles['welcome-text']}>WELCOME,<br/>{name}</span>
      </div>
    </div>
  );
};
  
export default TopBar;
