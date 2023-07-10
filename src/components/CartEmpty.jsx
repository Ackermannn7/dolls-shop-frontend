import React from "react";
import { Link } from "react-router-dom";

import cartEmptyImg from "../assets/img/empty-cart-removebg-preview.png";
import { useTranslation } from "react-i18next";

export const CartEmpty = () => {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="cart cart--empty">
      <h2>
        {t("cartPage.empty.title")} <span>😕</span>
      </h2>
      <p>
        {t("cartPage.empty.description.0")}
        <br />
        {t("cartPage.empty.description.1")}
      </p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>{t("cartPage.cart.backBtn")}</span>
      </Link>
    </div>
  );
};
