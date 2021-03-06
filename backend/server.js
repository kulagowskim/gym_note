const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Mongoose database connection  established succesfully");
});

require('./models/user.model');
require('./models/exercise.model');
require('./models/muscle.model');

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const musclesRouter = require('./routes/muscles');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter)
app.use('/muscles', musclesRouter)
app.use(require('./routes/auth'))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
