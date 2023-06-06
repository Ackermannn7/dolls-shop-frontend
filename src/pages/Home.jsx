import React from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { responsive } from "../assets/data/carousel";
import { Product } from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsForCarousel } from "../redux/slices/dolls";
import axios from "../axios";
import { WhyUs } from "../components/WhyUs";

const Home = () => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`/dollsCarousel`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error getting doll!");
      });
  }, []);
  console.log(data);
  if (isLoading) {
    console.log(isLoading);
    return (
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
        {[...Array(5)].map((obj, index) => (
          <Product key={index} isLoading={true} />
        ))}
      </Carousel>
    );
  }
  return (
    <div className="wrapper">
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
            {data.map((obj, index) => (
              <Product key={obj.id} {...obj} />
            ))}
          </Carousel>
        </div>
        <WhyUs />
      </div>
    </div>
  );
};

export default Home;
