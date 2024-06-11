import React from 'react';
import closeDark from '../assets/DarkMode/false-dark.svg';
import closeLight from '../assets/LightMode/false.svg';
import styles from './garage-popup.module.css';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import { useForm } from 'react-hook-form'; 

const UserPopup = ({ onClose, darkMode }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm(); 

    const onSubmit = async (data) => {
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            };

            const response = await axios.post('https://raknaapi.azurewebsites.net/TechnicalSupport/AddUser', data, {
                headers: headers
            });

            if (!response.data) {
                throw new Error('Failed to add user');
            }

            console.log('Added new user:', response.data);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'User added successfully!',
                confirmButtonColor: '#4caf50'
            }).then(() => {
                reset();
                onClose(); 
            });
        } catch (error) {
            console.error('Error adding user:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add user. Please try again later.',
                confirmButtonColor: '#f44336'
            });
        }
    };

    return (
        <div className={`${styles.popup} ${darkMode ? styles['dark-mode'] : ''}`}>
            <div className={styles['popup-inner']}>
                <img src={darkMode ? closeDark : closeLight} alt="close" className={styles['close-icon']} onClick={onClose} /> 
                <h2>Add User</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input placeholder='FullName' type="text" {...register("FullName", { required: true })} />
                    {errors.FullName && <span className="error">FullName is required</span>}
                    
                    <input placeholder='National ID' type="text" {...register("NationalId", { required: true, minLength: 14, maxLength: 14 })} />
                    {errors.NationalId && errors.NationalId.type === "required" && <span className="error">National ID is required</span>}
                    {errors.NationalId && errors.NationalId.type === "minLength" && <span className="error">National ID must be exactly 14 digits</span>}
                    {errors.NationalId && errors.NationalId.type === "maxLength" && <span className="error">National ID must be exactly 14 digits</span>}
                    
                    <input placeholder='Username' type="text" {...register('UserName', { required: true, pattern: /^[a-zA-Z0-9]{5,20}$/ })} />
                    {errors.UserName && errors.UserName.type === "required" && <span className="error">Username is required</span>}
                    {errors.UserName && errors.UserName.type === "pattern" && <span className="error">Username must be 5 to 20 characters long with no spaces and special characters</span>}
                    
                    <input placeholder='Email' type="email" {...register("Email", { required: true })} />
                    {errors.Email && <span className="error">Email is required</span>}
                    
                    <select {...register("Role", { required: true })}>
                        <option value="garageadmin">garageadmin</option>
                        <option value="customerservice">customerservice </option>
                    </select>
                    {errors.Role && <span className="error">Role is required</span>}

                    <input placeholder='Phone Number' type="text" {...register("PhoneNumber", { required: true })} />
                    {errors.PhoneNumber && <span className="error">Phone Number is required</span>}
                    
                    <input placeholder='Garage Id' type="number" {...register("GarageId", { required: true })} />
                    {errors.GarageId && <span className="error">Garage ID is required</span>}
                    
                    <input placeholder='Salary' type="number" {...register("Salary", { required: true })} />
                    {errors.Salary && <span className="error">Salary is required</span>}
                    
                    <button className={styles.submit} type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default UserPopup;
