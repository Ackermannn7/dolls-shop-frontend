import React from "react";

export const Product = (props) => {
  return (
    <div className="card">
      <img className="card__productImg" src={props.imageUrl} alt={props.name} />
      <h2 className="card__name">{props.name}</h2>
      <p className="card__price">{props.price}</p>
      <p className="card__description">{props.description}</p>
      <p>
        <button className="card__button">Add to Cart</button>
      </p>
    </div>
  );
};
