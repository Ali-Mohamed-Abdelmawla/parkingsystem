import React from "react";
import "./Complaints.css";
import View from "../assets/LightMode/view.svg";

class Complaints extends React.Component {
constructor(props) {
super(props);
this.state = {
    expandedRow: -1,
    showDeleteConfirmation: false,
    deletionIndex: null,
    showViewDetails: false,
    viewIndex: null,
    Complaint: [
    {
        Complainant: "Khalid Ali",
        Email: "Khalidd2@gmail.com",
        PhoneNumber: "0128319640",
        ComplainNumber: "SO-R2257-1",
    },
    {
        Complainant:"Salma Mohammed",
        Email: "salmaa22@gmail.com",
        PhoneNumber: "01025634864",
        ComplainNumber: "SO-M-2262-1", 
    },
    {
        Complainant: "Laila Walid",
        Email: "xxxxb@gmail.com",
        PhoneNumber: "01526438795",
        ComplainNumber: "SO-ST1-228-1", 
    },
    {
        Complainant: "Hager Mohammed",
        Email: "hageeryousef@gmail.com",
        PhoneNumber: "01202307894",
        ComplainNumber: "SO-2252-31-02", 
    }
    ],
};
}
componentDidMount() {
this.saveToLocalStorage();
}
saveToLocalStorage = () => {
const { Complaint } = this.state;
localStorage.setItem("Complaint", JSON.stringify(Complaint));
};

toggleDropdown = (index) => {
this.setState((prevState) => ({
    expandedRow: prevState.expandedRow === index ? -1 : index,
}));
};

handleDeleteClick = (index) => {
this.setState({
    showDeleteConfirmation: true,
    deletionIndex: index,
});
};

handleCloseDelete = () => {
this.setState({
    showDeleteConfirmation: false,
    deletionIndex: null,
});
};

handleConfirmDelete = () => {
const { deletionIndex, Complaint } = this.state;
const updatedComplaint = [...Complaint];
updatedComplaint.splice(deletionIndex, 1);

this.setState(
    {
    showDeleteConfirmation: false,
    deletionIndex: null,
    Complaint: updatedComplaint,
    },
    () => {
    this.saveToLocalStorage();
    }
);
};

handleViewClick = (index) => {
this.setState({
    showViewDetails: true,
    viewIndex: index,
});
};

handleCloseView = () => {
this.setState({
    showViewDetails: false,
    viewIndex: null,
});
};

render() {
const {
    expandedRow,
    showDeleteConfirmation,
    showViewDetails,
    Complaint,
    viewIndex,
} = this.state;

return (
    <>
    <table>
        <thead>
        <tr>
            <th>Complainant</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Complain Number</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {Complaint.map((employee, index) => (
            <tr key={index}>
            <td>{employee.Complainant}</td>
            <td>{employee.Email}</td>
            <td>{employee.PhoneNumber}</td>
            <td>{employee.ComplainNumber}</td>

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
                    <hr />
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
            <p>Are you sure to delete this Complaint?</p>
            <button onClick={this.handleConfirmDelete}>Confirm</button>
            <button onClick={this.handleCloseDelete}>No</button>
        </div>
        </div>
    )}
    {showViewDetails && (
        <div className="view-modal">
        <div className="view-title"></div>
        <div className="modal-content">
            <div className="modal-main">
            <div className="name">
                <label>
                <b>Complaint Number:</b>{" "}
                {Complaint[viewIndex].ComplainNumber}
                </label>
            </div>
            </div>

            <div className="modal-details">
            <p>
                {" "}
                I have encountered difficulties finding an available parking
                space despite the system indicating availability. This not
                only wastes my time but also adds unnecessary stress to my
                daily routine.{" "}
            </p>
            <button onClick={this.handleCloseView}>Close</button>
            </div>
        </div>
        </div>
    )}
    </>
);
}
}
export default Complaints;
