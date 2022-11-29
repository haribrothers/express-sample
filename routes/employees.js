const express = require('express');
const router = express.Router();
const Employees = require('../services/Employees');

/* GET Employee listing. */
router.get('/', function(req, res, next) {
  try {
    res.json(Employees.getMultiple(req.query.page));
  } catch(err) {
    console.error(`Error while getting Employees `, err.code);
    res.status(400).json({
      success: false,
      message: `Error while getting Employees: ${err.message}`
    })
  }
});

/* POST Employee */
router.post('/', function(req, res, next) {
  try {
    res.json(Employees.create(req.body));
  } catch(err) {
    console.error(`Error while adding Employee `, err.message);
    res.status(400).json({
      success: false,
      message: `Error while addming Employee: ${err.message}`
    })
  }
});

module.exports = router;
