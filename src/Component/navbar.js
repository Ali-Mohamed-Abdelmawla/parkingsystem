import React from 'react';
import { ReactComponent as ProfileIcon } from '../assets/LightMode/profile-Photo-Icon.svg';  
import { ReactComponent as MoonIcon } from '../assets/LightMode/moon-icon.svg';
import { ReactComponent as LightIcon} from '../assets/DarkMode/light-mode.svg';
import { ReactComponent as ProfileDark} from '../assets/DarkMode/profile-icon.svg';
import styles from './navbar.module.css';

const NavBar = ({ name, isDarkMode, handleDarkModeToggle }) => {
    return (
        <div className={`${styles.navbar} ${isDarkMode ? styles['dark-mode'] : ''}`}>
            <div className={styles['right-content']}>
                {isDarkMode ? (
                    <LightIcon className={styles['moon-icon']} onClick={handleDarkModeToggle} />
                ) : (
                    <MoonIcon className={styles['moon-icon']} onClick={handleDarkModeToggle} />
                )}
                <span className={`${styles['mode-text']} ${isDarkMode ? styles['dark-mode-text'] : ''}`} onClick={handleDarkModeToggle}>
                    {isDarkMode ? 'LIGHT MODE' : 'DARK MODE'}
                </span>
                <div className={styles.welcome}>
                    <div className={styles['profile-icon']}>
                        {isDarkMode ? <ProfileDark className={styles['profile-icon']} /> : <ProfileIcon className={styles['profile-icon']} />}
                    </div>
                    <span className={`${styles['welcome-text']} ${isDarkMode ? styles['dark-mode-text'] : ''}`}>WELCOME,<br/>{name}</span>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
