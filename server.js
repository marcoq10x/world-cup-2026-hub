const express = require('express');
const cors = require('cors');
const mongodb = require('./db/database');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    // Only listen to the port if we are NOT running automated tests
    if (process.env.NODE_ENV !== 'test') {
      app.listen(port, () => {
        console.log(`Connected to DB and listening on ${port}`);
      });
    }
  }
});

// Export the app so our testing framework (Jest) can access it
module.exports = app;