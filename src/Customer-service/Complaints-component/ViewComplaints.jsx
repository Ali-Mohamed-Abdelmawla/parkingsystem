import React from "react";
import styles from "../styles/Employees.module.css";

const ViewModal = ({ complaint, onClose }) => {
  const current = complaint;
  return (
    <>
      {current && (
        <div className={styles.viewModal}>
          <div className={styles.viewTitle}></div>
          <div className={styles.modalContent}>
            <div className={styles.modalComplaintMain}>
              <div className={styles.name}>
                <label>
                  <b>Report_id:</b> {complaint.ReportId}
                </label>
                <label>
                  <b>Report Type:</b> {complaint.ReportType}
                </label>
                <label>
                  <b>Reporter name:</b> {complaint.ReporterName}
                </label>
                <label>
                  <b>Report status:</b>{" "}
                  {complaint.IsFixed ? "Fixed" : "Not Fixed"}
                </label>
              </div>
            </div>
            <hr />
            <div className={styles.modalComplaintsDetails}>
              <label>
                <b>Report Message:</b> {complaint.ReportMessage}
              </label>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewModal;
