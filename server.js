const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
const path = require('path');

const app = express();

//Try
app.use(cors({ origin: true, credentials: true }));

//Connect to database
connectDB();

//Init middleware to read data sent in req.body
app.use((req, res, next) => {
  if (req.originalUrl === '/api/stripe/webhook') {
    next();
  } else {
    express.json({ extended: false })(req, res, next);
  }
});

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/items', require('./routes/api/items'));
app.use('/api/stripe', require('./routes/api/stripe'));
app.use('/api/size-assistant', require('./routes/api/size-assistant'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
