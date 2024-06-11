import Employeestyle from "../../System-admin/Styles/Employees.module.css";
import WarningIcon from "../assets/LightMode/Delete-icon.svg";

function EmployeesDeleteConfirmation({
  handleCancelDelete,
  handleConfirmDelete,
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
          <button onClick={handleConfirmDelete}>Confirm</button>
          <button onClick={handleCancelDelete}>No</button>
        </div>
      </div>
    </div>
  );
}

export default EmployeesDeleteConfirmation;