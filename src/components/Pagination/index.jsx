import React from "react";
import styles from "./Pagination.module.scss";
export const Pagination = ({ page, total, limit, setPage }) => {
  const totalPages = Math.ceil(total / limit);
  const onClick = (newPage) => {
    setPage(newPage + 1);
  };
  return (
    <div className={styles.pagination}>
      {totalPages > 0 &&
        [...Array(totalPages)].map((value, index) => (
          <button
            className={
              page === index + 1
                ? `${styles.page_btn} ${styles.active}`
                : styles.page_btn
            }
            key={index}
            onClick={() => onClick(index)}
          >
            {index + 1}
          </button>
        ))}
    </div>
  );
};
