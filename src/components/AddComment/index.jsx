import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createComment } from "../../redux/slices/comments";
import { useTranslation } from "react-i18next";
import { selectIsAuth } from "../../redux/slices/authorization";
import { toast } from "react-toastify";

export const Index = () => {
  const [t, i18n] = useTranslation("global");
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);
  const { id } = useParams();
  const [comment, setComment] = React.useState("");
  const dispatch = useDispatch();

  const onSubmit = async () => {
    if (!isAuth) {
      toast.error(t("fullProductComments.isAuth"), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } else {
      try {
        const dollId = id;
        dispatch(createComment({ dollId, comment, userData }));
        setComment("");
      } catch (err) {
        console.warn(err);
        toast.error(t("fullProductComments.addCommentFailure"), {
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
    }
  };

  return (
    <div className={styles.root}>
      {userData ? (
        <Avatar classes={{ root: styles.avatar }} src={userData.avatarUrl} />
      ) : (
        <Avatar classes={{ root: styles.avatar }} />
      )}
      <div className={styles.form}>
        <TextField
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          label={t("fullProductComments.inputLabel")}
          variant="outlined"
          maxRows={10}
          multiline
          fullWidth
        />

        <Button onClick={onSubmit} variant="contained">
          {t("fullProductComments.sendCommentBtn")}
        </Button>
      </div>
    </div>
  );
};
