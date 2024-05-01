import React, { useState } from 'react';
import ReportsPage from './ReportsPage.js';
import axios from '../../axios';
import Swal from 'sweetalert2';

function ReportsPageContainer({ darkMode }) {
    const [description, setDescription] = useState('');
    const accessToken = sessionStorage.getItem('accessToken');

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        console.log('Submitting report...');
    
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
                console.error('Error:', error);
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
        <ReportsPage
            darkMode={darkMode}
            description={description}
            handleDescriptionChange={handleDescriptionChange}
            handleSubmit={handleSubmit}
        />
    );
}

export default ReportsPageContainer;
