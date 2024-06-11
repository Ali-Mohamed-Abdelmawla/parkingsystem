import styles from "../../System-admin/Styles/Employees.module.css";
import WarningIcon from "../assets/LightMode/Delete-icon.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
const DeleteConfirmationModal = ({
  onConfirmUpdate,
  onCancelUpdate,
  loading,
}) => (
  
  <div className={styles.deleteConfirmation}>
    <div className={styles.deleteTitle}></div>
    <div className={styles.deleteContent}>
      <div className={styles.deleteMessage}>
        <img src={WarningIcon} alt="warning-icon" />
        <p>This will mark this report as solved. Proceed?</p>
      </div>
      <div className={styles.deleteModelButtons}>
        <LoadingButton
          endIcon={<DeleteIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          onClick={onConfirmUpdate}
          style={{ boxShadow: "none", fontSize: "12px" }}
        >
          <span>Confirm</span>
        </LoadingButton>
        <button onClick={onCancelUpdate}>No</button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmationModal;
