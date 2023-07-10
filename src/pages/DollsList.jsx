import React from "react";
import { Product } from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/dolls";
import { Search } from "../components/Search";
import { Pagination } from "../components/Pagination";
import { Sort } from "../components/Sort";
import { useTranslation } from "react-i18next";

export const DollsList = () => {
  const [t, i18n] = useTranslation("global");

  const dispatch = useDispatch();

  const { dolls } = useSelector((state) => state.dolls);
  const isProductLoading = dolls.status === "loading";
  const [sort, setSort] = React.useState({ sort: "price", order: "asc" });
  const [searchValue, setSearchValue] = React.useState("");
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    dispatch(fetchProducts({ sort, searchValue, page }));
  }, [sort, searchValue, page]);

  return (
    <div className="content">
      <div className="dollsList__header">
        <div className="section_header">
          <h3>{t("dollsList.title")}</h3>
        </div>
        <div className="section_right">
          <Search
            setSearchValue={(searchValue) => setSearchValue(searchValue)}
          />
          <Sort sort={sort} setSort={setSort} />
        </div>
      </div>

      <div className="grid-container">
        {(isProductLoading ? [...Array(9)] : dolls.items.dolls).map(
          (obj, index) =>
            isProductLoading ? (
              <Product className="grid-item" key={index} isLoading={true} />
            ) : (
              <Product className="grid-item" key={obj.id} {...obj} />
            )
        )}
      </div>
      <Pagination
        className="active"
        page={page}
        limit={dolls.items.limit ? dolls.items.limit : 0}
        total={dolls.items.total ? dolls.items.total : 0}
        setPage={(page) => setPage(page)}
      />
    </div>
  );
};
