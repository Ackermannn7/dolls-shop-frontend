import React from "react";
import { useTranslation } from "react-i18next";

export const WhyUs = () => {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="whyUs">
      <div className="section_header">
        <h3>{t("homepage.whyUsTitle")}</h3>
      </div>
      <div className="description">
        <ul>
          <li>
            <p className="description__header">
              {t("homepage.whyUsDescriptionHeader1")}
            </p>{" "}
            {t("homepage.whyUsDescription1")}
          </li>
          <li>
            <p className="description__header">
              {t("homepage.whyUsDescriptionHeader2")}
            </p>{" "}
            {t("homepage.whyUsDescription2")}
          </li>
          <li>
            <p className="description__header">
              {t("homepage.whyUsDescriptionHeader3")}
            </p>{" "}
            {t("homepage.whyUsDescription3")}
          </li>
          <li>
            <p className="description__header">
              {t("homepage.whyUsDescriptionHeader4")}
            </p>{" "}
            {t("homepage.whyUsDescription4")}
          </li>
          <li>
            <p className="description__header">
              {t("homepage.whyUsDescriptionHeader5")}
            </p>{" "}
            {t("homepage.whyUsDescription5")}
          </li>
        </ul>
      </div>
    </div>
  );
};
