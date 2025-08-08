import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import getAccountByLoginAndPassword from "../../redux/services/getAccountByEmailAndPassword";

import styles from "./index.module.css";

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(
      getAccountByLoginAndPassword({
        login: data.login,
        password: data.password,
      })
    );
  };

  return (
    <Box className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <Stack spacing={2} direction="column">
          <Typography variant="h4" align="center" gutterBottom component="div">
            Sign in
          </Typography>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="login"
              {...register("login", { required: true })}
              label="Login"
            />
            <TextField
              id="password"
              {...register("password", { required: true })}
              label="Password"
            />
            <LoadingButton
              loadingIndicator="Loading..."
              type="submit"
              variant="outlined"
            >
              Sign in
            </LoadingButton>
          </form>
        </Stack>
      </div>
    </Box>
  );
}

export default LoginPage;
