import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createComment } from "../../redux/slices/comments";

export const Index = () => {
  const userData = useSelector((state) => state.auth.data);
  const { id } = useParams();
  const [comment, setComment] = React.useState("");
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      const dollId = id;
      dispatch(createComment({ dollId, comment, userData }));
      setComment("");
    } catch (err) {
      console.warn(err);
      alert("Error adding a comment!");
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
          label="Write a Comment"
          variant="outlined"
          maxRows={10}
          multiline
          fullWidth
        />
        <Button onClick={onSubmit} variant="contained">
          Send
        </Button>
      </div>
    </div>
  );
};
