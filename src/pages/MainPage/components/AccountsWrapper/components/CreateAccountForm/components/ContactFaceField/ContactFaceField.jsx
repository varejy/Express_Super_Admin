import React from "react";
import { Controller } from "react-hook-form";

import TextField from "@mui/material/TextField";

import FormFieldGenerator from "../../../../../../../../components/FormFieldGenerator/FormFieldGenerator";

import styles from "./ContactFaceField.module.css";

function ContactFaceField(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.text}>{`Контактное лицо ${props.index}`}</div>
        <div className={styles.deleteBtn}>
          <div className={styles.deleteBtnIcon} />
          Удалить
        </div>
      </div>
      <div className={styles.content}>
        <FormFieldGenerator
          text="Полное имя"
          small
          value={
            <Controller
              name="contactName"
              control={props.control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  className={styles.fieldValue}
                  hiddenLabel
                  value={value}
                  onChange={onChange}
                  placeholder="Ввести..."
                  size="small"
                />
              )}
            />
          }
        />
        <FormFieldGenerator
          text="Должность"
          small
          value={
            <Controller
              name="contactRole"
              control={props.control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  className={styles.fieldValue}
                  hiddenLabel
                  value={value}
                  onChange={onChange}
                  placeholder="Ввести..."
                  size="small"
                />
              )}
            />
          }
        />
        <FormFieldGenerator
          text="Контактный телефон"
          small
          value={
            <Controller
              name="contactNumber"
              control={props.control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  className={styles.fieldValue}
                  hiddenLabel
                  value={value}
                  onChange={onChange}
                  type="number"
                  placeholder="Ввести..."
                  size="small"
                />
              )}
            />
          }
        />
        <FormFieldGenerator
          text="Email"
          small
          value={
            <Controller
              name="contactEmail"
              control={props.control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  className={styles.fieldValue}
                  hiddenLabel
                  type="email"
                  value={value}
                  onChange={onChange}
                  placeholder="Ввести..."
                  size="small"
                />
              )}
            />
          }
        />
      </div>
    </div>
  );
}

ContactFaceField.defaultProps = {
  state: {},
  register: () => {},
  control: {},
};

export default ContactFaceField;
