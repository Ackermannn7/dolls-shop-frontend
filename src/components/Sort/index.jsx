import styles from "./Sort.module.scss";
import { TextField, MenuItem } from "@mui/material";
export const Sort = ({ sort, setSort }) => {
  const onSelectChange = ({ currentTarget: input }) => {
    setSort({ sort: input.value, order: sort.order });
  };

  const onArrowChange = () => {
    if (sort.order === "asc") {
      setSort({ sort: sort.sort, order: "desc" });
    } else {
      setSort({ sort: sort.sort, order: "asc" });
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.sort_by}>Sort By :</p>
      <select
        onChange={onSelectChange}
        className={styles.select}
        defaultValue={sort.sort}
      >
        <option value="dollName">Name 🎀</option>
        <option value="price">Price ＄</option>
        <option value="viewsCount">Popularity ⭐</option>
      </select>
      <button className={styles.arrow_btn} onClick={onArrowChange}>
        <p className={styles.up_arrow}>&uarr;</p>
        <p className={styles.down_arrow}>&darr;</p>
      </button>
    </div>
  );
};
