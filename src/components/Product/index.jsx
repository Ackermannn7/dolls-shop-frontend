import React from "react";
import styles from "./Product.module.scss";
import Skeleton from "./Skeleton";
export const Product = (props) => {
  if (props.isLoading) {
    return <Skeleton />;
  }

  return (
    <div className={styles.card}>
      <img
        className={styles.productImg}
        src={`http://localhost:4444/${props.imageUrl}`}
        alt={props.dollName}
      />
      <h2 className={styles.name}>{props.dollName}</h2>
      <p className={styles.price}>{`$${props.price}`}</p>
      <p className={styles.description}>{props.description}</p>
      <p>
        <button className={styles.button}>Add to Cart</button>
      </p>
    </div>
  );
};
