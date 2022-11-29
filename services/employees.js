const db = require('./db');
const config = require('../config');

db.run('CREATE TABLE IF NOT EXISTS Employee(id INTEGER PRIMARY KEY AUTOINCREMENT, employeeName TEXT NOT NULL, employeeEmail TEXT NOT NULL, employeePhone TEXT, employeeAge INT)',{});

function getMultiple(page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM Employee LIMIT ?,?`, [offset, config.listPerPage]);
  const meta = {page};

  return {
    success: true,
    data,
    meta,
    message: `Employee records successfully retrived`
  }
}

function validateCreate(employee) {
  let messages = [];

  console.log(employee);

  if (!employee) {
    messages.push('No object is provided');
  }

  
    if (!employee.employeeName) {
      messages.push('employeeName is empty');
    }
  
    if (!employee.employeeEmail) {
      messages.push('employeeEmail is empty');
    }
  
    if (!employee.employeePhone) {
      messages.push('employeePhone is empty');
    }
  
    if (!employee.employeeAge) {
      messages.push('employeeAge is empty');
    }
  

  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

function create(employeeObj) {
  validateCreate(employeeObj);
  const {employeeName, employeeEmail, employeePhone, employeeAge} = employeeObj;
  const result = db.run('INSERT INTO employee (employeeName, employeeEmail, employeePhone, employeeAge) VALUES (@employeeName, @employeeEmail, @employeePhone, @employeeAge)', {employeeName,employeeEmail,employeePhone,employeeAge});

  let message = 'Error in creating employee';
  if (result.changes) {
    message = 'Employee created successfully';
  }

  return {
    success: true,
    message: 'Employee created successfully'
  }

}

module.exports = {
  getMultiple,
  create
}
