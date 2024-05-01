import React, { useState } from 'react';
import styles from './ReportsPage.module.css';
import axios from '../../axios';
import Swal from 'sweetalert2';

function ReportsPage({ darkMode }) {
    const [description, setDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const accessToken = sessionStorage.getItem('accessToken');
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (description.trim() !== '') {
          try {
              const response = await axios.post(
                  '/api/Report/CreateReport',
                  {
                      reportMessage: description
                  },
                  {
                      headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${accessToken}`
                      }
                  }
              );
  
              console.log('Report submitted:', response.data);
              setSubmitted(true);
              // Show SweetAlert confirmation
              Swal.fire({
                  title: "Success!",
                  text: "Report submitted successfully!",
                  icon: "success",
                  customClass: {
                      container: darkMode ? 'custom-swal-container-dark' : 'custom-swal-container-light',
                      popup: 'custom-swal-popup',
                      title: 'custom-swal-title',
                      content: 'custom-swal-content',
                      confirmButton: 'custom-swal-confirm-button'
                  }
              });
          } catch (error) {
              if (error.response) {
                  console.error('Error response:', error.response.data);
                  console.error('Status code:', error.response.status);
              } else if (error.request) {
                  console.error('No response received:', error.request);
              } else {
                  console.error('Error:', error.message);
              }
          }
      } else {
          // Alert the user to provide a description
          Swal.fire({
              title: "Error!",
              text: "Please provide a description of the issue.",
              icon: "error",
              customClass: {
                  container: darkMode ? 'custom-swal-container-dark' : 'custom-swal-container-light',
                  popup: 'custom-swal-popup',
                  title: 'custom-swal-title',
                  content: 'custom-swal-content',
                  confirmButton: 'custom-swal-confirm-button'
              }
          });
      }
  };
  


    return (
        <div className={`${styles.container} ${darkMode ? styles['dark-mode'] : ''}`}>
            <h2 className={styles.heading}>System issue reporting</h2>
            {/* {submitted && <p className={styles['confirmation-message']}>Report submitted successfully!</p>} */}
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
