import React from "react";
import { Product } from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/dolls";
import { Link } from "react-router-dom";

export const DollsList = () => {
  const dispatch = useDispatch();
  const { dolls } = useSelector((state) => state.dolls);
  const isProductLoading = dolls.status === "loading";
  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  console.log(dolls);

  return (
    <>
      <div className="recommended__header">
        <div className="section_header">
          <h3>Dolls</h3>
        </div>
      </div>
      <div className="grid-container">
        {(isProductLoading ? [...Array(9)] : dolls.items).map((obj, index) =>
          isProductLoading ? (
            <Product className="grid-item" key={index} isLoading={true} />
          ) : (
            <Link to={`/dolls/${obj._id}`}>
              <Product className="grid-item" key={obj.id} {...obj} />
            </Link>
          )
        )}
      </div>
    </>
  );
};
