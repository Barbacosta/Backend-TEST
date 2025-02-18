import express from 'express';
//imports express from express
import cors from 'cors';
//imports Cross-Origin Resource Sharing
import mysql from 'mysql2';
//imports mySQL from mySQL2

const app = express()
const port = 4000;
app.use(cors({ origin: 'http://localhost:5173' }));

const db = mysql.createConnection({
  host: 'thresholds-test.mysql.database.azure.com',
  user: 'cacosta', 
  port: 3306, 
  password: 'test', 
  database: 'cacosta_tasks', 
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// routes
app.get('/events', (req, res) => {
  res.json(events);
});

app.get('/updates', (req, res) => {
  res.json(updates);
});

app.get('/resources', (req, res) => {
  res.json(resources);
});


app.get('/employees', (req, res) => {
  const query = 'SELECT * FROM employees';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving tasks:', err);
      res.status(500).json({ error: 'Error retrieving tasks' });
    } else {
      console.log(typeof (results));
      res.json(results);
    }
  });
});

// starts the app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});