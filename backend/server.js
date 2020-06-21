const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

const app = express();

//Try
app.use(cors({ origin: true, credentials: true }));

//Connect to database
connectDB();

//Init middleware to read data sent in req.body
app.use(express.json({ extended: false }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res) => res.send('API running'));

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/items', require('./routes/api/items'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
