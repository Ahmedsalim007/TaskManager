import { Box, IconButton, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

function Task({ task, onDelete, onToggle }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          backgroundColor: "lightgrey",
          p: 2,
          borderRadius: "8px",
        }}
      >
        {/* Task name */}
        <Typography variant="h6">{task.name}</Typography>

        {/* Status toggle */}
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => onToggle(task._id, task.completed)}
        >
          {task.completed ? "Completed" : "Pending"}
          <CheckIcon sx={{ ml: 1, color: task.completed ? "green" : "grey" }} />
        </Typography>

        {/* Delete button */}
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => onDelete(task._id)}
        >
          <ClearIcon fontSize="small" color="error" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Task;
