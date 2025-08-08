import React, { useState } from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import FormFieldGenerator from "../../../FormFieldGenerator/FormFieldGenerator";
import CountriesSelectField from "../../../CountriesSelectField/CountriesSelectField";
import ContactFaceField from "../../../../pages/MainPage/components/AccountsWrapper/components/CreateAccountForm/components/ContactFaceField/ContactFaceField";
import CreateBtnGenerator from "../../../CreateBtnGenerator/CreateBtnGenerator";

import activeAccordionIcon from "../../../../assets/icons/icons_circleActive.svg";
import notActiveAccordionIcon from "../../../../assets/icons/icons_circleNotActive.svg";

import addFakeID from "../../../../redux/services/TaxiService/addFakeID";

import styles from "./ServiceField.module.css";

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
    width: "16px",
    height: "16px",
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

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const filter = createFilterOptions();

function ServiceField({
  form: { register, handleSubmit, control },
  companyIndex,
  onSubmit,
  handleDelete,
  indexFake,
  indexR,
  service,
  fakeIds,
}) {
  const [value, setValue] = useState();
  const [open, toggleOpen] = useState(false);
  const [expanded, setExpanded] = useState();
  const dispatch = useDispatch();
  const items = fakeIds || [];
  const [dialogValue, setDialogValue] = useState({
    title: "",
    number: null,
    description: "",
  });

  const handleClose = () => {
    setDialogValue({
      title: "",
      number: null,
      description: "",
    });

    toggleOpen(false);
  };

  const handleSubmitFakeID = (event) => {
    event.preventDefault();

    dispatch(
      addFakeID({
        number: dialogValue.number,
        title: dialogValue.title,
        description: dialogValue.description,
      })
    );
    setValue({
      title: dialogValue.title,
      number: dialogValue.number,
      description: dialogValue.description,
    });

    handleClose();
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.header}>
          <div className={styles.text}>{`Филиал ${indexFake}`}</div>
          <div className={styles.buttons}>
            <div className={styles.functionalText}>
              <div className={styles.cloneBtnIcon} />
              Продублировать с аккаунта
            </div>
            {indexFake !== 1 && (
              <div
                className={styles.deleteBtn}
                onClick={() => handleDelete(indexR)}
              >
                <div className={styles.deleteBtnIcon} />
                Удалить
              </div>
            )}
          </div>
        </div>
        <div className={styles.content}>
          <FormFieldGenerator
            text="Название*"
            small
            value={
              <TextField
                className={styles.fieldValue}
                hiddenLabel
                {...register(
                  `companies[${companyIndex}].taxiServices[${indexR}].serviceTitle`,
                  { required: true }
                )}
                placeholder="Ввести..."
                size="small"
              />
            }
          />
          <FormFieldGenerator
            text="ID филиала"
            small
            value={
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    // timeout to avoid instant validation of the dialog's form.
                    setTimeout(() => {
                      toggleOpen(true);
                      setDialogValue({
                        title: "",
                        number: null,
                        description: "",
                      });
                    });
                  } else if (newValue && newValue.inputValue) {
                    toggleOpen(true);
                    setDialogValue({
                      title: "",
                      number: null,
                      description: "",
                    });
                  } else {
                    setValue(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  if (params.inputValue !== "") {
                    filtered.push({
                      inputValue: params.inputValue,
                      createID: `Создать новый ID "${params.inputValue}"`,
                    });
                  }

                  return filtered;
                }}
                id="ID филиала"
                options={items}
                getOptionLabel={(option) => {
                  // e.g value selected with enter, right from the input
                  if (typeof option === "string") {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return option.title;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => (
                  <li
                    {...props}
                    key={option.number}
                    className={styles.idOption}
                  >
                    <div className={styles.idOptionTitle}>
                      {option.createID
                        ? option.createID
                        : `ID ${option.number}`}
                    </div>
                    <div className={styles.idOptionDescription}>
                      {option.description}
                    </div>
                  </li>
                )}
                sx={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={styles.fieldValue}
                    size="small"
                    hiddenLabel
                    type="number"
                    placeholder="Ввод..."
                  />
                )}
              />
            }
          />
          <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmitFakeID}>
              <DialogTitle>Создание ID</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Все поля кроме ID не являються обязательными
                </DialogContentText>
                <FormFieldGenerator
                  text="Название"
                  small
                  value={
                    <TextField
                      autoFocus
                      margin="dense"
                      id="title"
                      value={dialogValue.title}
                      onChange={(event) =>
                        setDialogValue({
                          ...dialogValue,
                          title: event.target.value,
                        })
                      }
                      size="small"
                      hiddenLabel
                    />
                  }
                />
                <FormFieldGenerator
                  text="ID"
                  small
                  value={
                    <TextField
                      margin="dense"
                      id="id"
                      value={dialogValue.number}
                      onChange={(event) =>
                        setDialogValue({
                          ...dialogValue,
                          number: event.target.value,
                        })
                      }
                      type="number"
                      size="small"
                      hiddenLabel
                    />
                  }
                />
                <FormFieldGenerator
                  text="Описание"
                  small
                  value={
                    <TextField
                      margin="dense"
                      id="description"
                      value={dialogValue.description}
                      onChange={(event) =>
                        setDialogValue({
                          ...dialogValue,
                          description: event.target.value,
                        })
                      }
                      size="small"
                      hiddenLabel
                    />
                  }
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add</Button>
              </DialogActions>
            </form>
          </Dialog>
          <CountriesSelectField
            small
            name="position"
            rule={{ required: true }}
          />
          <FormFieldGenerator
            text="Город"
            small
            value={
              <TextField
                className={styles.fieldValue}
                hiddenLabel
                {...register(
                  `companies[${companyIndex}].taxiServices[${indexR}].servicePosition`
                )}
                placeholder="Ввести..."
                size="small"
              />
            }
          />
        </div>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <div className={styles.accordionTitle}>Юридическая информация</div>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ width: "100%" }}>
              <FormFieldGenerator
                small
                text="Юридический адрес"
                value={
                  <TextField
                    className={styles.fieldValue}
                    hiddenLabel
                    {...register(
                      `companies[${companyIndex}].taxiServices[${indexR}].serviceLegalInformation.address`
                    )}
                    placeholder="Ввести..."
                    size="small"
                  />
                }
              />
              <FormFieldGenerator
                small
                text="Банковские реквизиты"
                value={
                  <TextField
                    className={styles.fieldValue}
                    type="number"
                    hiddenLabel
                    {...register(
                      `companies[${companyIndex}].taxiServices[${indexR}].serviceLegalInformation.bankDetails`
                    )}
                    placeholder="Ввести..."
                    size="small"
                  />
                }
              />
              <FormFieldGenerator
                small
                text="ИНН"
                value={
                  <TextField
                    className={styles.fieldValue}
                    hiddenLabel
                    type="number"
                    {...register(
                      `companies[${companyIndex}].taxiServices[${indexR}].serviceLegalInformation.taxIdentificationNumber`
                    )}
                    placeholder="Ввести..."
                    size="small"
                  />
                }
              />
              <FormFieldGenerator
                small
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
                      {...register(
                        `companies[${companyIndex}].taxiServices[${indexR}].serviceLegalInformation.phones[0]`
                      )}
                      type="number"
                      placeholder="Ввести..."
                      size="small"
                    />
                    <CreateBtnGenerator text="Добавить телефон" />
                  </div>
                }
              />
              <FormFieldGenerator
                small
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
                      {...register(
                        `companies[${companyIndex}].taxiServices[${indexR}].serviceLegalInformation.emails[0]`
                      )}
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
            <div className={styles.accordionTitle}>Контактные лица</div>
          </AccordionSummary>
          <AccordionDetails>
            <ContactFaceField control={control} index={1} />
          </AccordionDetails>
        </Accordion>
      </form>
    </div>
  );
}

export default ServiceField;
