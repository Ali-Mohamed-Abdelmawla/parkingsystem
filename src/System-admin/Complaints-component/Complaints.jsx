// Presentational Components (Dumb Components)
import React from 'react';
import styles from '../Styles/Employees.module.css'
import ExpandIcon from '../assets/light-mode/Details-icon.svg';

const ComplaintsTable = ({
  complaints,
  expandedRow,
  toggleDropdown,
  handleViewClick,
  handleDeleteClick,
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
                  <button
                    className={styles.dropdownButton}
                    onClick={() => handleViewClick(index)}
                  >
                    View
                  </button>
                  <hr />
                  <button
                    className={styles.dropdownButton}
                    onClick={() => handleDeleteClick(index)}
                  >
                    Delete
                  </button>
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