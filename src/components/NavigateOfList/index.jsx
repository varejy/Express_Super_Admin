import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import styles from "./index.module.css";

function NavigateOfList(props) {
  const dispatch = useDispatch();
  const [sortType, setSortType] = useState("");
  const [search, setSearch] = useState("");
  const { searchFunction, url } = props;

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
    dispatch(searchFunction(event.target.value));
  };

  return (
    <Box className={styles.wrapper}>
      <TextField
        size="small"
        className={styles.margin}
        value={search}
        onChange={handleChangeSearch}
        label="Поиск"
        type="search"
        variant="outlined"
      />
      <FormControl className={styles.margin} sx={{ m: 2, minWidth: 170 }}>
        <InputLabel size="small" id="select-label">
          Сортировка
        </InputLabel>
        <Select
          labelId="select-label"
          size="small"
          value={sortType}
          onChange={(event) => setSortType(event.target.value)}
          autoWidth
          label="Сортировка"
        >
          <MenuItem value="">
            <em>Нет</em>
          </MenuItem>
          <MenuItem value="dateNew">Сначала новые</MenuItem>
          <MenuItem value="dateOld">Сначала старые</MenuItem>
        </Select>
      </FormControl>
      <Link className={styles.margin} to={`/${url}`}>
        <Button
          size="small"
          className={styles.createNewTaxiService}
          variant="outlined"
        >
          Создать
        </Button>
      </Link>
    </Box>
  );
}

export default NavigateOfList;
