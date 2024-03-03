import React from 'react';
import Complaintstyle from "./Employees.module.css";
import ExpandIcon from './assets/light-mode/Details-icon.svg';
import WarningIcon from './assets/light-mode/Delete-icon.svg';
import viewComponentIcon  from './assets/light-mode/View-component-icon(1).svg';


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


  handleDeleteClick = (index) => {
    this.setState({
      showDeleteConfirmation: true,
      deletionIndex: index,
    });

    // Add the class to the body when the modal is active
    document.body.classList.add(Complaintstyle.deleteModalActive);
  };

  handleCancelDelete = () => {
    this.setState({
      showDeleteConfirmation: false,
      deletionIndex: null,
    });

    // Remove the class when the modal is closed
    document.body.classList.remove(Complaintstyle.deleteModalActive);
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
    document.body.classList.remove(Complaintstyle.deleteModalActive);
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
    document.body.classList.remove(Complaintstyle.EditModalActive);
  };

  handleViewClick = (index) => {
    this.setState({
      showViewDetails: true,
      viewIndex: index,
    });

    // Add the class to the body when the modal is active
    document.body.classList.add(Complaintstyle.viewModalActive);
  };

  handleCloseView = () => {
    this.setState({
      showViewDetails: false,
      viewIndex: null,
    });

    // Remove the class when the modal is closed
    document.body.classList.remove(Complaintstyle.viewModalActive);
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
              <th>Settings</th>
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
                    className={Complaintstyle.employeeDetails}
                    onClick={() => this.toggleDropdown(index)}
                  >
                    <img
                      src={ExpandIcon}
                      alt="Details"
                      className={Complaintstyle.expandIcon}
                    />
                    {index === expandedRow && (
                      <div className={Complaintstyle.dropdownMenu}>
                        <button
                          className={Complaintstyle.dropdownButton}
                          onClick={() => this.handleViewClick(index)}
                        >
                          View
                        </button>
                        <hr></hr>

                        <button
                          className={Complaintstyle.dropdownButton}
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
          <div className={Complaintstyle.deleteConfirmation}>
            <div className={Complaintstyle.deleteTitle}></div>
            <div className={Complaintstyle.deleteContent}>
              <img src={WarningIcon} alt="warning-icon" />
              <p>Are you sure to delete this report?</p>
              <button onClick={this.handleConfirmDelete}>Confirm</button>
              <button onClick={this.handleCancelDelete}>No</button>
            </div>
          </div>
        )}

          {/* Edit_page(useless) */}



        {showViewDetails && (
          <div className={Complaintstyle.viewModal}>
            <div className={Complaintstyle.viewTitle}></div>
            <div className={Complaintstyle.modalContent}>
              <div className={Complaintstyle.modalComplaintMain}>
                <div className= {Complaintstyle.name}>
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
              <div className={Complaintstyle.modalComplaintsDetails}>
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