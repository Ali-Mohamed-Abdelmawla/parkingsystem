Rakna
Rakna is a web application designed to help garage owners automate their garage processes. The application allows owners to log in as users to benefit from the services it offers.

Table of Contents
Purpose
Target Audience
System Architecture
Key Features
Available Scripts
Dependencies
Contributing
Configuration
Screenshots
Learn More
Purpose
Rakna aims to streamline and automate the operations within garages, providing a comprehensive solution for garage management.

Target Audience
Rakna is primarily targeted at garage owners who want to benefit from an automated system to manage their garages efficiently.

System Architecture
Rakna consists of three main parts:

Back-end: Serves both the front-end and mobile applications.
Front-end: This repository, built with React.js (Create React App).
Mobile: Designed for drivers who want to park their cars.
Key Features
Rakna consists of four interfaces:

Garage Admin Interface:

Manage employees (add, delete, edit)
View complaints forwarded to the admin
Monitor current sessions in the garage
Dashboard with statistics (revenue, expenses, etc.)
Garage Staff Interface:

Integrated camera for monitoring cars entering/exiting the garage, linked to an AI model for plate number extraction (manual entry also available)
View all current sessions in the garage
Submit reports/complaints
Technical Support Interface:

Designed for the developers to facilitate system management
Customer Service Interface:

View and forward complaints to the appropriate personnel or resolve them
Additionally, the system provides login and password reset functionalities using OTP.

Available Scripts
In the project directory, you can run:

npm start
Runs the app in development mode.
Open http://localhost:3000 to view it in your browser.

npm test
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

npm run eject
Note: this is a one-way operation. Once you eject, you can't go back! This command will remove the single build dependency from your project, giving you full control over the configuration files and dependencies.

Dependencies
sweetalert
axios
MUI (datagrid, loading buttons, etc.)
react-hook-form (form validation)
chart.js (dashboard charts)
Contributing
To contribute to Rakna, please fork the repository and use a feature branch. Pull requests are warmly welcome.

Configuration
Refer to the dependencies listed above for specific configuration requirements before running the app.

Screenshots
Garage Admin Interface




Garage Staff Interface




Technical Support Interface




Customer Service Interface



