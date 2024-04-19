import React from 'react';
import styles from '../Styles/Employees.module.css'
import WarningIcon from '../assets/light-mode/Delete-icon.svg';

const DeleteConfirmationModal = ({ onConfirmUpdate, onCancelUpdate }) => (
  <div className={styles.deleteConfirmation}>
    <div className={styles.deleteTitle}></div>
    <div className={styles.deleteContent}>
      <img src={WarningIcon} alt="warning-icon" />
      <p>Are you sure to delete this report?</p>
      <button onClick={onConfirmUpdate}>Confirm</button>
      <button onClick={onCancelUpdate}>No</button>
    </div>
  </div>
);

export default DeleteConfirmationModal;