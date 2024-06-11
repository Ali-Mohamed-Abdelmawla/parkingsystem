import Garagestyle from "../../System-admin/Styles/Employees.module.css";

function EmployeesViewModal({ employee, handleCloseView }) {
  if (!employee) {
    console.log("Employee not found", employee);
    return null; // or render a loading state, an error message, etc.
  }
  return (
    <div className={Garagestyle.viewModal}>
      <div className={Garagestyle.viewTitle}></div>
      <h2>{employee.GarageName}'s Details</h2>
      <hr style={{ width: "300px", margin: "0 auto 15px" }}></hr>
      <div className={Garagestyle.modalContent}>
        <div className={Garagestyle.name}>
          <span className={Garagestyle.block}>
            <b>Garage Id: </b>{" "}
            <span className={Garagestyle.data}>{employee.GarageId}</span>
          </span>
          <br />
          <span className={Garagestyle.block}>
            <b>Garage Name: </b>{" "}
            <span className={Garagestyle.data}>{employee.GarageName}</span>
          </span>
          <br />
          <span className={Garagestyle.block}>
            <b>street: </b>{" "}
            <span className={Garagestyle.data}>{employee.street}</span>
          </span>
          <br />
          <span className={Garagestyle.block}>
            <b>city: </b>{" "}
            <span className={Garagestyle.data}>{employee.city}</span>
          </span>
          <br />
          <span className={Garagestyle.block}>
            <b>longitude: </b>{" "}
            <span className={Garagestyle.data}>{employee.longitude}</span>
          </span>
          <br />
          <span className={Garagestyle.block}>
            <b>latitude: </b>{" "}
            <span className={Garagestyle.data}>{employee.latitude}</span>
          </span>
          <br />
          <span className={Garagestyle.block}>
            <b>Hour Price: </b>{" "}
            <span className={Garagestyle.data}>{employee.HourPrice}</span>
          </span>
          <br />
          <span className={Garagestyle.block}>
            <b>AvailableSpaces: </b>{" "}
            <span className={Garagestyle.data}>
              {employee.AvailableSpaces}
            </span>
          </span>
          <br />
          <span className={Garagestyle.block}>
            <b>TotalSpaces: </b>{" "}
            <span className={Garagestyle.data}>{employee.TotalSpaces}</span>
          </span>
          <br />
          <span className={Garagestyle.block}>
            <b>HasAdmin: </b>{" "}
            <span className={Garagestyle.data}>
              {employee.HasAdmin
                ? "This garage has an admin assigned"
                : "This garage doesn't have an admin assigned"}
            </span>
          </span>
          {/* Details */}
          <div className={Garagestyle.editModelButtons}>
            <button
              className={Garagestyle.viewButton}
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
