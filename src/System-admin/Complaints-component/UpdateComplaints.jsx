import styles from "../Styles/Employees.module.css";
import WarningIcon from "../assets/light-mode/Delete-icon.svg";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckIcon from '@mui/icons-material/Check';
const DeleteConfirmationModal = ({ onConfirmUpdate, onCancelUpdate,loading }) => (
  <div className={styles.deleteConfirmation}>
    <div className={styles.deleteTitle}></div>
    <div className={styles.deleteContent}>
      <div className={styles.deleteMessage}>
        <img src={WarningIcon} alt="warning-icon" />
        <p>This will mark this report as solved. Proceed?</p>
      </div>
      <div className={styles.deleteModelButtons}>
        <LoadingButton
            endIcon={<CheckIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
            onClick={onConfirmUpdate}
          >
            <span>Confirm</span>
          </LoadingButton>
        <button onClick={onCancelUpdate}>No</button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmationModal;
