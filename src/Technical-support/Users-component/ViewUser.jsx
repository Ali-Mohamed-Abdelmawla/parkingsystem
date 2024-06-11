import Employeestyle from "../../System-admin/Styles/Employees.module.css";

function UsersViewModal({ employee, handleCloseView }) {
  if (!employee) {
    console.log("Employee not found", employee);
    return null; // or render a loading state, an error message, etc.
  }
  return (
    <div className={Employeestyle.viewModal}>
      <div className={Employeestyle.viewTitle}></div>
      <h2>{employee.FullName}'s Details</h2>
      <hr style={{ width: "300px", margin: "0 auto 15px" }}></hr>
      <div className={Employeestyle.modalContent}>
        <div className={Employeestyle.name}>
          <span className={Employeestyle.block}>
            <b>Full Name: </b>{" "}
            <span className={Employeestyle.data}>{employee.FullName}</span>
          </span>
          <br />
          <span className={Employeestyle.block}>
            <b>Username: </b>{" "}
            <span className={Employeestyle.data}>{employee.UserName}</span>
          </span>
          <br />
          <span className={Employeestyle.block}>
            <b>NationalId: </b>{" "}
            <span className={Employeestyle.data}>{employee.NationalId}</span>
          </span>
          <br />
          <span className={Employeestyle.block}>
            <b>Email Address: </b>{" "}
            <span className={Employeestyle.data}>{employee.Email}</span>
          </span>
          <br />
          <span className={Employeestyle.block}>
            <b>Role: </b>{" "}
            <span className={Employeestyle.data}>{employee.Role}</span>
          </span>
          <br />
          <span className={Employeestyle.block}>
            <b>PhoneNumber: </b>{" "}
            <span className={Employeestyle.data}>{employee.PhoneNumber}</span>
          </span>
          <br />
          <span className={Employeestyle.block}>
            <b>GarageId: </b>{" "}
            <span className={Employeestyle.data}>{employee.GarageId}</span>
          </span>
          {/* Details */}
          <div className={Employeestyle.editModelButtons}>
            <button
              className={Employeestyle.viewButton}
              onClick={handleCloseView}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersViewModal;
