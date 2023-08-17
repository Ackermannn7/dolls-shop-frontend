import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo2.png";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLogout,
  logout,
  selectIsAuth,
} from "../redux/slices/authorization";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const [t, i18n] = useTranslation("global");
  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.data);

  const { items } = useSelector((state) => state.cart);

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const navigate = useNavigate();
  const onClickLogout = async () => {
    if (window.confirm(t("header.logoutMessage"))) {
      await dispatch(fetchLogout(userData));
      navigate("/");
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("cart");
      toast.success(t("toastify.logoutSuccess"), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <div className="header__logo">
          <img width="60" src={logo} alt="Pizza logo" />
          <div className="header__logo__description">
            <h1>{t("header.title")}</h1>
            <p>{t("header.description")}</p>
          </div>
        </div>
      </Link>
      <div className="categories">
        <ul>
          <Link to="/dolls">
            <li>{t("header.categories.0")}</li>
          </Link>
          <Link to="/gallery">
            <li>{t("header.categories.1")}</li>
          </Link>
          <Link to="/aboutus">
            <li>{t("header.categories.2")}</li>
          </Link>
          {i18n.language === "en" ? (
            <li onClick={() => handleChangeLanguage("ua")}>
              <div className="languageBtn">
                <span>{t("header.categories.3")}</span>{" "}
                <svg
                  className="flag"
                  width="20px"
                  height="20px"
                  viewBox="0 -4 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_503_2952)">
                    <rect width="28" height="20" rx="2" fill="white" />
                    <mask
                      id="mask0_503_2952"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="28"
                      height="20"
                    >
                      <rect width="28" height="20" rx="2" fill="white" />
                    </mask>
                    <g mask="url(#mask0_503_2952)">
                      <rect width="28" height="20" fill="#0A17A7" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M-1.28244 -1.91644L10.6667 6.14335V-1.33333H17.3334V6.14335L29.2825 -1.91644L30.7737 0.294324L21.3263 6.66667H28V13.3333H21.3263L30.7737 19.7057L29.2825 21.9165L17.3334 13.8567V21.3333H10.6667V13.8567L-1.28244 21.9165L-2.77362 19.7057L6.67377 13.3333H2.95639e-05V6.66667H6.67377L-2.77362 0.294324L-1.28244 -1.91644Z"
                        fill="white"
                      />
                      <path
                        d="M18.668 6.33219L31.3333 -2"
                        stroke="#DB1F35"
                        strokeWidth="0.666667"
                        strokeLinecap="round"
                      />
                      <path
                        d="M20.0128 13.6975L31.3666 21.3503"
                        stroke="#DB1F35"
                        strokeWidth="0.666667"
                        strokeLinecap="round"
                      />
                      <path
                        d="M8.00555 6.31046L-3.83746 -1.67099"
                        stroke="#DB1F35"
                        strokeWidth="0.666667"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9.29006 13.6049L-3.83746 22.3105"
                        stroke="#DB1F35"
                        strokeWidth="0.666667"
                        strokeLinecap="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 12H12V20H16V12H28V8H16V0H12V8H0V12Z"
                        fill="#E6273E"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_503_2952">
                      <rect width="28" height="20" rx="2" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </li>
          ) : (
            <li onClick={() => handleChangeLanguage("en")}>
              <div className="languageBtn">
                <span>{t("header.categories.3")}</span>{" "}
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 -4 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_503_2809)">
                    <rect width="28" height="20" rx="2" fill="white" />
                    <mask
                      id="mask0_503_2809"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="28"
                      height="20"
                    >
                      <rect width="28" height="20" rx="2" fill="white" />
                    </mask>
                    <g mask="url(#mask0_503_2809)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 10.6667H28V0H0V10.6667Z"
                        fill="#156DD1"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 20H28V10.6667H0V20Z"
                        fill="#FFD948"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_503_2809">
                      <rect width="28" height="20" rx="2" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </li>
          )}
        </ul>
      </div>
      <div className="header__right-block">
        <Link to="/cart">
          <div className="header__cart">
            <svg
              width="32"
              height="32"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {totalCount === 0 ? "" : <span>{totalCount}</span>}
          </div>
        </Link>
        {isAuth ? (
          <div className="auth-user">
            <Link to="/me">
              {userData.avatarUrl ? (
                <Avatar
                  sx={{ width: 32, height: 32, marginBottom: 0.5 }}
                  src={userData.avatarUrl}
                />
              ) : (
                <Avatar sx={{ width: 32, height: 32, marginBottom: 0.5 }} />
              )}
            </Link>
            <Button
              onClick={onClickLogout}
              variant="contained"
              sx={{
                marginLeft: "10px",
                backgroundColor: "#232323",
                "@media (max-width:768px)": {
                  fontSize: "12px",
                },
                "&:hover": {
                  backgroundColor: "#c70000", // Change this to the desired hover background color
                },
              }}
            >
              {t("header.logoutbtn")}
            </Button>
          </div>
        ) : (
          <Link to="/login">
            <div className="header__login">
              <svg
                width="32px"
                height="32px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="style=fill">
                  <g id="profile">
                    <path
                      id="vector (Stroke)"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z"
                      fill="#000000"
                    />
                    <path
                      id="rec (Stroke)"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z"
                      fill="#000000"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
