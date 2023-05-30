import React from "react";
import { Link } from "react-router-dom";

import cartEmptyImg from "../assets/img/empty-cart-removebg-preview.png";

export const CartEmpty = () => (
  <div className="cart cart--empty">
    <h2>
      The Cart is Empty! <span>😕</span>
    </h2>
    <p>
      Looks like you haven`t added anything to your cart yet.
      <br />
      To do this, please return to the main page.
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span>Back</span>
    </Link>
  </div>
);
