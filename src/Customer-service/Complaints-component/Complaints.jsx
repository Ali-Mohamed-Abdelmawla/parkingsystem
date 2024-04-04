// Presentational Component (Dumb Component)
import React from "react";
import styles from "../styles/Employees.module.css";
import ExpandIcon from "../assets/Details-icon.svg";

const ComplaintsTable = ({
  complaints,
  expandedRow,
  toggleDropdown,
  handleReplyClick,
  handleSolvedClick,
  handleForwardToAdminClick,
  handleForwardToTechnicalClick,
}) => (
  <table>
    <thead>
      <tr>
        <th>Report_id</th>
        <th>Report_type</th>
        <th>Reporter_type</th>
        <th>Report_state</th>
        <th>Settings</th>
      </tr>
    </thead>
    <tbody>
      {complaints.map((complaint, index) => (
        <tr key={index}>
          <td>{complaint.Report_id}</td>
          <td>{complaint.Report_type}</td>
          <td>{complaint.Reporter_type}</td>
          <td>{complaint.Report_state}</td>
          <td>
            <div
              className={styles.employeeDetails}
              onClick={() => toggleDropdown(index)}
            >
              <img
                src={ExpandIcon}
                alt="Details"
                className={styles.expandIcon}
              />
              {index === expandedRow && (
                <div className={styles.dropdownMenu}>
                  {/*---------------------*/}
                  <button
                    className={styles.dropdownButton}
                    onClick={() => handleReplyClick(index)}
                  >
                    Reply
                  </button>
                  <hr />
                  {/*---------------------*/}
                  <button
                    className={styles.dropdownButton}
                    onClick={() => handleSolvedClick(index)}
                  >
                    Set Solved
                  </button>
                  <hr />
                  {/*---------------------*/}
                  <button
                    className={styles.dropdownButton}
                    onClick={() => handleForwardToAdminClick(index)}
                  >
                    Forward to Admin
                  </button>
                  <hr />
                  {/*---------------------*/}
                  <button
                    className={styles.dropdownButton}
                    onClick={() => handleForwardToTechnicalClick(index)}
                  >
                    Forward to TechnicalSupport
                  </button>
                  <hr />
                </div>
              )}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ComplaintsTable;
