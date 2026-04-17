import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Button, TextField } from "@mui/material";
import Task from "./Task.jsx";
import React from "react";

// 🔹 Normalizers
const normalizeList = (data) => {
  const payload = data?.tasks ?? data;
  return Array.isArray(payload) ? payload : [];
};

const normalizeOne = (data) => data?.task ?? data;

function TaskManager() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // 🔹 API instance
  const api = axios.create({
    baseURL: "/api/v1/tasks",
  });

  // 🔹 Fetch all tasks
  const fetchTasks = async () => {
    try {
      const { data } = await api.get("/");
      setTasks(normalizeList(data));
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // 🔹 Add task
  const addTask = async () => {
    if (!task.trim()) return;
    try {
      const { data } = await api.post("/", { name: task, completed: false });
      const created = normalizeOne(data);
      setTasks((prev) => [...prev, created]);
      setTask("");
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // 🔹 Delete task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // 🔹 Toggle completion
  const toggleComplete = async (id, current) => {
    try {
      const { data } = await api.patch(`/${id}`, { completed: !current });
      const updated = normalizeOne(data);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 8,
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 4, fontWeight: "bold", fontSize: "2.3rem" }}
      >
        Task Manager
      </Typography>

      {/* Input + Add button */}
      <Box sx={{ display: "flex", gap: "10px", mb: 3 }}>
        <TextField
          label="New Task"
          variant="outlined"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <Button variant="contained" color="success" onClick={addTask}>
          Add
        </Button>
      </Box>

      {/* Tasks list */}
      <Box sx={{ width: "500px", mt: 2 }}>
        {tasks.map((t) => (
          <Task
            key={t._id}
            task={t}
            onDelete={deleteTask}
            onToggle={toggleComplete}
          />
        ))}
      </Box>
    </Box>
  );
}

export default TaskManager;
