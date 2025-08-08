import React from "react";
import classNames from "classnames";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import FormFieldGenerator from "../FormFieldGenerator/FormFieldGenerator";

import Countries from "../../assets/countries";

import styles from "./CountriesSelectField.module.css";

function CountriesSelectField(props) {
  return (
    <FormFieldGenerator
      text="Страна"
      small={props.small}
      value={
        <Autocomplete
          id="country-select"
          options={Countries}
          className={props.small && styles.small}
          autoHighlight
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt=""
              />
              {`${option.label} ${option.code} ${option.phone}`}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              className={classNames(
                styles.fieldValue,
                props.small && styles.small
              )}
              {...params}
              hiddenLabel
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
              ref={null}
              placeholder="Ввести..."
              size="small"
            />
          )}
        />
      }
    />
  );
}

export default CountriesSelectField;
