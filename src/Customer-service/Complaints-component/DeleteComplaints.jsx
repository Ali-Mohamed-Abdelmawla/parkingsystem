import WarningIcon from '../assets/Delete-icon.svg';
import styles from "../../System-admin/Styles/Employees.module.css";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckIcon from '@mui/icons-material/Check';
const DeleteConfirmationModal = ({ onConfirmDelete, onCancelDelete,loading }) => (
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
            onClick={onConfirmDelete}
          >
            <span>Confirm</span>
          </LoadingButton>
        <button onClick={onCancelDelete}>No</button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmationModal;