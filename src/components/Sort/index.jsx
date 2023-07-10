import styles from "./Sort.module.scss";
import { TextField, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

export const Sort = ({ sort, setSort }) => {
  const [t, i18n] = useTranslation("global");

  console.log(i18n.language);
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
      <p className={styles.sort_by}>{t("dollsList.sortBy")}</p>
      <select
        onChange={onSelectChange}
        className={styles.select}
        defaultValue={sort.sort}
      >
        <option value="dollName">{t("dollsList.sortCategories.0")}</option>
        <option value="price">{t("dollsList.sortCategories.1")}</option>
        <option value="viewsCount">{t("dollsList.sortCategories.2")}</option>
      </select>
      <button className={styles.arrow_btn} onClick={onArrowChange}>
        <p className={styles.up_arrow}>&uarr;</p>
        <p className={styles.down_arrow}>&darr;</p>
      </button>
    </div>
  );
};
