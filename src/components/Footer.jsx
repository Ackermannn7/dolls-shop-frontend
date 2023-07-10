import React from "react";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="footer">
      <div className="footer__shop">
        <h4>{t("footer.shop.shopTitle")}</h4>
        <ul>
          <li>{t("footer.shop.shopCategory1")}</li>
          <li>{t("footer.shop.shopCategory2")}</li>
          <li>{t("footer.shop.shopCategory3")}</li>
        </ul>
      </div>
      <div className="footer__info">
        <h4>{t("footer.info.infoTitle")}</h4>
        <ul>
          <li>{t("footer.info.infoCategory1")}</li>
          <li>{t("footer.info.infoCategory2")}</li>
          <li>{t("footer.info.infoCategory3")}</li>
        </ul>
      </div>
    </div>
  );
};
