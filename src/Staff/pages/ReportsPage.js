import React, { useState } from 'react';
import './ReportsPage.css'; 


function ReportsPage() {
    
    const [description, setDescription] = useState('');
    const [urgency, setUrgency] = useState('Low');

    
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleUrgencyChange = (event) => {
        setUrgency(event.target.value);
    };

    const handleSubmit = (event) => {
        
        event.preventDefault();
        console.log('Form submitted');
    };

    return (
        <div className="container">
            <h2 className="heading">System issue reporting</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="description">Issue Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        rows="6"
                        cols="50"
                    ></textarea>
                </div>
                <div className="form-group">
    <select id="urgency" name="urgency" value={urgency} onChange={handleUrgencyChange}>
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
