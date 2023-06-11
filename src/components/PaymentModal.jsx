import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { selectIsAuth } from "../redux/slices/authorization";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { clearCart } from "../redux/slices/cart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const buttonStyle = {
  fontfamily: "Nunito, Roboto, system-ui, Tahoma, sans-serif",
  color: "#f6f6f6",
  fweight: "bold",
};
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

export default function PaymentModal({ open, setOpen }) {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { items, totalPrice } = useSelector((state) => state.cart);

  const onApproveHandler = async (data, actions) => {
    try {
      await actions.order.capture();
      dispatch(clearCart()); // Clear the cart state

      toast.success("Payment successful!", {
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
      <Button sx={buttonStyle} onClick={handleOpen}>
        Pay Now
      </Button>
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
                Process your payment with:
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
                You must be authorized to process the payment!
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Please{" "}
                <Link
                  style={{ color: "blue", textDecoration: "underline" }}
                  to="/login"
                >
                  log in
                </Link>{" "}
                to process the payment!
              </Typography>
            </Box>
          </Fade>
        </Modal>
      )}
    </div>
  );
}
