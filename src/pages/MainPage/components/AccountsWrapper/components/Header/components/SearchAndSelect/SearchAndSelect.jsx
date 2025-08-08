import React from "react";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import { Select } from "semantic-ui-react";

import styles from "./SearchAndSelect.module.css";

const options = [
  { key: "cities", value: "cities", text: "Фильтр по городам" },
  { key: "services", value: "services", text: "По филиалам" },
  { key: "companies", value: "companies", text: "По компаниям" },
  { key: "accounts", value: "accounts", text: "По аккаунтам" },
];

function SearchAndSelect(props) {
  return (
    <Paper
      component="form"
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
      <Select
        placeholder="По филиалам"
        className={styles.select}
        options={options}
      />
    </Paper>
  );
}

export default SearchAndSelect;
