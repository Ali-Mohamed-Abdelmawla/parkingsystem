import React from 'react';
import './Employees.css';
import ExpandIcon from './assets/light-mode/Details-icon.svg';
import WarningIcon from './assets/light-mode/Delete-icon.svg';
import viewComponentIcon  from './assets/light-mode/View-component-icon.svg';


class Complaints extends React.Component {

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
      editedComplaint: {
          Report_id:"",
          Reporter_id: "",
          Report_type: "",
          Report_state: "",
          Reporter_type: "",
          Report_message: ""
      },
      Complaints: [
        {
          Report_id:123456,
          Reporter_id: 9799,
          Report_type: "Complaint",
          Report_state: "Solved",
          Reporter_type: "Customer",
          Report_message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, eius."
        },
        {
          Report_id:13909,
          Reporter_id: 2552,
          Report_type: "Complaint",
          Report_state: "Notsolved",
          Reporter_type: "Employee",
          Report_message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, eius."
        },
        {
          Report_id:20502,
          Reporter_id: 2504,
          Report_type: "Complaint",
          Report_state: "Solved",
          Reporter_type: "Customer",
          Report_message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, eius."
        },
      ],
    };
  }

  componentDidMount() {
    // Save employees to localStorage on component mount
    this.saveToLocalStorage();
  }

  saveToLocalStorage = () => {
    const { Complaints } = this.state;
    localStorage.setItem('complaints', JSON.stringify(Complaints));
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
      editedComplaint: { ...this.state.Complaints[index] }
    });

    // Add the class to the body when the modal is active
    document.body.classList.add("Edit-modal-active");
  };

  handleDeleteClick = (index) => {
    this.setState({
      showDeleteConfirmation: true,
      deletionIndex: index,
    });

    // Add the class to the body when the modal is active
    document.body.classList.add("delete-modal-active");
  };

  handleCancelDelete = () => {
    this.setState({
      showDeleteConfirmation: false,
      deletionIndex: null,
    });

    // Remove the class when the modal is closed
    document.body.classList.remove("delete-modal-active");
  };

  handleConfirmDelete = () => {
    const { deletionIndex } = this.state;

    // Perform the delete action (e.g., call an API, update state)
    const updatedComplaints = [...this.state.Complaints];
    updatedComplaints.splice(deletionIndex, 1);

    this.setState({
      showDeleteConfirmation: false,
      deletionIndex: null,
      Complaints: updatedComplaints,
    }, () => {
      // Save to localStorage after state update
      this.saveToLocalStorage();
    });

    // Remove the class when the modal is closed
    document.body.classList.remove("delete-modal-active");
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      editedComplaint: {
        ...prevState.editedComplaint,
        [name]: value
      }
    }));
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform input validation here before updating the state

    // Update the Employees array with the edited employee
    const { editIndex, editedComplaint } = this.state;
    const updatedComplaints = [...this.state.Complaints];
    updatedComplaints[editIndex] = editedComplaint;

    this.setState({
      showEditPage: false,
      editIndex: null,
      Complaints: updatedComplaints,
    }, () => {
      // Save to localStorage after state update
      this.saveToLocalStorage();
    });

    // Remove the class when the modal is closed
    document.body.classList.remove("Edit-modal-active");
  };

  handleViewClick = (index) => {
    this.setState({
      showViewDetails: true,
      viewIndex: index,
    });

    // Add the class to the body when the modal is active
    document.body.classList.add("view-modal-active");
  };

  handleCloseView = () => {
    this.setState({
      showViewDetails: false,
      viewIndex: null,
    });

    // Remove the class when the modal is closed
    document.body.classList.remove("view-modal-active");
  };

  render() {
    const { expandedRow, showDeleteConfirmation, showEditPage, showViewDetails, editedComplaint, viewIndex } = this.state;

    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Report_id</th>
              <th>Report_type</th>
              <th>Reporter_type</th>
              <th>Report_state</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.Complaints.map((complaint, index) => (
              <tr key={index}>
                <td>{complaint.Report_id}</td>
                <td>{complaint.Report_type}</td>
                <td>{complaint.Reporter_type}</td>
                <td>{complaint.Report_state}</td>
                <td>
                  <div
                    className="employee-details"
                    onClick={() => this.toggleDropdown(index)}
                  >
                    <img
                      src={ExpandIcon}
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
            <div className="delete-title"></div>
            <div className="delete-content">
              <img src={WarningIcon} alt="warning-icon" />
              <p>Are you sure to delete this employee?</p>
              <button onClick={this.handleConfirmDelete}>Confirm</button>
              <button onClick={this.handleCancelDelete}>No</button>
            </div>
          </div>
        )}

          {/* Edit_page(useless) */}



        {showViewDetails && (
          <div className="view-modal">
            <div className="view-title"></div>
            <div className="modal-content">
              <div className="modal-main">
                <img src={viewComponentIcon} alt="ICON" />
                <div className= "name">
                <label>
                  <b>Report_id:</b> {this.state.Complaints[viewIndex].Report_id}
                </label>
                <label>
                  <b>Reporter_id:</b> {this.state.Complaints[viewIndex].Reporter_id}
                </label>
                <label>
                  <b>Report_type:</b> {this.state.Complaints[viewIndex].Report_type}
                </label>
                <label>
                  <b>Report_state:</b> {this.state.Complaints[viewIndex].Report_state}
                </label>
                <label>
                  <b>Reporter_type:</b> {this.state.Complaints[viewIndex].Reporter_type}
                </label>
                </div>
              </div>
              <hr></hr>
              <div className="modal-details">
                <label>
                  <b>Report_message:</b> {this.state.Complaints[viewIndex].Report_message}
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

export default Complaints;