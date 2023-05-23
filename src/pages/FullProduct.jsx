import React from "react";
import "../scss/pages/_full-product.scss";
import { CommentsBlock } from "../components/CommentsBlock";
import { Index } from "../components/AddComment";

import { useParams } from "react-router-dom";
import axios from "../axios";

export const FullProduct = () => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/dolls/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error getting post!");
      });
  }, []);
  console.log(data);
  if (isLoading) {
    return (
      <div
        style={{
          width: "400px",
          height: "400px",
          backgroundColor: "#eee",
        }}
      />
    );
  }
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
            <button className="product-button">Add to Cart</button>
          </p>
        </div>
      </div>

      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </div>
  );
};
