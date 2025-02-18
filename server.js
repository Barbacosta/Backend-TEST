import express from 'express';
// imports express module from express package
import cors from 'cors';
// imports Cross-Origin Resource Sharing (cors) from cors package
import mysql from 'mysql2';
// imports mySQL module from mySQL2 package

const app = express()
// declares variable 'app'
// sets value to the express function

const port = 4000;
// declares a variable named 'port'
// sets value port 4000

app.use(cors({ origin: 'http://localhost:5173' }));
//tells Express to use middleware
//calls the 'cors' function
//object specifies the allowed origin

const db = mysql.createConnection({
  host: 'thresholds-test.mysql.database.azure.com',
  user: 'cacosta', 
  port: 3306, 
  password: 'test', 
  database: 'cacosta_tasks', 
});
// declares variable 'db'
// calls 'createConnection' from mysql2
// {...} object containing database connection details
// details include host, user, port, password, database

db.connect((err) => {
// calls the 'connect' function to connect to database
// calls arrow function that runs AFTER trying to connect
// receives error as an argument

  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  // checks if an error occured
  // prints error message if an issue is detected
  // Stops execution

  console.log('Connected to the database');
  // prints a success message when connected
});

// the following are routes:
// .get handles GET requests
// req = request object (input), res = response object (output)
app.get('/events', (req, res) => {
  res.json(events);
});
// sets route for 'events' to local host (app)
// outputs 'events' data in JSON format

app.get('/updates', (req, res) => {
  res.json(updates);
});
// sets route for 'updates' to local host (app)
// outputs 'updates' data in JSON format

app.get('/resources', (req, res) => {
  res.json(resources);
});
// sets route for 'resources' to local host (app)
// outputs 'resources' data in JSON format

app.get('/employees', (req, res) => {
// sets route for 'employees' to local host (app)

  const query = 'SELECT * FROM employees';
  // stores a SQL query as a string
  // uses a SQL command that queries all from the 'employees' table

  db.query(query, (err, results) => {
    // runs the query

    if (err) {
      console.error('Error retrieving tasks:', err);
      res.status(500).json({ error: 'Error retrieving tasks' });
    } else {
      console.log(typeof (results));
      // checks for an error
      // if yes, logs error and sends back error response (status 500)
      // if no, outputs the type of results and the results in JSON format

      res.json(results);
    // outputs 'employees' data in JSON format
    }
  });
});

// starts the app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
//listens to the previously specified port (4000)
//AFTER app starts, console will log string