const express = require('express');
const router = express.Router();
const Employees = require('../services/Employees');

/* GET Employee listing. */
router.get('/', function(req, res, next) {
  try {
    res.json(Employees.getMultiple(req.query.page));
  } catch(err) {
    console.error(`Error while getting Employees `, err.message);
    next(err);
  }
});

/* POST Employee */
router.post('/', function(req, res, next) {
  try {
    res.json(Employees.create(req.body));
  } catch(err) {
    console.error(`Error while adding Employee `, err.message);
    next(err);
  }
});

module.exports = router;
