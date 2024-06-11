import React from 'react';
import styles from '../styles/Employees.module.css'
import WarningIcon from '../assets/Delete-icon.svg';

const DeleteConfirmationModal = ({ onConfirmDelete, onCancelDelete }) => (
  <div className={styles.deleteConfirmation}>
    <div className={styles.deleteTitle}></div>
    <div className={styles.deleteContent}>
      <img src={WarningIcon} alt="warning-icon" />
      <p>Set this complaint as solved?</p>
      <button onClick={onConfirmDelete}>Confirm</button>
      <button onClick={onCancelDelete}>No</button>
    </div>
    
  </div>
);

export default DeleteConfirmationModal;