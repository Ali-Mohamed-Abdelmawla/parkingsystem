import React from 'react';
import styles from './Sidebar.module.css';

function MenuItem({ icon, text, onClick }) {
  return (
    <div className={styles['menu-item']} onClick={onClick}>
      {icon}
      <p>{text}</p>
    </div>
  );
}

export default MenuItem;
