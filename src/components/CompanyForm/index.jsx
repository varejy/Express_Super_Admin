import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import classNames from "classnames";
import uniqid from "uniqid";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import DateTimePicker from "@mui/lab/DateTimePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import addNew from "../../redux/services/Companies/addNew";
import edit from "../../redux/services/Companies/editOne";

import styles from "./index.module.css";

function Create(props) {
  const { companies, serviceToEdit } = useSelector(
    (rootReducer) => rootReducer.companies
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  const { accountId } = props;

  const defaultValues = id
    ? {
        title: serviceToEdit.title || "",
        tariffPlan: serviceToEdit.tariffPlan || "Нет",
        nextPayment: serviceToEdit.nextPayment || new Date(),
      }
    : {
        title: "",
        tariffPlan: "Нет",
        nextPayment: new Date(),
      };

  const { handleSubmit, register, control } = useForm({ defaultValues });

  const onSubmit = (data) => {
    const service = id
      ? {
          ...serviceToEdit,
          title: data.title,
          redactedDate: new Date(),
          tariffPlan: data.tariffPlan,
          nextPayment: data.nextPayment,
        }
      : {
          _id: uniqid(),
          title: data.title,
          createdDate: new Date(),
          redactedDate: new Date(),
          typeOfCreate: "Вручную",
          tariffPlan: data.tariffPlan,
          id: companies.length + 1,
          nextPayment: data.nextPayment,
        };
    dispatch(id ? edit(service) : addNew(service));
    props.history.push(`/${accountId}/companies`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div
            className={classNames(styles.contentWrapper, styles.mediumWidth)}
          >
            <Typography className={styles.title} variant="h6">
              Создание новой компании
            </Typography>
            <Divider className={styles.divider} />

            <TextField
              className={styles.mediumWidth}
              label="Название"
              {...register("title", { required: true })}
              required
              variant="outlined"
            />
            <Controller
              control={control}
              valueName="nextPayment"
              className={styles.mediumWidth}
              label="Дата и время следующего платежа"
              name="nextPayment"
              render={({ field }) => {
                const { onChange, value } = field;
                return (
                  <DateTimePicker
                    label="Дата и время следующего платежа"
                    onChange={onChange}
                    value={value}
                    renderInput={(params) => (
                      <TextField className={styles.mediumWidth} {...params} />
                    )}
                  />
                );
              }}
            />

            <Controller
              rules={{ required: true }}
              control={control}
              name="tariffPlan"
              render={({ field }) => {
                const { onChange, value } = field;
                return (
                  <FormControl className={styles.mediumWidth}>
                    <InputLabel id="select-label">Тарифный план</InputLabel>
                    <Select
                      labelId="select-label"
                      value={value}
                      onChange={onChange}
                      className={styles.maxWidth}
                      label="Тарифный план"
                    >
                      <MenuItem value="Нет">
                        <em>Нет</em>
                      </MenuItem>
                      <MenuItem value="Платный">Платный</MenuItem>
                      <MenuItem value="Бесплатный">Бесплатный</MenuItem>
                    </Select>
                  </FormControl>
                );
              }}
            />
          </div>
          {/* <div className={styles.buttons}>
            <Button className={styles.button} type="submit" variant="outlined">
              Создать
            </Button>
            <Link className={styles.margin} to={`/${accountId}/companies`}>
              <Button
                className={styles.button}
                variant="outlined"
                color="error"
              >
                Закрыть
              </Button>
            </Link>
          </div> */}
        </form>
      </Box>
    </LocalizationProvider>
  );
}

export default Create;
