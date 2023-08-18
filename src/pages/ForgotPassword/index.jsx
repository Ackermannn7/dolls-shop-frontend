import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

import styles from "./ForgotPassword.module.scss";
import {
  fetchForgotPassword,
  selectIsAuth,
} from "../../redux/slices/authorization";
import { useTranslation } from "react-i18next";

export const ForgotPassword = () => {
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (email) => {
    const message = await dispatch(fetchForgotPassword(email));
    if (!message.payload) {
      return toast.error(t("toastify.messageFailure"), {
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
    toast.success(
      `${t("toastify.messageWithResetPassword")} ${message.payload.email}!`,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      }
    );
    navigate("/login");
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        {t("forgotPasswordForm.title")}
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
            // pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          })}
          fullWidth
        />

        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          {t("forgotPasswordForm.submitButton")}
        </Button>
      </form>
      <div className={styles.bottomText}>
        <Link to="/login">
          <p className={styles.bottomLink}>
            {t("forgotPasswordForm.getBackLink")}
          </p>
        </Link>
      </div>
    </Paper>
  );
};
