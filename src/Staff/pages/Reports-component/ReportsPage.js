import React from 'react';
import styles from './ReportsPage.module.css';
import Swal from 'sweetalert2';

function ReportsPage({ darkMode, description, handleDescriptionChange, handleSubmit }) {
    return (
        <div className={`${styles.container} ${darkMode ? styles['dark-mode'] : ''}`}>
            <h2 className={styles.heading}>System issue reporting</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles['form-group']}>
                    <label htmlFor="description">Issue Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        rows="6"
                        cols="50"
                        aria-label="Issue Description"
                    ></textarea>
                </div>
                <button className={`${styles.submitReport} ${styles['form-group']}`} type="submit">Submit Report</button>
            </form>
        </div>
    );
}

export default ReportsPage;
