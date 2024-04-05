import React from 'react';
import styles from '../Styles/Employees.module.css'

const ViewModal = ({ complaint, onClose }) => (
  <div className={styles.viewModal}>
    <div className={styles.viewTitle}></div>
    <div className={styles.modalContent}>
      <div className={styles.modalComplaintMain}>
        <div className={styles.name}>
          <label><b>Report_id:</b> {complaint.Report_id}</label>
          <label><b>Reporter_id:</b> {complaint.Reporter_id}</label>
          <label><b>Report_type:</b> {complaint.Report_type}</label>
          <label><b>Report_state:</b> {complaint.Report_state}</label>
          <label><b>Reporter_type:</b> {complaint.Reporter_type}</label>
        </div>
      </div>
      <hr />
      <div className={styles.modalComplaintsDetails}>
        <label><b>Report_message:</b> {complaint.Report_message}</label>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  </div>
);

export default ViewModal;