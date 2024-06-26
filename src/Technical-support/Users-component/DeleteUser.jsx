import WarningIcon from "../assets/LightMode/Delete-icon.svg";
import Employeestyle from "../../System-admin/Styles/Employees.module.css";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
function UsersDeleteConfirmation({
  handleCancelDelete,
  handleConfirmDelete,
  loading
}) {
  return (
    <div className={Employeestyle.deleteConfirmation}>
      <div className={Employeestyle.deleteTitle}></div>
      <div className={Employeestyle.deleteContent}>
        <div className={Employeestyle.deleteMessage}>
          <img src={WarningIcon} alt="warning-icon" />
          <p>Are you sure you want to delete this user? </p>
        </div>
        <div className={Employeestyle.deleteModelButtons}>
          {/* <button onClick={handleConfirmDelete}>Confirm</button> */}
          <LoadingButton
            endIcon={<DeleteIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
            onClick={handleConfirmDelete}
          >
            <span>Confirm</span>
          </LoadingButton>
          <button onClick={handleCancelDelete}>No</button>
        </div>
      </div>
    </div>
  );
}

export default UsersDeleteConfirmation;
