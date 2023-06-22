import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo2.png";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../redux/slices/authorization";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);

  const { items } = useSelector((state) => state.cart);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  const navigate = useNavigate();
  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(logout());
      navigate("/");
      window.localStorage.removeItem("token");
      toast.success("Log out successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // const categories = ["Dolls", "Gallery", "About us", "Language"];
  return (
    <div className="header">
      <Link to="/">
        <div className="header__logo">
          <img width="60" src={logo} alt="Pizza logo" />
          <div className="header__logo__description">
            <h1>DOLLS FOR ALL</h1>
            <p>Dolls for your house and soul</p>
          </div>
        </div>
      </Link>
      <div className="categories">
        <ul>
          <Link to="/dolls">
            <li>Dolls</li>
          </Link>
          <Link to="/gallery">
            <li>Gallery</li>
          </Link>
          <Link to="/aboutus">
            <li>About us</li>
          </Link>
          <li>Language</li>
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
            <div className="auth-user__button"></div>
            <Button
              onClick={onClickLogout}
              variant="contained"
              sx={{
                backgroundColor: "#232323",
                "&:hover": {
                  backgroundColor: "#c70000", // Change this to the desired hover background color
                },
              }}
            >
              Log Out
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
