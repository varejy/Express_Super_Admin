import React, { useState } from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import styles from "./Filters.module.css";

function Filters(props) {
  const [checked, setChecked] = useState({
    onlyActive: false,
    onlyErrors: false,
    onlyNotActive: false,
    all: false,
    basic: false,
    standard: false,
    pro: false,
  });
  const [createdDate, setCreatedDate] = useState(null);
  const [ActivationDate, setActivationDate] = useState(null);

  const handleChange = (event) => {
    setChecked({ ...checked, [event.target.value]: event.target.checked });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Фильтры</div>
      <div className={styles.container}>
        <FormControlLabel
          className={styles.formCheckBox}
          value="onlyActive"
          control={
            <Checkbox
              checkedIcon={<div className={styles.checkedImage} />}
              className={styles.checkbox}
              checked={checked.onlyActive}
              onChange={handleChange}
            />
          }
          label="Скрыть неактивные аккаунты"
        />
        <FormControlLabel
          className={styles.formCheckBox}
          value="onlyErrors"
          control={
            <Checkbox
              checkedIcon={<div className={styles.checkedImage} />}
              className={styles.checkbox}
              checked={checked.onlyErrors}
              onChange={handleChange}
            />
          }
          label="Показывать аккаунты только с ошибками"
        />
        <FormControlLabel
          className={styles.formCheckBox}
          value="onlyNotActive"
          control={
            <Checkbox
              checkedIcon={<div className={styles.checkedImage} />}
              className={styles.checkbox}
              checked={checked.onlyNotActive}
              onChange={handleChange}
            />
          }
          label="Показывать только с неактивные"
        />
        <div className={styles.subTitle}>Фильтровать по дате создания</div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="За весь период"
            value={createdDate}
            format="MM/DD/YYYY"
            onChange={(newValue) => {
              setCreatedDate(newValue);
            }}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
        <div className={styles.subTitle}>По дате активации</div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="За весь период"
            value={ActivationDate}
            format="MM/DD/YYYY"
            onChange={(newValue) => {
              setActivationDate(newValue);
            }}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
        <div className={styles.subTitle}>Тарифные планы</div>
        <FormControlLabel
          className={styles.formCheckBox}
          value="all"
          control={
            <Checkbox
              checkedIcon={<div className={styles.checkedImage} />}
              className={styles.checkbox}
              checked={checked.all}
              onChange={handleChange}
            />
          }
          label="Выбрать все"
        />
        <FormControlLabel
          className={styles.formCheckBox}
          value="basic"
          control={
            <Checkbox
              checkedIcon={<div className={styles.checkedImage} />}
              className={styles.checkbox}
              checked={checked.basic}
              onChange={handleChange}
            />
          }
          label="Базовый"
        />
        <FormControlLabel
          className={styles.formCheckBox}
          value="standard"
          control={
            <Checkbox
              checkedIcon={<div className={styles.checkedImage} />}
              className={styles.checkbox}
              checked={checked.standard}
              onChange={handleChange}
            />
          }
          label="Стандарт"
        />
        <FormControlLabel
          className={styles.formCheckBox}
          value="pro"
          control={
            <Checkbox
              checkedIcon={<div className={styles.checkedImage} />}
              className={styles.checkbox}
              checked={checked.pro}
              onChange={handleChange}
            />
          }
          label="ПРО"
        />
      </div>
    </div>
  );
}

export default Filters;
