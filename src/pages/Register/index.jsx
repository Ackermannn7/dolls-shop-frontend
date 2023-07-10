import React from "react";
import { fetchRegister, selectIsAuth } from "../../redux/slices/authorization";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import styles from "./Register.module.scss";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const Register = () => {
  const [t, i18n] = useTranslation("global");

  const [imageUrl, setImageUrl] = React.useState("");
  const inputFileRef = React.useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      toast.error(t("toastify.imageUploadError"), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(
      fetchRegister({
        ...values,
        // avatarUrl: `${process.env.REACT_APP_API_URL}${imageUrl}`,
        avatarUrl: `http://localhost:4444/${imageUrl}`,
      })
    );
    if (!data.payload) {
      return toast.error(t("loginForm.registrationFailure"), {
        position: "top-right",
        autoClose: 3000,
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
      toast.success(
        `${t("toastify.registrationSuccess")}, ${data.payload.fullName}!`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        {t("registerForm.title")}
      </Typography>
      <div className={styles.avatar}>
        {imageUrl ? (
          <>
            <img
              className={styles.uploadedAvatar}
              // src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
              src={`http://localhost:4444/${imageUrl}`}
              alt="avatar"
            />
            <div className={styles.editButtons}>
              <IconButton>
                <DeleteIcon onClick={onClickRemoveImage} />
              </IconButton>
            </div>
          </>
        ) : (
          <>
            <Avatar sx={{ width: 100, height: 100 }} />
            <div className={styles.editButtons}>
              <IconButton>
                <AddAPhotoIcon onClick={() => inputFileRef.current.click()} />
              </IconButton>
            </div>
          </>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          ref={inputFileRef}
          type="file"
          onChange={handleChangeFile}
          hidden
        />
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", {
            required: t("registerForm.nameMessage"),
          })}
          className={styles.field}
          label={t("registerForm.nameMessage")}
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register("email", { required: t("registerForm.emailMessage") })}
          className={styles.field}
          label={t("registerForm.emailLabel")}
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register("password", {
            required: t("registerForm.passwordMessage"),
          })}
          className={styles.field}
          label={t("registerForm.passwordLabel")}
          fullWidth
        />
        {/* <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register("password", { required: "Enter your password" })}
          className={styles.field}
          label="Password"
          fullWidth
        /> */}

        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          {t("registerForm.registerBtn")}
        </Button>
      </form>
      <div className={styles.bottomText}>
        <p>{t("registerForm.loginText")}</p>
        <Link to="/login">
          <p className={styles.bottomLink}>{t("registerForm.loginLink")}</p>
        </Link>
      </div>
    </Paper>
  );
};
