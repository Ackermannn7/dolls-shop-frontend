import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { productData, responsive } from "../assets/data/carousel";
import { Product } from "../components/Product";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/dolls";
// import doll from "../assets/img/doll.jpg";
const Home = () => {
  const dispatch = useDispatch();
  const { dolls } = useSelector((state) => state.dolls);
  const isProductLoading = dolls.status === "loading";

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // productData.map((obj) => (
  //   <Product key={obj.id} isLoading {...obj} />
  // ));
  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <div className="recommended">
          <div className="recommended__header">
            <div className="section_header">
              <h3>Recommended Dolls</h3>
            </div>
          </div>
          <Carousel
            responsive={responsive}
            swipeable={false}
            draggable={false}
            showDots={true}
            ssr={true} // means to render carousel on server-side.
            slidesToSlide={2}
            infinite={true}
            // autoPlay={this.props.deviceType !== "mobile" ? true : false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5s"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            // deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {(isProductLoading ? [...Array(5)] : dolls.items).map(
              (obj, index) =>
                isProductLoading ? (
                  <Product key={index} isLoading={true} />
                ) : (
                  <Product key={obj.id} {...obj} />
                )
            )}
          </Carousel>
        </div>
        <div className="whyUs">
          <div className="section_header">
            <h3>Why Dolls For All?</h3>
          </div>
          <p className="description">
            <ul>
              <li>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse,
                dolorum molestiae minus neque eligendi aliquam illum consectetur
                assumenda dolore tempore, itaque numquam veniam sequi. Illo
                assumenda vero odit placeat quam.
              </li>
              <li>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse,
                dolorum molestiae minus neque eligendi aliquam illum consectetur
                assumenda dolore tempore, itaque numquam veniam sequi. Illo
                assumenda vero odit placeat quam.
              </li>
              <li>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse,
                dolorum molestiae minus neque eligendi aliquam illum consectetur
                assumenda dolore tempore, itaque numquam veniam sequi. Illo
                assumenda vero odit placeat quam.
              </li>
              <li>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse,
                dolorum molestiae minus neque eligendi aliquam illum consectetur
                assumenda dolore tempore, itaque numquam veniam sequi. Illo
                assumenda vero odit placeat quam.
              </li>
            </ul>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
