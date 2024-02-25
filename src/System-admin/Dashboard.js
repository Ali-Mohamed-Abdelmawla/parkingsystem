import React from "react";
import ReactDOM from "react-dom/client";
import "./Dashboard.css";
import sitevisitors from "./assets/light-mode/Site-visitors.svg";
import admins from './assets/light-mode/active-admins-icon.svg'; 
import operations from './assets/light-mode/parking-op.svg';
import revenue from './assets/light-mode/revenue.svg';
import expenses from './assets/light-mode/expenses.svg';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div className="webperformance">
          <h1>Website performance</h1>
          <div className = "date">
          <input type="date" name="date-taker1" />
          </div>
          <div className="performance-contents">
            {/* first card */}
            <div className="card">
              <div className="card-title">
                <small>Site visitors</small>
                <img src={sitevisitors} alt="icon" />
                </div>
                <h2>300</h2>
              
            </div>
            {/* second card */}
            <div className="card ">
            <div className = "card-title">
                <small>Number of active admins</small>
                <img src={admins} alt="icon" />
                </div>
                <h2>20</h2>
            </div>
          </div>
        </div>

        <div className="Garage-statistics">
          <h1>Garage statistics</h1>
          <div className = "date">
          <input type="date" name="date-taker2" />
          </div>
          <div className="statistics-contents">
            {/* second group first card */}
            <div className="card ">
              <div className="card-title">
                <small>Total parking operations</small>
                <img src={operations} alt="icon" />
                </div>
                <h2>580</h2>
              
            </div>
            {/* second group second card */}
            <div className="card ">
              <div className="card-title">
                <small>Total revenue</small>
                <img src={revenue} alt="icon" />
                </div>
                <h2>4500 EGP</h2>

            </div>
            {/* second group third card */}
            <div className="card ">
              <div className="card-title">
                <small> Total expenses </small>
                <img src={expenses} alt="icon" />
                </div>
                <h2>1000 EGP</h2>

            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
