import React from "react";
import "../scss/pages/fullProduct.scss";
import { CommentsBlock } from "../components/CommentsBlock";
import { Index } from "../components/AddComment";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/slices/cart";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { fetchComments } from "../redux/slices/comments";

export const FullProduct = () => {
  const [data, setData] = React.useState();
  const { comments } = useSelector((state) => state.comments);
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const onClickAdd = () => {
    const item = {
      id: data._id,
      dollName: data.dollName,
      imageUrl: data.imageUrl,
      price: data.price,
    };
    dispatch(addProduct(item));
  };

  React.useEffect(() => {
    axios
      .get(`/dolls/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error getting doll!");
      });
  }, []);

  React.useEffect(() => {
    dispatch(fetchComments(id));
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "800px",
          height: "800px",
          backgroundColor: "#eee",
        }}
      />
    );
  }
  console.log(data.imageUrl);
  return (
    <div className="fullProduct">
      <div className="product">
        <div className="product-image">
          <img
            src={`http://localhost:4444/${data.imageUrl}`}
            alt={data.dollName}
          />
        </div>
        <div className="product-info">
          <h2 className="product-title">{data.dollName}</h2>
          <p className="product-price">{`$${data.price}`}</p>
          <p className="product-description">{data.description}</p>
          <p>
            <button onClick={onClickAdd} className="product-button">
              Add to Cart
            </button>
          </p>
        </div>
      </div>
      <h3>Comments</h3>
      <Index />
      <CommentsBlock items={comments.items} isLoading={false} />
    </div>
  );
};
