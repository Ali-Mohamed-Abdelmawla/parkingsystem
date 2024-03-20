import React from "react";
import "./Customer-Services.css";
import View from "../assets/LightMode/view.svg";
import Close from "../assets/LightMode/false.svg";

class Employees extends React.Component {
constructor(props) {
super(props);
this.state = {
expandedRow: -1,
showDeleteConfirmation: false,
deletionIndex: null,
showEditPage: false,
editIndex: null,
showViewDetails: false,
viewIndex: null,
editedEmployee: {
    Name: "",
    Email: "",
    ID: "",
    Gender: "",
    WorkHours: "",
},
Employees: [
{
    Name: "Amany Fawzy",
    Email: "amanyf070@gmail.com",
    ID: "321210213",
    Gender: "Female",
    WorkHours: "4",
},
{
    Name: "Slsbeel Samir",
    Email: "slsabeel2@gmail.com",
    ID: "1542310213",
    Gender: "Female",
    WorkHours: "6",
},
{
    Name: "Ahmed Mohamed",
    Email: "aahmed44@gmail.com",
    ID: "365478953",
    Gender: "Male",
    WorkHours: "8",
},
{
    Name: "Omar Ahmed",
    Email: "omaaar@gmail.com",
    ID: "89745623",
    Gender: "Male",
    WorkHours: "9",
},
],
};
}

componentDidMount() {
this.saveToLocalStorage();
}

saveToLocalStorage = () => {
const { Employees } = this.state;
localStorage.setItem("employees", JSON.stringify(Employees));
};

toggleDropdown = (index) => {
this.setState((prevState) => ({
expandedRow: prevState.expandedRow === index ? -1 : index,
}));
};

handleEditClick = (index) => {
this.setState({
showEditPage: true,
editIndex: index,
editedEmployee: { ...this.state.Employees[index] },
});

document.body.classList.add("Edit-modal-active");
};

handleCloseEditClick = () => {
this.setState({
showEditPage: false,
});

document.body.classList.remove("Edit-modal-active");
};

handleDeleteClick = (index) => {
this.setState({
showDeleteConfirmation: true,
deletionIndex: index,
});

document.body.classList.add("delete-modal-active");
};

handleCancelDelete = () => {
this.setState({
showDeleteConfirmation: false,
deletionIndex: null,
});

document.body.classList.remove("delete-modal-active");
};

handleConfirmDelete = () => {
const { deletionIndex } = this.state;

const updatedEmployees = [...this.state.Employees];
updatedEmployees.splice(deletionIndex, 1);

this.setState(
{
showDeleteConfirmation: false,
deletionIndex: null,
Employees: updatedEmployees,
},
() => {
this.saveToLocalStorage();
}
);

document.body.classList.remove("delete-modal-active");
};

handleInputChange = (e) => {
const { name, value } = e.target;
this.setState((prevState) => ({
editedEmployee: {
...prevState.editedEmployee,
[name]: value,
},
}));
};

handleFormSubmit = (e) => {
e.preventDefault();

const { editedEmployee } = this.state;

if (
!editedEmployee.Name ||
!editedEmployee.Email ||
!editedEmployee.ID ||
!editedEmployee.Gender ||
!editedEmployee.WorkHours
) {
alert("Please fill in all fields before saving.");
return;
}

const { editIndex } = this.state;
const updatedEmployees = [...this.state.Employees];
updatedEmployees[editIndex] = editedEmployee;

this.setState(
{
showEditPage: false,
editIndex: null,
Employees: updatedEmployees,
},
() => {
this.saveToLocalStorage();
}
);

document.body.classList.remove("Edit-modal-active");
};

handleViewClick = (index) => {
this.setState({
showViewDetails: true,
viewIndex: index,
});

document.body.classList.add("view-modal-active");
};

handleCloseView = () => {
this.setState({
showViewDetails: false,
viewIndex: null,
});

document.body.classList.remove("view-modal-active");
};

render() {
const {
expandedRow,
showDeleteConfirmation,
showEditPage,
showViewDetails,
editedEmployee,
viewIndex,
} = this.state;

return (
<>
<table>
<thead>
<tr>
    <th>Name</th>
    <th>Email</th>
    <th>ID</th>
    <th>Gender</th>
    <th>Work Hours</th>
    <th></th>
</tr>
</thead>
<tbody>
{this.state.Employees.map((employee, index) => (
<tr key={index}>
    <td>{employee.Name}</td>
    <td>{employee.Email}</td>
    <td>{employee.ID}</td>
    <td>{employee.Gender}</td>
    <td>{employee.WorkHours}</td>
    <td>
        <div
            className="employee-details"
            onClick={() => this.toggleDropdown(index)}
        >
            <img
                src={View}
                alt="Details"
                className="expand-icon"
            />
            {index === expandedRow && (
                <div className="dropdown-menu">
                    <button
                        className="dropdown-button"
                        onClick={() => this.handleViewClick(index)}
                    >
                        View
                    </button>
                    <hr></hr>
                    <button
                        className="dropdown-button"
                        onClick={() => this.handleEditClick(index)}
                    >
                        Edit
                    </button>
                    <hr></hr>
                    <button
                        className="dropdown-button"
                        onClick={() => this.handleDeleteClick(index)}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    </td>
</tr>
))}
</tbody>
</table>

{showDeleteConfirmation && (
<div className="delete-confirmation">
<div className="border"></div>
<div className="delete-content">
    <p>Are you sure to delete this employee?</p>
    <button onClick={this.handleConfirmDelete}>Confirm</button>
    <button onClick={this.handleCancelDelete}>No</button>
</div>
</div>
)}

{showEditPage && (
<div className="edit-modal">
<div className="add-title">
    <button onClick={this.handleCloseEditClick}>
        <img src={Close} alt="Close" />
    </button>
</div>
<form onSubmit={this.handleFormSubmit}>
    <label>
        Edit &nbsp;
    </label>
    <input
        type="text"
        name="Name"
        placeholder="Name"
        value={editedEmployee.Name}
        onChange={this.handleInputChange}
    />
    <input
        required
        type="email"
        name="Email"
        placeholder="Email"
        value={editedEmployee.Email}
        onChange={this.handleInputChange}
    />
    <input
        required
        type="text"
        name="ID"
        placeholder="ID"
        value={editedEmployee.ID}
        onChange={this.handleInputChange}
    />
    <input
        required
        type="text"
        name="Gender"
        placeholder="Gender"
        value={editedEmployee.Gender}
        onChange={this.handleInputChange}
    />
    <input
        required
        type="number"
        name="WorkHours"
        placeholder="Work Hours"
        value={editedEmployee.WorkHours}
        onChange={this.handleInputChange}
    />
    <div className="edit-model-buttons">
        <button type="submit">Edit</button>
    </div>
</form>
</div>
)}

{showViewDetails && (
<div className="view-modal">
<div className="view-title"></div>
<div className="modal-content">
    <div className="modal-main">
        <div className="name">
            <label>
                <b>Name:</b> {this.state.Employees[viewIndex].Name}
            </label>
            <label>
                <b>Email:</b> {this.state.Employees[viewIndex].Email}
            </label>
        </div>
    </div>
    <div className="modal-details">
        <label>
            <b>ID:</b> {this.state.Employees[viewIndex].ID}
        </label>
        <label>
            <b>Gender:</b> {this.state.Employees[viewIndex].Gender}
        </label>
        <label>
            <b>Work Hours:</b> {this.state.Employees[viewIndex].WorkHours}
        </label>
        <button onClick={this.handleCloseView}>Close</button>
    </div>
</div>
</div>
)}
</>
);
}
}

export default Employees;
