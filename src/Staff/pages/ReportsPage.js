import React, { useState } from 'react'; // Add useState import
import styles from './ReportsPage.module.css';
// import Select from 'react-select';

function ReportsPage({ darkMode }) {
    const [description, setDescription] = useState(''); 
    const [urgency, setUrgency] = useState('Low'); 
    const [submitted, setSubmitted] = useState(false); 

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleUrgencyChange = (event) => {
        setUrgency(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (description.trim() !== '') {
            console.log('Form submitted');
            setSubmitted(true);           
        } else {
            alert('Please provide a description of the issue.');
        }
    };

    return (
        <div className={`${styles.container} ${darkMode ? styles['dark-mode'] : ''}`}>
            <h2 className={styles.heading}>System issue reporting</h2>
            {submitted && <p className={styles['confirmation-message']}>Report submitted successfully!</p>}
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
                <div className={styles['form-group']}>
                    <label htmlFor="urgency">Urgency Level</label>
                    <select
                        id="urgency"
                        name="urgency"
                        value={urgency}
                        onChange={handleUrgencyChange}
                        aria-label="Urgency"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <button type="submit">Submit Report</button>
            </form>
        </div>
    );
}

export default ReportsPage;
