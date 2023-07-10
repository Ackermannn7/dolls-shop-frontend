import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { selectIsAuth } from "../redux/slices/authorization";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { clearCart } from "../redux/slices/cart";
import { saveOrder } from "../redux/slices/order";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const modalStyle = {
  textalign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PaymentModal({ open, setOpen, formData }) {
  const [t, i18n] = useTranslation("global");

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);
  const { items, totalPrice } = useSelector((state) => state.cart);

  const isFormValid =
    formData.orderFullName !== "" &&
    formData.orderPhoneNumber !== "" &&
    formData.selectedRegion !== "" &&
    formData.selectedCity !== "" &&
    formData.selectedBranch !== "";

  const onApproveHandler = async (data, actions) => {
    try {
      await actions.order.capture();
      dispatch(saveOrder({ userData, items, totalPrice, formData }));
      dispatch(clearCart()); // Clear the cart state
      window.localStorage.removeItem("cart");
      toast.success(t("toastify.paymentSuccess"), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      // Handle any errors that occur during payment capture
      console.error(error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        className={`button ${isFormValid ? "pay-btn" : "pay-btn__disabled"}`}
        disabled={!isFormValid}
        onClick={handleOpen}
      >
        {t("cartPage.cart.payBtn")}
      </button>

      {isAuth ? (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={modalStyle}>
              <Typography
                sx={{ textAlign: "center", marginBottom: "10px" }}
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                {t("toastify.paymentProcess")}
              </Typography>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AdhkORteEscITmfCpSVoPqMhJbRcY7N0LvbVhFqJwlDTwGssHYgbrij6_2uEA6IyPVvXwmppN9uNHsFi",
                }}
              >
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: `${totalPrice}`,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={onApproveHandler}
                />
              </PayPalScriptProvider>
            </Box>
          </Fade>
        </Modal>
      ) : (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={modalStyle}>
              <Typography
                id="transition-modal-title"
                variant="h5"
                component="h2"
              >
                {t("toastify.paymentAuthMessage")}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {t("toastify.please.0")}{" "}
                <Link
                  style={{ color: "blue", textDecoration: "underline" }}
                  to="/login"
                >
                  {t("toastify.please.1")}
                </Link>{" "}
                {t("toastify.please.2")}
              </Typography>
            </Box>
          </Fade>
        </Modal>
      )}
    </div>
  );
}
