import React from "react";
import classNames from "classnames";

import { Controller } from "react-hook-form";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import TextInput from "../../../TextInput/TextInput";

import { tariffIntervalOptions } from "../../../../redux/constants/intervalOptions";

import styles from "./AddonService.module.css";

function AddonService(props) {
  const findOption = (service, options) =>
    options.find((item) => item.key === +service.interval);
  if (props.addonService.title === "Мультигород") {
    return (
      <div className={styles.addonService}>
        <div className={styles.displayFlex}>
          <Controller
            name={`companies[${props.companyIndex}].tariffAdditionalServices[${props.index}]`}
            control={props.control}
            render={({ field: { value, onChange } }) => (
              <FormControlLabel
                className={styles.formCheckBox}
                value={`companies[${props.companyIndex}].tariffAdditionalServices[${props.index}]`}
                control={
                  <Checkbox
                    checkedIcon={<div className={styles.checkedImage} />}
                    className={styles.checkbox}
                    checked={value !== (null || undefined) && true}
                    onChange={() =>
                      props.form.setValue(
                        `companies[${props.companyIndex}].tariffAdditionalServices[${props.index}]`,
                        value === props.addonService
                          ? undefined
                          : { ...props.addonService, tariffId: props.tariffId }
                      )
                    }
                  />
                }
                label=""
              />
            )}
          />
          <div className={styles.addonDescriptionWrapper}>
            <div className={styles.addonServicePrice}>
              {`${props.addonService.price} `}
              {findOption(props.addonService, tariffIntervalOptions).text}
            </div>
            <div className={styles.addonDescription}>Мультигород</div>
          </div>
        </div>
        <div
          className={classNames(
            styles.displayFlex,
            styles.countServiceInputWrapper
          )}
        >
          Количество филиалов
          <div className={styles.servicesCounter}>
            <TextInput
              type="number"
              value={props.servicesLength}
              disabled
              className={classNames(
                styles.inputField,
                styles.driverIncludeCountInput,
                styles.centerText
              )}
              placeholder="1"
              size="small"
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.addonService}>
      <div className={styles.displayFlex}>
        <Controller
          name={`companies[${props.companyIndex}].tariffAdditionalServices[${props.index}]`}
          control={props.control}
          render={({ field: { value, onChange } }) => (
            <FormControlLabel
              className={styles.formCheckBox}
              value={props.addonService.title}
              control={
                <Checkbox
                  checkedIcon={<div className={styles.checkedImage} />}
                  className={styles.checkbox}
                  checked={value !== (null || undefined) && true}
                  onChange={() =>
                    onChange(
                      value === props.addonService
                        ? undefined
                        : { ...props.addonService, tariffId: props.tariffId }
                    )
                  }
                />
              }
              label=""
            />
          )}
        />
        <div className={styles.addonDescriptionWrapper}>
          <div className={styles.addonServicePrice}>
            {`${props.addonService.price} `}
            {findOption(props.addonService, tariffIntervalOptions).text}
          </div>
          <div className={styles.addonDescription}>
            {props.addonService.title}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddonService;
