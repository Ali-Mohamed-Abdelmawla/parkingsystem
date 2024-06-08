import WarningIcon from '../assets/Delete-icon.svg';
import styles from "../../System-admin/Styles/Employees.module.css";

const DeleteConfirmationModal = ({ onConfirmDelete, onCancelDelete }) => (
  <div className={styles.deleteConfirmation}>
    <div className={styles.deleteTitle}></div>
    <div className={styles.deleteContent}>
      <div className={styles.deleteMessage}>
        <img src={WarningIcon} alt="warning-icon" />
        <p>This will mark this report as solved. Proceed?</p>
      </div>
      <div className={styles.deleteModelButtons}>
        <button onClick={onConfirmDelete}>Confirm</button>
        <button onClick={onCancelDelete}>No</button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmationModal;