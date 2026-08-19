const express = require("express");
const cors = require("cors");
require("dotenv").config();

const tasksRouter = require("./routes/tasks");
const departmentsRouter = require("./routes/departments");
const employeesRouter = require("./routes/employees");
const projectsRouter = require("./routes/projects");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3002"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/tasks", tasksRouter);
app.use("/departments", departmentsRouter);
app.use("/employees", employeesRouter);
app.use("/projects", projectsRouter);

app.get("/", (req, res) => {
  res.json({
    message: "WorkHub Backend API is running",
  });
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(
    `WorkHub Backend running on http://127.0.0.1:${PORT}`
  );
});