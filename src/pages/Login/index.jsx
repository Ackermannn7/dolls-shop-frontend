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

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "test@test.com",
      password: "12345678",
    },
    mode: "onChange",
  });
  console.log(errors);
  const onSubmit = async (values) => {
    const data = await dispatch(fetchLogin(values));
    if (!data.payload) {
      return toast.error("Incorrect Login or password!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      toast.success(`Wellcome, ${data.payload.fullName}!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
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
        Log in into your Account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register("email", { required: "Enter your email" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Enter your password" })}
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Log in
        </Button>
      </form>
      <div className={styles.bottomText}>
        <p>Don't have an account?</p>
        <Link to="/register">
          <p className={styles.bottomLink}>Sign up</p>
        </Link>
      </div>
    </Paper>
  );
};
