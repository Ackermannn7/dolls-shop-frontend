import React from "react";
import { useTranslation } from "react-i18next";

export const AboutUs = () => {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="content">
      <div className="aboutus__header">
        <h3>{t("aboutUs.title")}</h3>
      </div>

      <div className="aboutus__description">
        <ul>
          <li>{t("aboutUs.aboutUsDescription1")}</li>
          <li>{t("aboutUs.aboutUsDescription2")}</li>
          <li>{t("aboutUs.aboutUsDescription3")}</li>
          <li>{t("aboutUs.aboutUsDescription4")}</li>
          <li>{t("aboutUs.aboutUsDescription5")}</li>
          <li>{t("aboutUs.aboutUsDescription6")}</li>
          <li>{t("aboutUs.aboutUsDescription7")}</li>
          <li>{t("aboutUs.aboutUsDescription8")}</li>
        </ul>
      </div>
    </div>
  );
};
