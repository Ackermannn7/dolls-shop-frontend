import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "../scss/components/_orderform.scss";
import { useTranslation } from "react-i18next";

export const OrderForm = ({ setFormData }) => {
  const [t, i18n] = useTranslation("global");

  const {
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const [regions, setRegions] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [branches, setBranches] = React.useState([]);
  const [selectedRegionRef, setSelectedRegionRef] = React.useState("");
  const [selectedCityRef, setSelectedCityRef] = React.useState("");
  const [selectedBranchRef, setSelectedBranchRef] = React.useState("");

  React.useEffect(() => {
    // Fetch regions
    axios
      .post("https://api.novaposhta.ua/v2.0/json/Address/getAreas", {
        apiKey: "b2222a0ae727d1acc3725cfe6cc9c8f1",
        modelName: "Address",
        calledMethod: "getAreas",
        methodProperties: {},
      })
      .then((response) => {
        setRegions(response.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch regions:", error);
      });
  }, []);

  const handleOrderFullNameChange = (event) => {
    const fullName = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      orderFullName: fullName,
    }));
  };

  const handleOrderPhoneNumberChange = (event) => {
    const phoneNumber = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      orderPhoneNumber: phoneNumber,
    }));
  };

  const handleRegionChange = (event) => {
    const selectedRegion = regions.find(
      (region) => region.Ref === event.target.value
    ).Description;
    const regionRef = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedRegion: selectedRegion,
    }));
    setSelectedRegionRef(regionRef);
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedCity: "",
    }));
    setCities([]);

    // Fetch cities for the selected region
    axios
      .post("https://api.novaposhta.ua/v2.0/json/Address/getCities", {
        apiKey: "b2222a0ae727d1acc3725cfe6cc9c8f1",
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: {
          AreaRef: regionRef,
          Ref: "",
        },
      })
      .then((response) => {
        setCities(response.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch cities:", error);
      });
  };

  const handleCityChange = (event) => {
    const selectedCity = cities.find(
      (city) => city.Ref === event.target.value
    ).Description;
    const cityRef = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedCity: selectedCity,
    }));
    setSelectedCityRef(cityRef);
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedBranch: "",
    }));
    setBranches([]);
    // Fetch Nova Poshta branches for the selected city
    axios
      .post(
        "https://api.novaposhta.ua/v2.0/json/AddressGeneral/getWarehouses",
        {
          apiKey: "b2222a0ae727d1acc3725cfe6cc9c8f1",
          modelName: "AddressGeneral",
          calledMethod: "getWarehouses",
          methodProperties: {
            CityRef: cityRef,
            Limit: 500,
          },
        }
      )
      .then((response) => {
        setBranches(response.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch branches:", error);
      });
  };
  const handleBranchChange = (event) => {
    const selectedBranch = branches.find(
      (branch) => branch.Ref === event.target.value
    ).Description;
    const branchRef = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedBranch: selectedBranch,
    }));
    setSelectedBranchRef(branchRef);
  };

  return (
    <div className="order-form">
      <h2 className="title">{t("cartPage.checkoutform.title")}</h2>
      <form>
        <div className="field">
          <TextField
            onInput={handleOrderFullNameChange}
            // onChange={handleOrderFullNameChange}
            label={t("cartPage.checkoutform.fullNameLabel")}
            error={Boolean(errors.fullName?.message)}
            helperText={errors.fullName?.message}
            type="text"
            {...register("fullName", {
              required: t("cartPage.checkoutform.fullNameMessage"),
            })}
            fullWidth
          />
        </div>
        <div className="field">
          <TextField
            onInput={handleOrderPhoneNumberChange}
            // onChange={handleOrderPhoneNumberChange}
            className="field"
            label={t("cartPage.checkoutform.phoneNumberLabel")}
            type="tel"
            error={Boolean(errors.phoneNumber?.message)}
            helperText={errors.phoneNumber?.message}
            {...register("phoneNumber", {
              required: t("cartPage.checkoutform.phoneNumberMessage"),
            })}
            fullWidth
          />
        </div>
        <div className="field">
          <FormControl fullWidth>
            <InputLabel>{t("cartPage.checkoutform.regionLabel")}</InputLabel>
            <Select
              name="region"
              value={selectedRegionRef}
              onChange={handleRegionChange}
            >
              {regions.map((region) => (
                <MenuItem key={region.Ref} value={region.Ref}>
                  {region.Description}
                </MenuItem>
              ))}
            </Select>
            {errors.region && <span>This field is required</span>}
          </FormControl>
        </div>
        <div className="field">
          <FormControl fullWidth>
            <InputLabel>{t("cartPage.checkoutform.cityLabel")}</InputLabel>
            <Select
              name="city"
              value={selectedCityRef}
              onChange={handleCityChange}
            >
              {cities.map((city) => (
                <MenuItem key={city.Ref} value={city.Ref}>
                  {city.Description}
                </MenuItem>
              ))}
            </Select>
            {errors.city && <span>This field is required</span>}
          </FormControl>
        </div>
        <div className="field">
          <FormControl fullWidth>
            <InputLabel>{t("cartPage.checkoutform.branchLabel")}</InputLabel>
            <Select
              name="branch"
              value={selectedBranchRef}
              onChange={handleBranchChange}
            >
              {branches.map((branch) => (
                <MenuItem key={branch.Ref} value={branch.Ref}>
                  {branch.Description}
                </MenuItem>
              ))}
            </Select>
            {errors.branch && <span>This field is required</span>}
          </FormControl>
        </div>
      </form>
    </div>
  );
};
