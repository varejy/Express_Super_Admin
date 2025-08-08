import React, { useState } from "react";
import classNames from "classnames";

import { Controller } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import RadioGroup from "@mui/material/RadioGroup";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import { Select } from "semantic-ui-react";

import activeAccordionIcon from "../../assets/icons/icons_circleActive.svg";
import notActiveAccordionIcon from "../../assets/icons/icons_circleNotActive.svg";

import RadioButton from "../RadioButton/RadioButton";
import FormFieldGenerator from "../FormFieldGenerator/FormFieldGenerator";
import CreateBtnGenerator from "../CreateBtnGenerator/CreateBtnGenerator";

import CountriesSelectField from "../CountriesSelectField/CountriesSelectField";
import ContactFaceField from "../../pages/MainPage/components/AccountsWrapper/components/CreateAccountForm/components/ContactFaceField/ContactFaceField";

import styles from "./Account.module.css";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<div className={styles.accordionIcon} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "#FFFFFF",

  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper": {
    background: `url(${notActiveAccordionIcon})`,
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(0deg)",
    background: `url(${activeAccordionIcon})`,
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const languages = [
  { key: "ua", value: "ua", text: "Украинский" },
  { key: "ru", value: "ru", text: "Русский" },
];

function Account({
  form: {
    register,
    formState: { errors },
    control,
    handleSubmit,
  },
  onSubmit,
}) {
  const [expanded, setExpanded] = useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className={styles.contentWrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.subTitle}>Аккаунт</div>
        <FormFieldGenerator
          text="Название аккаунта*"
          value={
            <TextField
              error={errors.title}
              className={styles.fieldValue}
              hiddenLabel
              {...register("title", {
                required: true,
              })}
              placeholder="Ввести..."
              size="small"
            />
          }
        />
        <FormFieldGenerator
          text="ФИО владельца*"
          value={
            <TextField
              error={errors.superClientName}
              className={styles.fieldValue}
              hiddenLabel
              {...register("superClientName", { required: true })}
              placeholder="Ввести..."
              size="small"
            />
          }
        />
        <FormFieldGenerator
          text="Телефон владельца*"
          value={
            <TextField
              error={errors.superClientPhone}
              className={styles.fieldValue}
              hiddenLabel
              type="number"
              {...register("superClientPhone", { required: true })}
              placeholder="Ввести..."
              size="small"
            />
          }
        />
        <FormFieldGenerator
          text="Email владельца*"
          value={
            <TextField
              error={errors.superClientLogin}
              className={styles.fieldValue}
              hiddenLabel
              type="email"
              {...register("superClientLogin", { required: true })}
              placeholder="Ввести..."
              size="small"
            />
          }
        />
        <FormFieldGenerator
          text="Пароль для аккаунта*"
          alignStart
          value={
            <div
              className={classNames(styles.valueContainer, styles.fieldValue)}
            >
              <TextField
                error={errors.superClientPassword}
                className={styles.fieldValue}
                hiddenLabel
                {...register("superClientPassword", {
                  required: true,
                })}
                placeholder="Ввести..."
                size="small"
              />
              <FormControlLabel
                className={classNames(
                  styles.formCheckBox,
                  styles.passwordCheckBoxField
                )}
                value="refreshClientPassword"
                control={
                  <Checkbox
                    checkedIcon={<div className={styles.checkedImage} />}
                    className={styles.checkbox}
                    {...register("refreshClientPassword")}
                  />
                }
                label="Предложить пользователю поменять пароль"
              />
            </div>
          }
        />
        <FormFieldGenerator
          text="Вид деятельности"
          value={
            <div
              className={classNames(styles.valueContainer, styles.fieldValue)}
            >
              <FormControlLabel
                className={styles.formCheckBox}
                value="cargo"
                control={
                  <Checkbox
                    defaultChecked
                    checkedIcon={<div className={styles.checkedImage} />}
                    className={styles.checkbox}
                    {...register("cargo")}
                  />
                }
                label="Грузоперевозки"
              />
              <FormControlLabel
                className={styles.formCheckBox}
                value="tow"
                control={
                  <Checkbox
                    defaultChecked
                    checkedIcon={<div className={styles.checkedImage} />}
                    className={styles.checkbox}
                    {...register("tow")}
                  />
                }
                label="Эвакуатор"
              />
              <FormControlLabel
                className={styles.formCheckBox}
                value="passenger"
                control={
                  <Checkbox
                    defaultChecked
                    checkedIcon={<div className={styles.checkedImage} />}
                    className={styles.checkbox}
                    {...register("passenger")}
                  />
                }
                label="Пассажирские перевозки"
              />
            </div>
          }
        />
        <FormFieldGenerator
          text="Дата активации аккаунта*"
          value={
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                control={control}
                valueName="activateAt"
                name="activateAt"
                mask="DD/MM/YYYY"
                rules={{ required: true }}
                render={({ field: { onChange, name, value } }) => (
                  <DatePicker
                    name={name}
                    value={value}
                    style={{ width: "100%" }}
                    onChange={(date) => {
                      onChange(date);
                    }}
                    renderInput={(params) => (
                      <TextField
                        error={errors.activateAt}
                        style={{ width: "100%" }}
                        {...params}
                      />
                    )}
                  />
                )}
              />
            </LocalizationProvider>
          }
        />
        <FormFieldGenerator
          text="Вид оплаты"
          value={
            <RadioGroup
              className={styles.valueContainer}
              style={{ flexDirection: "row" }}
              defaultValue="prepaymentT"
            >
              <FormControlLabel
                className={styles.formCheckBox}
                value="prepaymentT"
                control={
                  <RadioButton {...register("prepaymentT")} ref={null} />
                }
                label="Предоплата"
              />
              <FormControlLabel
                className={styles.formCheckBox}
                value="prepaymentF"
                control={
                  <RadioButton {...register("prepaymentF")} ref={null} />
                }
                label="Пост оплата"
              />
            </RadioGroup>
          }
        />
        <CountriesSelectField
          control={control}
          error={errors.position}
          name="position"
          rule={{ required: true }}
        />
        <FormFieldGenerator
          text="Город"
          value={
            <TextField
              className={styles.fieldValue}
              hiddenLabel
              {...register("city", { required: true })}
              placeholder="Ввести..."
              size="small"
            />
          }
        />
        <FormFieldGenerator
          text="Язык по умолчанию"
          value={
            <Select
              placeholder="Русский"
              className={styles.select}
              {...register("language")}
              ref={null}
              options={languages}
            />
          }
        />
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Юридическая информация</Typography>
            <Typography className={styles.functionalText}>
              Применить ко всем филиалам и компаниям
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.dbInfoContainer}>
              <FormFieldGenerator
                text="Юридический адрес"
                value={
                  <TextField
                    className={styles.fieldValue}
                    hiddenLabel
                    {...register("legalAddress")}
                    placeholder="Ввести..."
                    size="small"
                  />
                }
              />
              <FormFieldGenerator
                text="Банковские реквизиты"
                value={
                  <TextField
                    className={styles.fieldValue}
                    type="number"
                    hiddenLabel
                    {...register("legalBankNumber")}
                    placeholder="Ввести..."
                    size="small"
                  />
                }
              />
              <FormFieldGenerator
                text="ИНН"
                value={
                  <TextField
                    className={styles.fieldValue}
                    hiddenLabel
                    type="number"
                    {...register("INN")}
                    placeholder="Ввести..."
                    size="small"
                  />
                }
              />
              <FormFieldGenerator
                alignStart
                text="Контактный телефон"
                value={
                  <div
                    className={classNames(
                      styles.valueContainer,
                      styles.fieldValue
                    )}
                  >
                    <TextField
                      className={styles.fieldValue}
                      hiddenLabel
                      {...register("legalNumber")}
                      type="number"
                      placeholder="Ввести..."
                      size="small"
                    />
                    <CreateBtnGenerator text="Добавить телефон" />
                  </div>
                }
              />
              <FormFieldGenerator
                text="Email"
                alignStart
                value={
                  <div
                    className={classNames(
                      styles.valueContainer,
                      styles.fieldValue
                    )}
                  >
                    <TextField
                      className={styles.fieldValue}
                      type="email"
                      hiddenLabel
                      {...register("legalEmail")}
                      placeholder="Ввести..."
                      size="small"
                    />
                    <CreateBtnGenerator text="Добавить email" />
                  </div>
                }
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Контактные лица</Typography>
            <CreateBtnGenerator text="Добавить контактное лицо" />
          </AccordionSummary>
          <AccordionDetails>
            <ContactFaceField
              key={Math.random() * 10000}
              control={control}
              index={1}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>Сервер клиента</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.dbInfoContainer}>
              <FormFieldGenerator
                text="DB host"
                value={
                  <TextField
                    className={styles.fieldValue}
                    hiddenLabel
                    type="number"
                    {...register("dbHost", { pattern: /\.{1}/ })}
                    placeholder="Ввести..."
                    size="small"
                  />
                }
              />
              <FormFieldGenerator
                text="DB port"
                value={
                  <TextField
                    className={styles.fieldValue}
                    hiddenLabel
                    type="number"
                    defaultValue={0}
                    {...register("dbPort")}
                    placeholder="Ввести..."
                    size="small"
                  />
                }
              />
              <FormFieldGenerator
                text="DB name"
                value={
                  <TextField
                    className={styles.fieldValue}
                    hiddenLabel
                    {...register("dbName")}
                    placeholder="Ввести..."
                    size="small"
                  />
                }
              />
              <FormFieldGenerator
                text="DB password"
                value={
                  <TextField
                    className={styles.fieldValue}
                    hiddenLabel
                    {...register("dbPassword")}
                    placeholder="Ввести..."
                    size="small"
                  />
                }
              />
            </div>
          </AccordionDetails>
        </Accordion>
      </form>
    </div>
  );
}

export default Account;
