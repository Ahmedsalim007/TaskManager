import axios from "axios";
import { useEffect } from "react";
import { Box, Icon, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Search from "../components/SearchEngine";
import AddIcon from "@mui/icons-material/Add";

function AddTask({ task, setTask, tasks, setTasks, isChecked, setIsChecked }) {
  const api = axios.create({
    baseURL: "/api/v1/tasks", // to save that api is Equivlant to /apt/vi and not that the proxy holds http:localhost/...
  });

  const addTask = async () => {
    if (!task.trim()) return;
    try {
      const res = await api.post("/", {
        name: task,
        completed: isChecked,
      });

      setTasks([...tasks, res.data]);

      console.log(res.data);

      setTask("");
      setIsChecked(false);
    } catch (err) {
      console.log(err);
    }
  };

  const isCompleted = (e) => {
    setIsChecked(e.target.checked);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
      <Search task={task} setTask={setTask} onKeyDown={handleKeyPress} />
      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon size="medium" />}
        onClick={addTask}
      >
        Add
      </Button>
    </Box>
  );
}

export default AddTask;
