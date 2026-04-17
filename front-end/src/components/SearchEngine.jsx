import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const CenteredSearch = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "4px", // More rounded corners
  backgroundColor: alpha(theme.palette.common.white, 0.25), // Lighter background
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.5), // Hover effect
  },

  width: "100%",
  maxWidth: "600px",
  display: "flex",
  alignItems: "center",
  boxShadow: theme.shadows[2], // Subtle shadow
  paddingLeft: "15px",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.8, 1, 1.8, 0), // Slightly taller input
    transition: theme.transitions.create("width"),
    width: "100%",
    borderRadius: "24px", // Match parent's border radius
    backgroundColor: theme.palette.background.paper, // Solid background color
    "&:focus": {
      backgroundColor: alpha(theme.palette.background.paper, 0.9), // Slight change on focus
    },
  },
}));

export default function Search({ task, setTask, onKeyDown }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <CenteredSearch>
        <StyledInputBase
          placeholder="Add a task...."
          inputProps={{ "aria-label": "search" }}
          fullWidth
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={onKeyDown}
        />
      </CenteredSearch>
    </Box>
  );
}
