import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

import styles from "./Login.module.scss";
import { fetchLogin, selectIsAuth } from "../../redux/slices/authorization";
import { useTranslation } from "react-i18next";

export const Login = () => {
  const [t, i18n] = useTranslation("global");

  const passwordValidation = (value) => {
    if (value && value.length < 8) {
      return t("registerForm.passwordLength");
    }
    return true;
  };
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchLogin(values));
    if (!data.payload) {
      return toast.error(t("toastify.loginFailure"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      window.localStorage.setItem(
        "expirationDate",
        data.payload.expirationDate
      );
      toast.success(`${t("toastify.loginSuccess")} ${data.payload.fullName}!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        {t("loginForm.title")}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label={t("loginForm.emailLabel")}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register("email", {
            required: t("loginForm.emailMessage"),
            setValueAs: (value) => value.toLowerCase(),
            // pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          })}
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register("password", {
            required: t("loginForm.passwordMessage"),
            validate: passwordValidation,
          })}
          className={styles.field}
          label={t("registerForm.passwordLabel")}
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          {t("loginForm.loginBtn")}
        </Button>
      </form>
      <div className={styles.bottomText}>
        <p>{t("loginForm.registerText")}</p>
        <Link to="/register">
          <p className={styles.bottomLink}>{t("loginForm.registerLink")}</p>
        </Link>
      </div>
      <Link to="/forgotPassword">
        <p className={styles.forgotPassword}>{t("loginForm.forgotPassword")}</p>
      </Link>
    </Paper>
  );
};
