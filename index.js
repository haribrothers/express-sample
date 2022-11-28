const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const employeesRouter = require('./routes/employees');
const skillsRouter = require('./routes/skills');

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});


app.use('/employees', employeesRouter);
app.use('/skills', skillsRouter);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
