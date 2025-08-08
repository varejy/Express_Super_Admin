import React from "react";
import classNames from "classnames";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import styles from "./Search.module.css";

function Search(props) {
  return (
    <Paper
      component="form"
      className={styles.searchInputPaper}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        boxShadow: "none",
        border: "1px solid #DEE0E2",
        padding: "0 0",
        maxHeight: "38px",
        width: 450,
      }}
    >
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Введите поисковый запрос..."
        inputProps={{ "aria-label": "Введите поисковый запрос..." }}
      />
    </Paper>
  );
}

export default Search;
