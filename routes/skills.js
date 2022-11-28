const express = require('express');
const router = express.Router();
const Skills = require('../services/Skills');

/* GET Skill listing. */
router.get('/', function(req, res, next) {
  try {
    res.json(Skills.getMultiple(req.query.page));
  } catch(err) {
    console.error(`Error while getting Skills `, err.message);
    next(err);
  }
});

/* POST Skill */
router.post('/', function(req, res, next) {
  try {
    res.json(Skills.create(req.body));
  } catch(err) {
    console.error(`Error while adding Skill `, err.message);
    next(err);
  }
});

module.exports = router;
