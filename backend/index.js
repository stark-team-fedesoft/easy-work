const express        = require('express');
const cors           = require('cors');
const {dbconnection} = require('./db/db');
// rutas
<<<<<<< HEAD
const taskRoutes     = require('./routes/tasks.route');
const taskListRoutes = require('./routes/tasks-list.route');
=======
const taskRoutes = require('./routes/tasks.route');
const Role = require("./routes/role");
const User = require("./routes/user");


>>>>>>> felipe

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/tasks', taskRoutes);
<<<<<<< HEAD
app.use('/api/tasks-list', taskListRoutes);
=======
app.use("/api/role", Role);
app.use("/api/user", User);


>>>>>>> felipe

app.listen( process.env.PORT, () =>
    console.log("Backend server running on port: " + process.env.PORT )
);

dbconnection();
