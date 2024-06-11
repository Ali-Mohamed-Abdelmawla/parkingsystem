import Employeestyle from "../../System-admin/Styles/Employees.module.css";
import WarningIcon from "../assets/LightMode/Delete-icon.svg";
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from "@mui/lab/LoadingButton";

function EmployeesDeleteConfirmation({
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
          <p>Are you sure you want to delete this employee? </p>
        </div>
        <div className={Employeestyle.deleteModelButtons}>
          {/* <LoadingButton
              endIcon={<DeleteIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              onClick={handleConfirmDelete}
              style={{ boxShadow: "none", fontSize: "12px" }}
            >
              <span>Confirm</span>
            </LoadingButton> */}
            <button onClick={handleConfirmDelete}>Confirm</button>
          <button onClick={handleCancelDelete}>No</button>
        </div>
      </div>
    </div>
  );
}

export default EmployeesDeleteConfirmation;
