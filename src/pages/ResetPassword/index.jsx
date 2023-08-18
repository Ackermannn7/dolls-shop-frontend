import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

import styles from "./ResetPassword.module.scss";
import {
  fetchResetPassword,
  selectIsAuth,
} from "../../redux/slices/authorization";
import { useTranslation } from "react-i18next";

export const ResetPassword = () => {
  const passwordValidation = (value) => {
    if (value && value.length < 8) {
      return t("registerForm.passwordLength");
    }
    return true;
  };

  const [t, i18n] = useTranslation("global");

  const navigate = useNavigate();

  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const requestData = {
      ...data,
      token: token, // Добавляем значение токена в объект данных
    };
    console.log(requestData);
    const response = await dispatch(fetchResetPassword(requestData));
    if (!response.payload) {
      return toast.error(t("toastify.resetPasswordFailure"), {
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
    toast.success(`${t("toastify.resetPasswordSuccess")}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
    navigate("/login");
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.newPassword?.message)}
          helperText={errors.newPassword?.message}
          type="password"
          {...register("newPassword", {
            required: t("loginForm.passwordMessage"),
            validate: passwordValidation,
          })}
          className={styles.field}
          label={t("resetPassword.newPassword")}
          fullWidth
        />
        <TextField
          error={Boolean(errors.confirmPassword?.message)}
          helperText={errors.confirmPassword?.message}
          type="password"
          {...register("confirmPassword", {
            required: t("loginForm.passwordMessage"),
            validate: (value) => {
              if (value !== getValues("newPassword")) {
                return t("validation.newPasswordMatch");
              }
              return true;
            },
          })}
          className={styles.field}
          // label={t("registerForm.passwordLabel")}
          label={t("resetPassword.confirmPassword")}
          fullWidth
        />

        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          {t("resetPassword.submitButton")}
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
