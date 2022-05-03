# sql-employee-tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

|   Languages   | Database Management System  |  Node Modules |
| ----------- | ----------- | ----------- | 
| ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) | SQL | Inquirer |
|   |   |  MySQL2 |
|   |   |  console.table |

# Table of contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [Questions](#questions)
* [License](#license)

# Description
This project was all about working with an SQL database by mocking the type of information a company might save to keep track of its employee structure. The database, its associated tables, and the initial data are all created within .sql files. The Inquirer module is used to prompt a user to interact with this database by viewing the employees, roles, and departments already stored within, or allowing them to add employees, roles, and departments, or update an existing employee's role. The module console.table is used to display the results of querying the database in a very user-friendly manner. 

## Installation
You can use this application by first installing it on your machine. To install locally, first clone this repository onto your machine. Once the contents are copied to your machine, open the directory in your text-editor of choice. From your shell, install the necessary node modules by navigating to the main directory and running the command "npm install". Once the packages have downloaded, the application is now ready to use.

## Usage
Using this app is simple. As a back-end application, it occurs completely in the command shell. Before running the application, populate the database by running the command "mysql -u root -p", followed by the password the user uses locally with for SQL, and then copying and pasting the contents of the schema.sql file followed by the seeds.sql file. This creates the database, the tables, and the initial data. From here, use the command "quit" to go back to the main directory. The application can now be initiated by running the command "node index.js", which will show the user the main menu. 

https://user-images.githubusercontent.com/101354032/165249133-217bb3bf-c586-4879-9f0d-4e7d09c19b0d.mp4

## Credits
This was a solo project meant to built from scratch, the idea provided by staff at the UC Berkeley full-stack coding bootcamp.

### Questions
Click <a href="https://github.com/jkwalsh127" target="_blank">**here**<a> to go to my GitHub profile

If you have any questions about this project or would just like to get in touch, you can email me at <a href="mailto:jkwalsh127@gmail.com" target="_blank">jkwalsh127@gmail.com</a>

#### License
The contents of this repository are protected under the <a href="https://opensource.org/licenses/MIT">MIT license.</a>
