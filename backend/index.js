const express        = require('express');
const cors           = require('cors');
const {dbconnection} = require('./db/db');
// rutas
const taskRoutes = require('./routes/tasks.route');
const board = require('./routes/board');

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/tasks', taskRoutes);
app.use('/api/board', board);

app.listen( process.env.PORT, () =>
    console.log("Backend server running on port: " + process.env.PORT )
);

dbconnection();
