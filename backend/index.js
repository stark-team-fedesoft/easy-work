const express        = require('express');
const cors           = require('cors');
const {dbconnection} = require('./db/db');
// rutas
const History_activities = require("./routes/history_activities");
const taskRoutes     = require('./routes/tasks.route');
const taskListRoutes = require('./routes/tasks-list.route');
const Role           = require("./routes/role");
const User           = require("./routes/user");
const Board          = require("./routes/board");
const SpaceWork      = require("./routes/spaceWork");
const commentRoutes  = require("./routes/comments.route");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/Activities", History_activities);
app.use('/api/tasks', taskRoutes);
app.use('/api/tasks-list', taskListRoutes);
app.use("/api/role", Role);
app.use("/api/user", User);
app.use("/api/board", Board);

app.use("/uploads", express.static("uploads"));


app.use("/api/workspaces", SpaceWork);
app.use("/api/task-comments", commentRoutes);

app.listen( process.env.PORT, () =>
    console.log("Backend server running on port: " + process.env.PORT )
);

dbconnection();
