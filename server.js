import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import 'dotenv/config';

const { HOST, PASSWORD, NAME, DB_PORT, DATABASE, PORT } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173' }));

const db = mysql.createConnection({
    host: HOST,
    user: NAME,
    port: DB_PORT,
    password: PASSWORD,
    database: DATABASE,
});

db.connect(err => {
    if (err) {
        console.error("Error connecting DB", err);
    } else {
        console.log("Connected to DB");
    }
});

app.get('/tasks', (req, res) => {
    const query = "SELECT * FROM tasks;";
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error getting tasks' });
        }
        res.json(results);
    });
});

app.post('/createTask', (req, res) => {
    console.log("Received request body:", req.body);
    const { title, description, is_completed } = req.body;
    const query = "INSERT INTO tasks (title, description, is_completed) VALUES (?, ?, ?)";
    db.query(query, [title, description, is_completed], (err, results) => {
        if (err) {
            console.error("Error adding to DB", err);
            return res.status(500).json({ error: 'Error adding to DB' });
        }
        res.status(200).json(results);
    });
});

app.put('/updateTask/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, is_completed } = req.body;
    let query = "UPDATE tasks SET ";
    const values = [];
    if (title) { query += "title = ?, "; values.push(title); }
    if (description) { query += "description = ?, "; values.push(description); }
    if (is_completed !== undefined) { query += "is_completed = ?, "; values.push(is_completed); }
    query = query.slice(0, -2) + " WHERE id = ?";
    values.push(id);

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json({ message: "Task updated successfully" });
    });
});

app.delete('/deleteTask/:id', (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM tasks WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("DB error", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json({ message: "Deleted Successfully" });
    });
});

app.listen(PORT, () => console.log("Server active on port", PORT));
