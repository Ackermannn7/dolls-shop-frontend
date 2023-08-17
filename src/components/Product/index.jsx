import React from "react";
import styles from "./Product.module.scss";
import Skeleton from "./Skeleton";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/slices/cart";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const Product = (props) => {
  const [t, i18n] = useTranslation("global");

  const dispatch = useDispatch();
  const onClickAdd = () => {
    toast.success(t("toastify.addToCartSuccess"), {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
    const item = {
      id: props._id,
      dollName: props.dollName,
      imageUrl: props.imageUrl,
      price: props.price,
    };
    dispatch(addProduct(item));
  };

  if (props.isLoading) {
    return <Skeleton />;
  }

  return (
    <div className={styles.card}>
      <Link to={`/dolls/${props._id}`}>
        <img
          className={styles.productImg}
          src={`${process.env.REACT_APP_API_URL}${props.imageUrl}`}
          // src={`http://localhost:4444/${props.imageUrl}`}
          alt={props.dollName}
        />
        <h2 className={styles.name}>{props.dollName}</h2>
        <p className={styles.price}>{`$${props.price}`}</p>
        {props.description.length > 210 ? (
          <p>
            {props.description.substr(0, 190)}
            {"..."}
            <span className={styles.readmore}>{t("productCard.readMore")}</span>
          </p>
        ) : (
          <p>{props.description}</p>
        )}
      </Link>

      <p>
        <button onClick={onClickAdd} className={styles.button}>
          {t("productCard.addToCartBtn")}
        </button>
      </p>
    </div>
  );
};
