const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const employeesRouter = require('./routes/employees');
const skillsRouter = require('./routes/skills');
const cors = require('cors');

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// enable cors
app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

app.use('/employees', employeesRouter);
app.use('/skills', skillsRouter);




app.use(function (err, req, res, next) {
  res.status(500).json({
      success: false,
      message: 'Internal server error.',
      error_details: err
  });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
