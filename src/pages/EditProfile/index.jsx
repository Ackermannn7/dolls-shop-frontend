import React from "react";
import axios from "../axios";
import { fetchRegister, selectIsAuth } from "../../redux/slices/authorization";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./EditProfile.module.scss";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

export const EditProfile = () => {
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
      alert("Error uploading image!");
    }
  };

  console.log(imageUrl);

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
        avatarUrl: `http://localhost:4444/${imageUrl}`,
      })
    );
    console.log({ ...values, avatarUrl: `http://localhost:4444/${imageUrl}` });
    if (!data.payload) {
      return alert("Couldn't sign up");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Registration
      </Typography>
      <div className={styles.avatar}>
        {imageUrl ? (
          <>
            <img
              className={styles.uploadedAvatar}
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
          {...register("fullName", { required: "Enter your full name" })}
          className={styles.field}
          label="Full Name"
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register("email", { required: "Enter your email" })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register("password", { required: "Enter your password" })}
          className={styles.field}
          label="Password"
          fullWidth
        />

        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Sign Up
        </Button>
      </form>
      <div className={styles.bottomText}>
        <p>Already have an account?</p>
        <Link to="/login">
          <p className={styles.bottomLink}>Log in</p>
        </Link>
      </div>
    </Paper>
  );
};
