import React from "react";
import styles from "./Product.module.scss";
import Skeleton from "./Skeleton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/slices/cart";

export const Product = (props) => {
  const dispatch = useDispatch();
  const onClickAdd = () => {
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
          src={`http://localhost:4444/${props.imageUrl}`}
          alt={props.dollName}
        />
        <h2 className={styles.name}>{props.dollName}</h2>
        <p className={styles.price}>{`$${props.price}`}</p>
        {props.description.length > 210 ? (
          <p>
            {props.description.substr(0, 190)}
            {"..."}
            <span className={styles.readmore}>read more...</span>
          </p>
        ) : (
          <p>{props.description}</p>
        )}
      </Link>

      <p>
        <button onClick={onClickAdd} className={styles.button}>
          Add to Cart
        </button>
      </p>
    </div>
  );
};
