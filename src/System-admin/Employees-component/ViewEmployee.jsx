import Employeestyle from "../Styles/Employees.module.css";

function EmployeesViewModal({ employee, handleCloseView }) {
  if (!employee) {
    console.log("Employee not found", employee);
    return null; // or render a loading state, an error message, etc.
  }
  return (
    <div className={Employeestyle.viewModal}>
      <div className={Employeestyle.viewTitle}></div>
      <h2>{employee.Name}'s Details</h2>
      <hr style={{ width: "300px", margin: "0 auto 15px" }}></hr>
      <div className={Employeestyle.modalContent}>
        <div className={Employeestyle.name}>
          <span className={Employeestyle.block}>
            <b>Full Name: </b>{" "}
            <span className={Employeestyle.data}>{employee.Name}</span>
          </span>
          <br />
          <span className={Employeestyle.block}>
            <b>Username: </b>{" "}
            <span className={Employeestyle.data}>{employee.userName}</span>
          </span>
          <br />
          <span className={Employeestyle.block}>
            <b>Email Address: </b>{" "}
            <span className={Employeestyle.data}>{employee.Email}</span>
          </span>
          <br />
          <span className={Employeestyle.block}>
            <b>Phone Number: </b>{" "}
            <span className={Employeestyle.data}>{employee.phoneNumber}</span>
          </span>
          <br />
          <span className={Employeestyle.block}>
            <b>National Id: </b>{" "}
            <span className={Employeestyle.data}>{employee.NationalId}</span>
          </span>
          <br />
          <span className={Employeestyle.block}>
            <b>Salary (per pay period): </b>{" "}
            <span className={Employeestyle.data}>{employee.salary}</span>
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

export default EmployeesViewModal;
