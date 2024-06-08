import React from 'react';
import axiosInstance from '../../auth/axios';
import Swal from 'sweetalert2';
import closeDark from '../assets/DarkMode/false-dark.svg';
import closeLight from '../assets/LightMode/false.svg';
import styles from './garage-popup.module.css';
import { useForm } from 'react-hook-form';

const GaragePopup = ({ onClose, darkMode }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (formData) => {
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            };

            const response = await axiosInstance.post("/TechnicalSupport/AddGarage", formData, {
                headers
            });

            console.log('Added new garage:', response.data);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Garage added successfully!',
                confirmButtonColor: '#4caf50'
            }).then(() => {
                reset(); // Reset form fields
                onClose(); // Close popup
            });
        } catch (error) {
            console.error('Error adding garage:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add garage. Please try again later.',
                confirmButtonColor: '#f44336'
            });
        }
    };

    return (
        <div className={`${styles.popup} ${darkMode ? styles['dark-mode'] : ''}`}>
            <div className={`${styles['popup-inner']} ${darkMode ? styles['dark-mode-inner'] : ''}`}>
                <img src={darkMode ? closeDark : closeLight} alt="close" className={styles['close-icon']} onClick={onClose} />
                <h2>Add Garage</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <input placeholder='Garage Name' type="text" {...register("garageName", { required: true })} />
                    {errors.garageName && <span className="error">Garage Name is required</span>}
                    
                    <input placeholder='Hour Price' type="number" {...register("hourPrice", { required: true })} />
                    {errors.hourPrice && <span className="error">Hour Price is required</span>}
                    
                    <input placeholder='Street' type="text" {...register("street", { required: true })} />
                    {errors.street && <span className="error">Street is required</span>}
                    
                    <input placeholder='City' type="text" {...register("city", { required: true })} />
                    {errors.city && <span className="error">City is required</span>}
                    
                    <input 
                        placeholder='Longitude' 
                        type="text" 
                        {...register("longitude", { 
                            required: true,
                            pattern: {
                            value: /^-?\d*(\.\d+)?$/, // يقبل الأعداد الصحيحة والعشرية السالبة أو الموجبة
                        }
                    })} 
                    />
                    {errors.longitude && errors.longitude.type === "required" && <span className="error">Longitude is required</span>}
                    {errors.longitude && errors.longitude.type === "pattern" && <span className="error">Please enter a valid Longitude</span>}
                    <input 
                        placeholder='Latitude' 
                        type="text" 
                        {...register("latitude", { 
                            required: true,
                            pattern: {
                            value: /^-?\d*(\.\d+)?$/, // يقبل الأعداد الصحيحة والعشرية السالبة أو الموجبة
                        }
                    })} 
                    />
                    {errors.latitude && errors.latitude.type === "required" && <span className="error">Latitude is required</span>}
                    {errors.latitude && errors.latitude.type === "pattern" && <span className="error">Please enter a valid Latitude</span>}
                    
                    <input placeholder='Total Spaces' type="number" {...register("totalSpaces", { required: true })} />
                    {errors.totalSpaces && <span className="error">Total Spaces is required</span>}
                    
                    <button className={styles.submit} type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default GaragePopup;
