import React from "react";
import "./Customer-Services.css";
import View from "../assets/LightMode/view.svg";
import Close from "../assets/LightMode/false.svg";

class Garage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedRow: -1,
            showDeleteConfirmation: false,
            deletionIndex: null,
            showEditPage: false,
            editIndex: null,
            editedGarages: {
                ID:"",
                hourPrice: "",
                capacity: "",
                location: "",
            },
            Garages: [
                { ID:22, hourPrice: 50, capacity: 100, location: "Cairo" },
                { ID:55,hourPrice: 60, capacity: 200, location: "Alex" },
                { ID:48,hourPrice: 70, capacity: 250, location: "Luxor" },
                { ID:70,hourPrice: 50, capacity: 100, location: "Cairo" },
            ],
        };
    }

    componentDidMount() {
        this.saveToLocalStorage();
    }

    saveToLocalStorage = () => {
        const { Garages } = this.state;
        localStorage.setItem("Garages", JSON.stringify(Garages));
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
            editedGarages: { ...this.state.Garages[index] },
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
        const updatedGarages = [...this.state.Garages];
        updatedGarages.splice(deletionIndex, 1);

        this.setState(
            {
                showDeleteConfirmation: false,
                deletionIndex: null,
                Garages: updatedGarages, 
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
            editedGarages: {
                ...prevState.editedGarages,
                [name]: value,
            },
        }));
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        
        const { editedGarages } = this.state;
        const { editIndex } = this.state;
        const updatedGarages = [...this.state.Garages];
        updatedGarages[editIndex] = editedGarages;

        this.setState(
            {
                showEditPage: false,
                editIndex: null,
                Garages: updatedGarages,
            },
            () => {
                this.saveToLocalStorage();
            }
        );

        document.body.classList.remove("Edit-modal-active");
    };

    render() {
        const { expandedRow, showDeleteConfirmation, showEditPage, editedGarages } = this.state;

        return (
            <div key="garage">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Hour Price</th>
                            <th>Capacity</th>
                            <th>Location</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Garages.map((Garages, index) => (
                            <tr key={index}>
                                <td>{Garages.ID}</td>
                                <td>{Garages.hourPrice}</td>
                                <td>{Garages.capacity}</td>
                                <td>{Garages.location}</td>
                                <td>
                                    <div className="employee-details" onClick={() => this.toggleDropdown(index)}>
                                        <img src={View} alt="Details" className="expand-icon" />
                                        {index === expandedRow && (
                                            <div className="dropdown-menu">
                                                <button className="dropdown-button" onClick={() => this.handleEditClick(index)}>Edit</button>
                                                <hr />
                                                <button className="dropdown-button" onClick={() => this.handleDeleteClick(index)}>Delete</button>
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
                            <p>Are you sure to delete this Garage?</p>
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
                                Edit Garage &nbsp;
                            </label>
                            <input
                                type="number"
                                name="ID"
                                placeholder="ID"
                                value={editedGarages.ID}
                                onChange={this.handleInputChange}
                            />
                            <input
                                type="number"
                                name="hourPrice"
                                placeholder="Hour Price"
                                value={editedGarages.hourPrice}
                                onChange={this.handleInputChange}
                            />
                            <input
                                required
                                type="number"
                                id="cap"
                                name="capacity"
                                placeholder="Capacity"
                                value={editedGarages.capacity}
                                maxLength={11}
                                onChange={this.handleInputChange}
                            />
                            <input
                                required
                                type="text"
                                id="loc"
                                name="location"
                                placeholder="Location"
                                value={editedGarages.location}
                                maxLength={20}
                                onChange={this.handleInputChange}
                            />
                            <div className="edit-model-buttons">
                                <button type="submit">Edit</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        );
    }
}

export default Garage;
