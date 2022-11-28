const db = require('./db');
const config = require('../config');

db.run('CREATE TABLE IF NOT EXISTS Skill(id INTEGER PRIMARY KEY AUTOINCREMENT, skillName TEXT NOT NULL, skillDesc TEXT)',{});

function getMultiple(page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM Skill LIMIT ?,?`, [offset, config.listPerPage]);
  const meta = {page};

  return {
    data,
    meta
  }
}

function validateCreate(skill) {
  let messages = [];

  console.log(skill);

  if (!skill) {
    messages.push('No object is provided');
  }

  
    if (!skill.skillName) {
      messages.push('skillName is empty');
    }
  
    if (!skill.skillDesc) {
      messages.push('skillDesc is empty');
    }
  

  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

function create(skillObj) {
  validateCreate(skillObj);
  const {skillName, skillDesc} = skillObj;
  const result = db.run('INSERT INTO skill (skillName, skillDesc) VALUES (@skillName, @skillDesc)', {skillName,skillDesc});

  let message = 'Error in creating skill';
  if (result.changes) {
    message = 'Skill created successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create
}
