import styles from "../Styles/Employees.module.css";
import WarningIcon from "../assets/light-mode/Delete-icon.svg";

const DeleteConfirmationModal = ({ onConfirmUpdate, onCancelUpdate }) => (
  <div className={styles.deleteConfirmation}>
    <div className={styles.deleteTitle}></div>
    <div className={styles.deleteContent}>
      <div className={styles.deleteMessage}>
        <img src={WarningIcon} alt="warning-icon" />
        <p>This will mark this report as solved. Proceed?</p>
      </div>
      <div className={styles.deleteModelButtons}>
        <button onClick={onConfirmUpdate}>Confirm</button>
        <button onClick={onCancelUpdate}>No</button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmationModal;
