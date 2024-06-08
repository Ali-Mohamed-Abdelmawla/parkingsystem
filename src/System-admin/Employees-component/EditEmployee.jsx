import Employeestyle from '../Styles/Employees.module.css';
import { useForm } from "react-hook-form";

function EmployeesModal({ title, onClose, onSubmit, editedEmployee, handleInputChange }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //  handleInputChange = (e) => {
  //   // Assuming you have a way to update the form values in your state
  //   // For example, if you're using a state variable to hold the form values
  //   // You would update that state here instead of directly manipulating the DOM
  //   // This is just a placeholder to show where you'd handle input changes
  //   console.log(e.target.name, e.target.value);
  // };

  return (
    <div className={Employeestyle.editModal}>
      <div className={Employeestyle.editTitle}>
        <button onClick={onClose}>X</button>
      </div>
      <h2>Edit {editedEmployee.Name}</h2>
      <hr style={{ width: "300px", margin: "0 auto 15px" }}></hr>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", {
            required: "Full name is required",
          })}
          type="text"
          placeholder="FullName"
          defaultValue={editedEmployee.Name}

        />
        {errors.name && <span className = {Employeestyle.errorMessage}>{errors.name.message}</span>}
        
        <input
          {...register("UserName", {
            required: "User name is required",
            minLength: {
              value: 5,
              message: "Username must be 5 to 20 characters long",
            },
            maxLength: {
              value: 20,
              message: "Username must be 5 to 20 characters long",
            },
          })}
          type="text"
          placeholder="userName"
          defaultValue={editedEmployee.userName}

        />
        {errors.userName && <span className = {Employeestyle.errorMessage}>{errors.userName.message}</span>}
        
        <input
          {...register("Email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Please enter a valid email",
            },
          })}
          type="text"
          placeholder="Email"
          defaultValue={editedEmployee.Email}

        />
        {errors.Email && <span className = {Employeestyle.errorMessage}>{errors.Email.message}</span>}
        
        <input
          {...register("PhoneNumber", {
            required: "Phone number is required",
            minLength: {
              value: 11,
              message: "The entered value should be 11 digits",
            },
            maxLength: {
              value: 11,
              message: "The entered value should be 11 digits",
            },
            pattern: {
              value: /^\d+$/,
              message: "The entered value should be a number",
            },
          })}
          type="text"
          placeholder="phoneNumber"
          defaultValue={editedEmployee.phoneNumber}

        />
        {errors.PhoneNumber && <span className = {Employeestyle.errorMessage}>{errors.PhoneNumber.message}</span>}
        
        <input
          {...register("NationalId", {
            required: "National ID is required",
            minLength: {
              value: 14,
              message: "The entered value should be 14 digits",
            },
            maxLength: {
              value: 14,
              message: "The entered value should be 14 digits",
            },
            pattern: {
              value: /^\d+$/,
              message: "The entered value should be a number",
            },
          })}
          type="text"
          placeholder="National_id"
          defaultValue={editedEmployee.NationalId}

        />
        {errors.NationalId && <span className = {Employeestyle.errorMessage}>{errors.NationalId.message}</span>}
        
        <input
          {...register("salary", {
            required: "Salary is required",
            minLength: 1,
            maxLength: 11,
            pattern: {
              value: /^\d+$/,
              message: "The entered value should be a number",
            },
          })}
          type="text"
          placeholder="Salary"
          defaultValue={editedEmployee.salary}

        />
        {errors.salary && <span className = {Employeestyle.errorMessage}>{errors.salary.message}</span>}
        
        <div className={Employeestyle.editModelButtons}>
          <button type="submit">Edit</button>
        </div>
      </form>
    </div>
  );
}

export default EmployeesModal;
