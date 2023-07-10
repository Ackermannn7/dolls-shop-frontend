import React from "react";
// import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import { useTranslation } from "react-i18next";

export const Search = ({ setSearchValue }) => {
  const [t, i18n] = useTranslation("global");
  // const onCLickClear = () => {
  //   setSearchValue("");
  // };
  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        id="search"
      >
        <g data-name="Layer 2">
          <path
            d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"
            data-name="search"
          ></path>
        </g>
      </svg>

      <input
        onChange={({ currentTarget: input }) => setSearchValue(input.value)}
        className={styles.input}
        placeholder={t("dollsList.searchLabel")}
      />
      {/* {searchValue && (
        <svg
          onClick={onCLickClear}
          className={styles.clearIcon}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )} */}
    </div>
  );
};
