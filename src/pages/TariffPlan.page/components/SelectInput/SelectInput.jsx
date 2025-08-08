import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function createSelectInput(props) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
      <Select
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        open={props.open}
        onClose={props.handleClose}
        onOpen={props.handleOpen}
        value={props.age}
        label="Age"
        onChange={props.handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}
